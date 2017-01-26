

var settings = {
    canvasObj: document.getElementById("mainCanvas"),
    nextShape: "Pen",
    nextColor: "#000",
    isDrawing: false,
    currentShape: undefined,
    shapes: [],
    canvasWidth: 800,
    canvasHeight: 600,
    lineWidth: 6
};

$('input[type=radio][name=shape]').on('change', function() {
    switch($(this).val()) {
        case 'Rectangle':
            console.log("Set shape to rectangle");
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
    }
});


$("#mainCanvas").on("mousedown", function(e) {
    console.log("Mouse down");
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
    else if (settings.nextShape === "Pen") {
        shape = new Pen(x, y, settings.nextColor, settings.lineWidth);
    }
    else if (settings.nextShape === "Line") {
        shape = new Line(x, y, settings.nextColor, settings.lineWidth);
    }
    else if (settings.nextShape === "Text") {
        shape = new Text(x, y, settings.nextColor);
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
        console.log("Mouse down and moved");
        // TODO: update the end pos of current shape
        settings.currentShape.setEnd(x, y);

        drawAll();
        settings.currentShape.draw(context);
    }
});



$("#mainCanvas").on("mouseup", function(e) {
    console.log("Mouse up");
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


function drawAll() {
    var context = settings.canvasObj.getContext("2d");

    // TODO: clear the canvasObj
    context.clearRect(0, 0, settings.canvasObj.width, settings.canvasObj.height);

    // TODO: draw all the objects
    for (var i = 0; i < settings.shapes.length; i++) {
        settings.shapes[i].draw(context);
    }
}
