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
        //context.fillStyle = this.color;
        //context.fillRect(this.x, this.y, 200, 200);
        context.fillRect(this.x, this.y, 40, 40);
        console.log(this.x, this.y);
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
    nextShape: "Rectangle",
    nextColor: "Black",
    isDrawing: false,
    currentShape: undefined,
    shapes: []
};

$("#mainCanvas").on("mousedown", function(e) {
    console.log("Mouse down");
    settings.isDrawing = true;

    var shape = undefined;
    var context = settings.canvasObj.getContext("2d");
    var rect = settings.canvasObj.getBoundingClientRect();

    var x = e.pageX - this.offsetLeft;
    var y = e.pageY - this.offsetTop;

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
    settings.shapes.push(shape);

    shape.draw(context);
});

$("#mainCanvas").on("mousemove", function(e) {
    var context = settings.canvasObj.getContext("2d");
    var rect = settings.canvasObj.getBoundingClientRect();

    var x = e.clientX-rect.left;
    var y = e.clientY-rect.top;

    if (settings.currentShape !== undefined) {
        console.log("Mouse down and moved");
        // TODO: update the end pos of current shape
        settings.currentShape.setEnd(x, y);

        drawAll();
    }
});

function drawAll() {
    var context = settings.canvasObj.getContext("2d");
    context.fillStyle="#FFF";
    context.fillRect(0, 0, 800, 600);
    // TODO: clear the canvasObj

    // TODO: draw all the objects
}

$("#mainCanvas").on("mouseup", function(e) {
    console.log("Mouse up");
    var context = settings.canvasObj.getContext("2d");
    var rect = settings.canvasObj.getBoundingClientRect();

    var x = e.clientX-rect.left;
    var y = e.clientY-rect.top;

    if (settings.currentShape !== undefined) {
        settings.currentShape.setEnd(x, y);
    }

    settings.currentShape = undefined;
});
/*
var context = settings.canvasObj.getContext("2d");
var c = new Rectangle(200, 200, "black");
c.draw(context);
*/
