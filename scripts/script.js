var settings = {
    canvasObj: document.getElementById("mainCanvas"),
    nextShape: "Pen",
    nextColor: "#000",
    isDrawing: false,
    currentShape: undefined,
    shapes: [],
    canvasWidth: 800,
    canvasHeight: 600,
    lineWidth: 1
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
        case 'FilledRectangle':
            console.log("Set shape to FilledRectangle");
            setShape("FilledRectangle");
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


$("#colorpicker").spectrum({
    color: settings.nextColor,
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
        setColor(color.toHexString());
    }
});


$("#mainCanvas").on("mousedown", function(e) {
    e.preventDefault();
    settings.isDrawing = true;

    var shape = undefined;
    var context = settings.canvasObj.getContext("2d");
    var rect = settings.canvasObj.getBoundingClientRect();

    var c = getRelativeCoords(e);
    var x = c.x;
    var y = c.y;

    if (settings.nextShape === "Circle") {
        shape = new Circle(x, y, settings.nextColor, settings.lineWidth);
    }
    else if (settings.nextShape === "Rectangle") {
        shape = new Rectangle(x, y, settings.nextColor, settings.lineWidth);
    }
    else if (settings.nextShape === "FilledRectangle") {
        shape = new FilledRectangle(x, y, settings.nextColor, settings.lineWidth);
    }
    else if (settings.nextShape === "Pen") {
        shape = new Pen(x, y, settings.nextColor, settings.lineWidth);
    }
    else if (settings.nextShape === "Line") {
        shape = new Line(x, y, settings.nextColor, settings.lineWidth);
    }
    else if (settings.nextShape === "Text") {
        shape = new Text(x, y, settings.nextColor);
    }
    else if (settings.nextShape === "SprayCan") {
        shape = new SprayCan(x, y, settings.nextColor, settings.lineWidth);
    }

    settings.currentShape = shape;

    shape.draw(context);
});


$("#mainCanvas").on("mousemove", function(e) {
    var context = settings.canvasObj.getContext("2d");
    var rect = settings.canvasObj.getBoundingClientRect();

    var c = getRelativeCoords(e);
    var x = c.x;
    var y = c.y;

    if (settings.currentShape !== undefined) {
        // TODO: update the end pos of current shape
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


function setColor(color) {
    settings.nextColor = color;
}


function clearCanvas() {
    settings.shapes = [];
    var context = settings.canvasObj.getContext("2d");
    context.clearRect(0, 0, settings.canvasObj.width, settings.canvasObj.height);
}


function drawAll() {
    var context = settings.canvasObj.getContext("2d");
    context.clearRect(0, 0, settings.canvasObj.width, settings.canvasObj.height);
    for (var i = 0; i < settings.shapes.length; i++) {
        settings.shapes[i].draw(context);
    }
}
