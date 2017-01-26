class Shape {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.endX = x;
        this.endY = y;
        this.color = color;
    }

    setEnd(x, y) {
        this.endX = x;
        this.endY = y;
    }
}

class Circle extends Shape {
    constructor(x, y, color) {
        super(x, y, color);
    }

    draw(context) {
        context.beginPath();
        context.arc(this.x,this.y,50,0,2*Math.PI);
        context.stroke();
    }
}


class Rectangle extends Shape {
    constructor(x, y, color) {
        super(x, y, color);
    }

    draw(context) {
        var height = this.endX - this.x;
        var width = this.endY - this.y;

        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, height, width);
    }
}


class Pen extends Shape {
    constructor(x, y, color) {
        super(x, y, color);
        this.points = [];
    }

    setEnd(x, y) {
        this.points.push({x: x, y: y});
        //TODO: create class for point, so we can use push(new Point(x,y)).
    }

    draw(context) {
        // TODO: draw Pen
    }
}


class Line extends Shape {
    constructor(x, y, color) {
        super(x, y, color);
    }

    draw(context) {
        // TODO: draw Line
    }
}

class Text extends Shape {
    constructor(x, y, color) {
        super(x, y, color);
    }

    draw(context) {
        // TODO: draw text
    }
}

var settings = {
    canvasObj: document.getElementById("mainCanvas"),
    nextShape: "Circle",
    nextColor: "#000",
    isDrawing: false,
    currentShape: undefined,
    shapes: [],
    canvasWidth: 800,
    canvasHeight: 600
};


function getRelativeCoords(event) {
    return { x: event.offsetX || event.layerX, y: event.offsetY || event.layerY };
}




$("#mainCanvas").on("mousedown", function(e) {
    console.log("Mouse down");
    settings.isDrawing = true;

    var shape = undefined;
    var context = settings.canvasObj.getContext("2d");
    var rect = settings.canvasObj.getBoundingClientRect();

    var c = getRelativeCoords(e);
    var x = c.x;
    var y = c.y;

    if (settings.nextShape === "Circle") {
        shape = new Circle(x, y, settings.nextColor);
    }
    else if (settings.nextShape === "Rectangle") {
        shape = new Rectangle(x, y, settings.nextColor);
    }
    else if (settings.nextShape === "Pen") {
        shape = new Pen(x, y, settings.nextColor);
    }
    else if (settings.nextShape === "Line") {
        shape = new Line(x, y, settings.nextColor);
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

function drawAll() {
    var context = settings.canvasObj.getContext("2d");

    // TODO: clear the canvasObj
    context.fillStyle = "#FFF";
    context.fillRect(0, 0, settings.canvasWidth, settings.canvasHeight);


    // TODO: draw all the objects
    for (var i = 0; i < settings.shapes.length; i++) {
        settings.shapes[i].draw(context);
    }
}

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
