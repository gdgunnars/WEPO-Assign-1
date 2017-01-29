var settings = {
    canvasObj: document.getElementById("mainCanvas"),
    nextShape: "Pen",
    nextPrimaryColor: "#000",
    nextSecondaryColor: "#000",
    font: "Arial",
    fontSize: "12px ",
    currentShape: undefined,
    shapes: [],
    undo: [],
    redo: [],
    chosenIndex: undefined,
    lineWidth: 1,
    fill: "NoFill",
    currentTool: "DrawTool",
    lastMX: 0,
    lastMY: 0,
    inputtingText: false,
    textX: 0,
    texty: 0
};

$(document).ready(function() {
    var select = $("<select></select>", {
        class: 'line-width form-control'
    });

    for (var i = 1; i <= 20; i++) {
        select.append($('<option>', {
            value: i,
            text: i
        }));
    }
    $("#linewidth").append(select);

    $('select.line-width').on('change', function() {
        settings.lineWidth = this.value;
    });

    select = $("<select></select>", {
        class: 'font form-control',
        id: 'font-select'
    });

    var fonts = ["Arial", "Calibri", "Candara", "Times New Roman", "Verdana",
                "Tahoma", "Comic Sans MS", "Trebuchet MS", "Impact"];


    for (var i = 0; i < fonts.length; i++) {
        select.append($('<option>', {
            value: fonts[i],
            text: fonts[i]
        }));
    }
    $("#font").append(select);

    $('select.font').on('change', function() {
        settings.font = this.value;
    })

    select = $("<select></select>", {
        class: 'fontsize form-control',
        id: 'fontsize-select'
    });

    var sizes = ["8", "9", "10", "11", "12",
                "14", "16", "18", "20", "22",
                "24", "26", "28", "36", "48", "72"];
    for (var i = 0; i < 16; i++) {
        select.append($('<option>', {
            value: sizes[i].concat("px "),
            text: sizes[i]
        }));
    }
    $("#fontsize").append(select);

    $('select.fontsize').on('change', function() {
        settings.fontSize = this.value;
    })
    $('select.fontsize').val("12px ");

    fillPicNav();
    fillTemplNav();
});

$('input[type=radio][name=tool]').on('change', function() {
    switch ($(this).val()) {
        case 'DrawTool':
            setTool("DrawTool");
            break;
        case 'MoveTool':
            setTool("MoveTool");
            break;
        case 'EditTool':
            setTool("EditTool");
            break;
        case 'ColorTool':
            setTool("ColorTool");
            break;
        case 'DeleteTool':
            setTool("DeleteTool");
            break;
    }
});

$('input[type=radio][name=shape]').on('change', function() {
    switch($(this).val()) {
        case 'Rectangle':
            setShape("Rectangle");
            break;
        case 'Pen':
            setShape("Pen");
            break;
        case 'Circle':
            setShape("Circle");
            break;
        case 'Line':
            setShape("Line");
            break;
        case 'Text':
            setShape("Text");
            break;
    }
});

$(document).keypress(function(e) {
    if (!settings.inputtingText) {

        // Ctrl + Z
        if (e.keyCode === 26){
            undo();
        }
        // Ctrl + Y
        if (e.keyCode === 25){
            redo();
        }
        if (e.keyCode === 68) {
            $("#deletetool").prop("checked", true);
            setTool("DeleteTool");
        }
        if (e.keyCode === 100) {
            $("#drawtool").prop("checked", true);
            setTool("DrawTool");
        }
        if (e.keyCode === 101) {
            $("#edittool").prop("checked", true);
            setTool("EditTool");
        }
        if (e.keyCode === 109) {
            $("#movetool").prop("checked", true);
            setTool("MoveTool");
        }
        if (e.keyCode === 98) {
            $("#colortool").prop("checked", true);
            setTool("ColorTool");
        }
        if (e.keyCode === 112) {
            $("#pen").prop("checked", true);
            setShape("Pen");
        }
        if (e.keyCode === 108) {
            $("#line").prop("checked", true);
            setShape("Line");
        }
        if (e.keyCode === 114) {
            $("#rect").prop("checked", true);
            setShape("Rectangle");
        }
        if (e.keyCode === 99) {
            $("#circle").prop("checked", true);
            setShape("Circle");
        }
        if (e.keyCode === 116) {
            $("#text").prop("checked", true);
            setShape("Text");
        }
        if (e.keyCode === 82) {
            $("#button_clear").trigger("click");
        }
    }
});

