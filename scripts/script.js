var settings = {
    canvasObj: document.getElementById("mainCanvas"),
    nextShape: "Pen",
    nextBorderColor: "#000",
    nextFillColor: "#000",
    currentShape: undefined,
    shapes: [],
    discarded: [],
    canvasWidth: 800,
    canvasHeight: 600,
    lineWidth: 1,
    fill: "NoFill"
};

$(document).ready(function() {
    var select = $("<select></select>", {
        class: 'line-width'
    });

    for (var i = 1; i <= 20; i++) {
        select.append($('<option>', {
            value: i,
            text: i
        }));
    }

    $(".container-right").append(select);

    $('select.line-width').on('change', function() {
        console.log(this.value)
        settings.lineWidth = this.value;
    });
});


$('input[type=radio][name=shape]').on('change', function() {
    switch($(this).val()) {
        case 'Rectangle':
            console.log("Set shape to Rectangle");
            setShape("Rectangle");
            break;
        case 'Pen':
            console.log("Set shape to Pen");
            setShape("Pen");
            break;
        case 'Circle':
            console.log("Set shape to Circle");
            setShape("Circle");
            break;
        case 'Line':
            console.log("Set shape to Line");
            setShape("Line");
            break;
        case 'SprayCan':
            console.log("Set shape to SprayCan");
            setShape("SprayCan");
            break;
    }
});


$('#button_clear').on('click', function() {
    clearCanvas();
});


$('#button_undo').on('click', function() {
    undo();
});

$('#button_redo').on('click', function() {
    redo();
});

$('#button_save').on('click', function() {
    var title = prompt("Enter drawing name", "drawing");

    if (title != undefined) {
        var drawing = {
        title: title,
        content: settings.shapes
        }
        var url = "http://localhost:3000/api/drawings";
        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            url: url,
            data: JSON.stringify(drawing),
            success: function (data) {
                // The drawing was successfully saved
            },
            error: function (xhr, err) {
                // The drawing could NOT be saved
            }
        });
    }
});

$('#button_open').on('click', function() {
    var url = "http://localhost:3000/api/drawings";
      /*for (int i = 0; i < data.length; i++){

          //alert( "Data Loaded: " + data[0]['title']);
      }*/


      $.get(url, function(data, status){
          for (var i = 0; i < data.length; i++){
              console.log(data[i]['title']);
          }
      });
});

$("button").click(function(){

});

$('input[type=radio][name=fill]').on('change', function() {
    switch ($(this).val()) {
        case "Fill":
            console.log("Set Fill");
            setFill("Fill");
            break;
        case "NoFill":
            console.log("Set No Fill");
            setFill("NoFill");
            break;
    }
})


$("#colorpicker_border, #colorpicker_fill").spectrum({
    color: "#000",
    showInput: true,
    className: "full-spectrum",
    showInitial: true,
    showPalette: true,
    showSelectionPalette: true,
    maxSelectionSize: 10,
    preferredFormat: "hex",
    localStorageKey: "spectrum.demo",
    move: function (color) {

    },
    show: function () {

    },
    beforeShow: function () {

    },
    hide: function () {

    },
    change: function() {

    },
    palette: [
        ["rgb(0, 0, 0)", "rgb(67, 67, 67)", "rgb(102, 102, 102)",
        "rgb(204, 204, 204)", "rgb(217, 217, 217)","rgb(255, 255, 255)"],
        ["rgb(152, 0, 0)", "rgb(255, 0, 0)", "rgb(255, 153, 0)", "rgb(255, 255, 0)", "rgb(0, 255, 0)",
        "rgb(0, 255, 255)", "rgb(74, 134, 232)", "rgb(0, 0, 255)", "rgb(153, 0, 255)", "rgb(255, 0, 255)"],
        ["rgb(230, 184, 175)", "rgb(244, 204, 204)", "rgb(252, 229, 205)", "rgb(255, 242, 204)", "rgb(217, 234, 211)",
        "rgb(208, 224, 227)", "rgb(201, 218, 248)", "rgb(207, 226, 243)", "rgb(217, 210, 233)", "rgb(234, 209, 220)",
        "rgb(221, 126, 107)", "rgb(234, 153, 153)", "rgb(249, 203, 156)", "rgb(255, 229, 153)", "rgb(182, 215, 168)",
        "rgb(162, 196, 201)", "rgb(164, 194, 244)", "rgb(159, 197, 232)", "rgb(180, 167, 214)", "rgb(213, 166, 189)",
        "rgb(204, 65, 37)", "rgb(224, 102, 102)", "rgb(246, 178, 107)", "rgb(255, 217, 102)", "rgb(147, 196, 125)",
        "rgb(118, 165, 175)", "rgb(109, 158, 235)", "rgb(111, 168, 220)", "rgb(142, 124, 195)", "rgb(194, 123, 160)",
        "rgb(166, 28, 0)", "rgb(204, 0, 0)", "rgb(230, 145, 56)", "rgb(241, 194, 50)", "rgb(106, 168, 79)",
        "rgb(69, 129, 142)", "rgb(60, 120, 216)", "rgb(61, 133, 198)", "rgb(103, 78, 167)", "rgb(166, 77, 121)",
        "rgb(91, 15, 0)", "rgb(102, 0, 0)", "rgb(120, 63, 4)", "rgb(127, 96, 0)", "rgb(39, 78, 19)",
        "rgb(12, 52, 61)", "rgb(28, 69, 135)", "rgb(7, 55, 99)", "rgb(32, 18, 77)", "rgb(76, 17, 48)"]
    ],
    change: function(color) {
        console.log(color.toHexString());
        console.log(this.id);
        setColor(color.toHexString(), this.id);
    }
});

