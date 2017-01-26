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
        context.arc(this.x,this.y,50,2*Math.PI);
        context.stroke();
    }
}


class Rectangle extends Shape {
    constructor(x, y, color) {
        super(x, y, color);
    }

    draw(context) {
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, 40, 40);
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
    canvasObj = document.getElementById("mainCanvas"),
    nextShape = "Rectangle",
    nextColor = "Black",
    isDrawing = false,
    currentShape = undefined,
    shapes: []
};

$("mainCanvas").on("mousedown", function(e) {
    settings.isDrawing = true;

    var shape = undefined;
    var context = settings.canvasObj.getContext("2d");
    var rect = canvasObj.getBoundingClientRect();

    var x = e.clientX-rect.left;
    var y = e.clientY-rect.top;

    if (settings.nextShape === "Circle") {
        shape = new Circle(x, y, settings.nextColor);
    }
    else if (settings.nextShape === "Rectangle") {
        shape = new Rectange(x, y, settings.nextColor);
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
    settings.shapes.push(shape);

    shape.draw(context);
});

$("mainCanvas").on("mousemove", function(e) {
    var context = settings.canvasObj.getContext("2d");
    var rect = canvasObj.getBoundingClientRect();

    var x = e.clientX-rect.left;
    var y = e.clientY-rect.top;

    if (settings.currentShape !== undefined) {
        // TODO: update the end pos of current shape
        settings.currentShape.setEnd(x, y);

        drawAll();
    }
});

function drawAll() {
    var context = settings.canvasObj.getContext("2d");
    // TODO: clear the canvasObj

    // TODO: draw all the objects
}

$("mainCanvas").on("mouseup", function(e) {
    var context = settings.canvasObj.getContext("2d");
    var rect = canvasObj.getBoundingClientRect();

    var x = e.clientX-rect.left;
    var y = e.clientY-rect.top;

    settings.currentShape.setEnd(x, y);
    settings.currentShape = undefined;
});