$('#button_clear').on('click', function() {
    var r = confirm("Press OK to clear the entire canvas.");

    if (r == true) {
        clearCanvas();
    }
});


$('#button_undo').on('click', function() {
    undo();
});

$('#button_redo').on('click', function() {
    redo();
});

$('#button_save').on('click', function() {
    var title = prompt("Enter drawing name", "drawing");

    if (settings.shapes.length == 0){
        alert("You can't save an empty canvas");
    }
    else if (title != undefined) {
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
                fillPicNav();
            },
            error: function (xhr, err) {
                // The drawing could NOT be saved
            }
        });
    }
});

$('#button_save_templ').on('click', function() {
    var title = prompt("Enter template name", "My template");

    if (settings.shapes.length == 0){
        alert("You can't save an empty canvas");
    }
    else if (title != undefined) {
        var drawing = {
        title: title,
        content: settings.shapes
        }
        var url = "http://localhost:3000/api/templates";
        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            url: url,
            data: JSON.stringify(drawing),
            success: function (data) {
                // The drawing was successfully saved
                fillTemplNav();
            },
            error: function (xhr, err) {
                // The drawing could NOT be saved
            }
        });
    }
});

$('input[type=radio][name=fill]').on('change', function() {
    switch ($(this).val()) {
        case "Fill":
            setFill("Fill");
            break;
        case "NoFill":
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
    settings.lastMX = x;
    settings.lastMY = y;

    if (settings.currentTool !== "DrawTool") {
        setCurrentShapeToClicked(context, x, y);
        if (settings.currentTool === "MoveTool" && settings.chosenIndex !== undefined) {
            settings.undo.push({
                shape: {
                x: settings.currentShape.x,
                y: settings.currentShape.y,
                endX: settings.currentShape.endX,
                endY: settings.currentShape.endY},
                index: settings.chosenIndex,
                tool: "MoveTool"
            });
        }
        else if (settings.currentTool === "ColorTool" && settings.chosenIndex !== undefined) {
            settings.undo.push({
                shape: {
                primaryColor: settings.currentShape.primaryColor,
                secondaryColor: settings.currentShape.secondaryColor},
                index: settings.chosenIndex,
                tool: "ColorTool"
            });
        }
        else if (settings.currentTool === "EditTool" && settings.chosenIndex !== undefined) {
            settings.undo.push({
                shape: {
                endX: settings.currentShape.endX,
                endY: settings.currentShape.endY},
                index: settings.chosenIndex,
                tool: "EditTool"
            });
        }
    }
    else {
        if (settings.nextShape === "Circle") {
            shape = new Circle(x, y, settings.nextPrimaryColor, settings.nextSecondaryColor,
                                     settings.fill, settings.lineWidth, "Circle");
        }
        else if (settings.nextShape === "Rectangle") {
            shape = new Rectangle(x, y, settings.nextPrimaryColor, settings.nextSecondaryColor,
                                        settings.fill, settings.lineWidth, "Rectangle");
        }
        else if (settings.nextShape === "Pen") {
            shape = new Pen(x, y, settings.nextPrimaryColor, settings.nextSecondaryColor,
                                  settings.fill, settings.lineWidth, "Pen");
        }
        else if (settings.nextShape === "Line") {
            shape = new Line(x, y, settings.nextPrimaryColor, settings.nextSecondaryColor, settings.lineWidth, "Line");
        }
        else if (settings.nextShape === "Text") {
            if (!settings.inputtingText) {
                settings.inputtingText = true;
                $('#text_input').css({"visibility": "visible", "left": e.pageX, "top": e.pageY});
                $("#text_input").focus();
                settings.textX = x;
                settings.textY = y;
            }
            else {
                settings.inputtingText = false;
                $('#text_input').css({"visibility": "hidden"});
                var text = $('#text_input').val();
                if (text !== '') {
                    shape = new Text(settings.textX, settings.textY, settings.nextPrimaryColor, settings.nextSecondaryColor,
                                    text, "Text", settings.fontSize, settings.font, context);
                    settings.shapes.push(shape);
                    console.log(settings.shapes);
                }
                $('#text_input').val('');
            }
        }

        if (shape !== undefined) {
            settings.currentShape = shape;
            shape.draw(context);
        }
    }
});

$("#mainCanvas").on("mousemove", function(e) {
    var context = settings.canvasObj.getContext("2d");
    var rect = settings.canvasObj.getBoundingClientRect();
    var c = getRelativeCoords(e);
    var x = c.x;
    var y = c.y;
    var offsetMX;
    var offsetMY;

    if (settings.currentShape !== undefined && settings.currentTool === "MoveTool") {
        offsetMX = x - settings.lastMX;
        offsetMY = y - settings.lastMY;
        if(isNaN(offsetMX)) {
            offsetMX = 0;
        }
        if(isNaN(offsetMY)) {
            offsetMY = 0;
        }
        settings.lastMX = x;
        settings.lastMY = y;
        settings.currentShape.move(offsetMX, offsetMY);
        drawAll();
    }
    else if (settings.currentShape !== undefined && settings.currentTool === "DrawTool") {
        if (settings.currentShape.type !== "Text") {
            settings.currentShape.setEnd(x, y);
        }
        drawAll();
        settings.currentShape.draw(context);
    }
    else if (settings.currentShape !== undefined && settings.currentTool === "EditTool") {
        if (settings.currentShape.type !== "Pen" && settings.currentShape.type !== "Text") {
            settings.currentShape.setEnd(x, y);
        }
        drawAll();
    }
});

$("#mainCanvas").on("mouseup", function(e) {
    var context = settings.canvasObj.getContext("2d");
    var rect = settings.canvasObj.getBoundingClientRect();
    var c = getRelativeCoords(e);
    var x = c.x;
    var y = c.y;

    if (settings.currentShape !== undefined ) {
        if (settings.currentTool === "DrawTool") {
            if (settings.currentShape.type !== "Text") {
                settings.shapes.push(settings.currentShape);
                settings.undo.push({
                    shape: settings.currentShape,
                    index: settings.shapes.length - 1,
                    tool: "DrawTool"
                });
            }
        }
        if (settings.currentTool === "DrawTool" || settings.currentTool === "EditTool") {
            if (settings.currentShape.type !== "Pen" && settings.currentShape.type !== "Text") {
                settings.currentShape.setEnd(x, y);
            }
        }
        if (settings.currentTool === "ColorTool") {
            setCurrentShapeToClicked(context, x, y);
            settings.currentShape.primaryColor = settings.nextPrimaryColor;
            settings.currentShape.secondaryColor = settings.nextSecondaryColor;
            settings.currentShape.fill = settings.fill;
            drawAll();
        }
        if (settings.currentTool === "DeleteTool") {
            var r = confirm("Press OK to delete ".concat(settings.currentShape.type));
            if (r == true) {
                removeCurrentShape();
                drawAll();
            } else {
                return;
            }
        }

        settings.currentShape = undefined;
    }
});

$('#mainCanvas').on("mouseleave", function(e) {
    var e = $.Event( "mouseup", { which: 1 } );
    $("#mainCanvas").trigger(e);
});

function getRelativeCoords(event) {
    return { x: event.offsetX || event.layerX, y: event.offsetY || event.layerY };
}

function setShape(shape) {
    $("#drawtool").prop("checked", true)
    setTool("DrawTool");
    settings.nextShape = shape;
}

function setTool(tool) {
    settings.currentTool = tool;
    if (tool === "MoveTool") {
        $('#mainCanvas').css('cursor','move');
    }
    else if (tool === "EditTool") {
        $('#mainCanvas').css('cursor','nwse-resize');
    }
    else {
        $('#mainCanvas').css('cursor','auto');
    }
}

function setWidth(lwidth) {
    settings.lineWidth = lwidth;
}

function setColor(color, id) {
    if (id === "colorpicker_border"){
        settings.nextPrimaryColor = color;
    }
    else if (id === "colorpicker_fill"){
        settings.nextSecondaryColor = color;
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
    if(settings.undo.length > 0) {
        var item = settings.undo.pop();
        if (item['tool'] === "DrawTool") {
            settings.redo.push(item);
            settings.shapes.pop();
        }
        else if (item['tool'] === "MoveTool") {
            settings.redo.push({
                shape: {
                x: settings.shapes[item['index']].x,
                y: settings.shapes[item['index']].y,
                endX: settings.shapes[item['index']].endX,
                endY: settings.shapes[item['index']].endY},
                index: item['index'],
                tool: item['tool']
            });
            settings.shapes[item['index']].x = item['shape'].x;
            settings.shapes[item['index']].y = item['shape'].y;
            settings.shapes[item['index']].endX = item['shape'].endX;
            settings.shapes[item['index']].endY = item['shape'].endY;
        }
        else if (item['tool'] === "ColorTool") {
            settings.redo.push({
                shape: {
                primaryColor: settings.shapes[item['index']].primaryColor,
                secondaryColor: settings.shapes[item['index']].secondaryColor},
                index: item['index'],
                tool: item['tool']
            });
            settings.shapes[item['index']].primaryColor = item['shape'].primaryColor;
            settings.shapes[item['index']].secondaryColor = item['shape'].secondaryColor;
        }
        else if (item['tool'] === "EditTool") {
            settings.redo.push({
                shape: {
                endX: settings.shapes[item['index']].endX,
                endY: settings.shapes[item['index']].endY},
                index: item['index'],
                tool: item['tool']
            });
            settings.shapes[item['index']].endX = item['shape'].endX;
            settings.shapes[item['index']].endY = item['shape'].endY;
        }
        else if (item['tool'] === "DeleteTool") {
            settings.shapes.push(item['shape']);
            settings.redo.push(item);
        }
    }
    drawAll();
}

function redo() {
    if (settings.redo.length > 0) {
        var item = settings.redo.pop();
        if (item['tool'] === "DrawTool") {
            settings.undo.push(item);
            settings.shapes.push(item['shape']);
        }
        else if (item['tool'] === "MoveTool") {
            settings.undo.push({
                shape: {
                    x: settings.shapes[item['index']].x,
                    y: settings.shapes[item['index']].y,
                    endX: settings.shapes[item['index']].endX,
                    endY: settings.shapes[item['index']].endY},
                index: item['index'],
                tool: item['tool']
            });
            settings.shapes[item['index']].x = item['shape'].x;
            settings.shapes[item['index']].y = item['shape'].y;
            settings.shapes[item['index']].endX = item['shape'].endX;
            settings.shapes[item['index']].endY = item['shape'].endY;
        }
        else if (item['tool'] === "ColorTool") {
            settings.undo.push({
                shape: {
                primaryColor: settings.shapes[item['index']].primaryColor,
                secondaryColor: settings.shapes[item['index']].secondaryColor},
                index: item['index'],
                tool: item['tool']
            });
            settings.shapes[item['index']].primaryColor = item['shape'].primaryColor;
            settings.shapes[item['index']].secondaryColor = item['shape'].secondaryColor;
        }
        else if (item['tool'] === "EditTool") {
            settings.undo.push({
                shape: {
                endX: settings.shapes[item['index']].endX,
                endY: settings.shapes[item['index']].endY},
                index: item['index'],
                tool: item['tool']
            });
            settings.shapes[item['index']].endX = item['shape'].endX;
            settings.shapes[item['index']].endY = item['shape'].endY;
        }
        else if (item['tool'] === "DeleteTool") {
            settings.undo.push(item);
            settings.shapes.pop();
        }
    }
    drawAll();
}

function drawAll() {
    var context = settings.canvasObj.getContext("2d");
    context.clearRect(0, 0, settings.canvasObj.width, settings.canvasObj.height);

    for (var i = 0; i < settings.shapes.length; i++) {
        settings.shapes[i].draw(context);
    }
}

function removeCurrentShape() {
    for (var i = settings.shapes.length-1; i >= 0; i--) {
        if (settings.shapes[i] === settings.currentShape) {
            settings.undo.push({
                shape: settings.shapes[i],
                index: i,
                tool: "DeleteTool"
            });

            settings.shapes.splice(i, 1);
        }
    }
}

function setCurrentShapeToClicked(context, x, y) {
    // Find shape on highest layer that is under cursor.
    var dragging = false;
    var highestIndex = -1;
    settings.chosenIndex = undefined;

    for (var i = settings.shapes.length-1; i >= 0; i--) {
        if (hitTest(context, settings.shapes[i], x, y)) {
            settings.chosenIndex = i;
            dragging = true;
            settings.currentShape = settings.shapes[i];
            break;
        }
    }
}


function hitTest(context, shape, mx, my) {
    if (shape.type === "Circle") {
        var dx = mx - shape.centerX;
        var dy = my - shape.centerY;
        return ((dx * dx) / (shape.radiusX * shape.radiusX) + (dy * dy) / (shape.radiusY * shape.radiusY) <= 1);
    }
    else if (shape.type === "Pen") {
        var x1, y1, x2, y2, startX, startY, endX, endY;
        for (var i = 0; i < shape.points.length-2; i++) {
            x1 = shape.points[i].x;
            y1 = shape.points[i].y;
            x2 = shape.points[i + 1].x;
            y2 = shape.points[i + 1].y;
            startX = Math.min(x1, x2);
            startY = Math.min(y1, y2);
            endX = Math.max(x1, x2);
            endY = Math.max(y1, y2);

            if ((mx >= startX-shape.lineWidth*0.5 && mx <= endX+shape.lineWidth*0.5)
                && (my >= startY-shape.lineWidth*0.5 && my <= endY+shape.lineWidth*0.5)) {
                return true;
            }
        }
        return false;
    }
    else if (shape.type === "Line") {
        return shape.pointIsOnLine(context, mx, my);
    }
    else {
        var startX = Math.min(shape.x, shape.endX);
        var startY = Math.min(shape.y, shape.endY);
        var endX = Math.max(shape.x, shape.endX);
        var endY = Math.max(shape.y, shape.endY);

        return ((mx >= startX && mx <= endX) && (my >= startY && my <= endY));
    }
}

function fillPicNav() {
    var url = "http://localhost:3000/api/drawings";
    $("#pic_list").html("");
    $.get(url, function(data, status){
        for (var i = 0; i < data.length; i++){
            $("#pic_list").append('<li><button type="button" class="btn btn-default" onclick="getSingleCanvas('+i+')">'+data[i]['title']+'</button></li>');
        }
    });
}

function getSingleCanvas(id) {
    var r = confirm("If you haven't saved, all your data will be lost.");
    if (r == true) {
        var url = "http://localhost:3000/api/drawings/"+id;
        $.get(url, function(data, status){
            clearCanvas();
            var items = data.content;
            for (var i = 0; i < items.length; i++) {
                var func = eval(items[i].type); // Geri ráð fyrir að sérhvert object sé með property sem heitir "type"
                items[i].__proto__ = func.prototype;
                // Hér er hægt að taka viðeigandi item og setja það í arrayið sem við notum til að geyma öll shape-in í teikningunni
                settings.shapes.push(items[i]);
            }
            drawAll();

        });
    } else {
        return;
    }
}

function fillTemplNav() {
    var url = "http://localhost:3000/api/templates";
    $("#templ_list").html("");
    $.get(url, function(data, status){
        for( var i = 0; i < data.length; i++){
            $("#templ_list").append('<li><button type="button" class="btn btn-default" onclick="getSingleTemplate('+i+')">'+data[i]['title']+'</button></li>');
        }
    });
}

function getSingleTemplate(id) {
    var url = "http://localhost:3000/api/templates/"+id ;
    $.get(url, function(data, status){
        var items = data.content;
        for (var i = 0; i < items.length; i++) {
            var func = eval(items[i].type);
            items[i].__proto__ = func.prototype;
            settings.shapes.push(items[i]);
        }
        drawAll();
    });
}