$("#mainCanvas").on("mousedown", function(e) {
    e.preventDefault();

    var shape = undefined;
    var context = settings.canvasObj.getContext("2d");

    var c = getRelativeCoords(e);
    var x = c.x;
    var y = c.y;

    var dragging = false;
    var highestIndex = -1;
    for (var i = settings.shapes.length-1; i >= 0; i--) {
        if (hitTest(settings.shapes[i], x, y)) {
            dragging = true;
            if (i > highestIndex) {
                console.log("Setting hightest index:", i);
                highestIndex = i;
            }
            break;
        }
    }

    if(!dragging) {

        if (settings.nextShape === "Circle") {
            shape = new Circle(x, y, settings.nextBorderColor, settings.nextFillColor,
                                     settings.fill, settings.lineWidth, "Circle");
        }
        else if (settings.nextShape === "Rectangle") {
            shape = new Rectangle(x, y, settings.nextBorderColor, settings.nextFillColor,
                                        settings.fill, settings.lineWidth, "Rectangle");
        }
        else if (settings.nextShape === "Pen") {
            console.log(settings.fill);
            shape = new Pen(x, y, settings.nextBorderColor, settings.nextFillColor,
                                  settings.fill, settings.lineWidth, "Pen");
        }
        else if (settings.nextShape === "Line") {
            shape = new Line(x, y, settings.nextBorderColor, settings.lineWidth, "Line");
        }
        else if (settings.nextShape === "Text") {
            shape = new Text(x, y, settings.nextBorderColor);
        }
        else if (settings.nextShape === "SprayCan") {
            shape = new SprayCan(x, y, settings.nextBorderColor, settings.lineWidth, "SprayCan");
        }

        settings.currentShape = shape;
        shape.draw(context);
    }
});

$("#mainCanvas").on("mousemove", function(e) {
    var context = settings.canvasObj.getContext("2d");
    var rect = settings.canvasObj.getBoundingClientRect();

    var c = getRelativeCoords(e);
    var x = c.x;
    var y = c.y;

    if (settings.currentShape !== undefined) {
        settings.currentShape.setEnd(x, y);

        drawAll();
        settings.currentShape.draw(context);
    }
});

$("#mainCanvas").on("mouseup", function(e) {
    var context = settings.canvasObj.getContext("2d");
    var rect = settings.canvasObj.getBoundingClientRect();

    var c = getRelativeCoords(e);
    var x = c.x;
    var y = c.y;

    if (settings.currentShape !== undefined) {
        settings.currentShape.setEnd(x, y);
        settings.shapes.push(settings.currentShape);
        console.log(settings.shapes);
    }

    settings.currentShape = undefined;
});

function getRelativeCoords(event) {
    return { x: event.offsetX || event.layerX, y: event.offsetY || event.layerY };
}

function setShape(shape) {
    settings.nextShape = shape;
}

function setWidth(lwidth) {
    settings.lineWidth = lwidth;
}

function setColor(color, id) {
    if (id === "colorpicker_border"){
        settings.nextBorderColor = color;
    }
    else if (id === "colorpicker_fill"){
        settings.nextFillColor = color;
    }
}

function setFill(fill) {
    settings.fill = fill;
}

function clearCanvas() {

    settings.discarded = settings.shapes.slice();
    settings.shapes = [];
    var context = settings.canvasObj.getContext("2d");
    context.clearRect(0, 0, settings.canvasObj.width, settings.canvasObj.height);
}

function undo() {
    if(settings.shapes.length > 0) {
        settings.discarded.push(settings.shapes.pop());
    }
    console.log("undo");
    drawAll();

}

function redo() {
    if(settings.discarded.length > 0){
        settings.shapes.push(settings.discarded.shift());
    }
    drawAll();
}

<<<<<<< HEAD

=======
>>>>>>> 774e8a147dd4cbeb5b1d2e3ab767e77bd45e7d34
function drawAll() {
    var context = settings.canvasObj.getContext("2d");
    context.clearRect(0, 0, settings.canvasObj.width, settings.canvasObj.height);
    for (var i = 0; i < settings.shapes.length; i++) {
        settings.shapes[i].draw(context);
    }
}


function hitTest(shape, mx, my) {

    if (shape.type === "Circle") {
        var dx = mx - shape.centerX;
        var dy = my - shape.centerY;
        return ((dx * dx) / (shape.radiusX * shape.radiusX) + (dy * dy) / (shape.radiusY * shape.radiusY) <= 1);
    }
    else {
        var startX = Math.min(shape.x, shape.endX);
        var startY = Math.min(shape.y, shape.endY);
        var endX = Math.max(shape.x, shape.endX);
        var endY = Math.max(shape.y, shape.endY);

        return ((mx >= startX && mx <= endX) && (my >= startY && my <= endY));
    }

}
