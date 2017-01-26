var settings = {
    canvasObj: document.getElementById("mainCanvas"),
    nextShape: "Circle",
    nextColor: "#000",
    isDrawing: false,
    currentShape: undefined,
    shapes: [],
    canvasWidth: 800,
    canvasHeight: 600,
    lineWidth: 6
};

class Shape {
    constructor(x, y, color, lineWidth) {
        this.x = x;
        this.y = y;
        this.endX = x;
        this.endY = y;
        this.color = color;
        this.lineWidth = lineWidth;
    }

    setEnd(x, y) {
        this.endX = x;
        this.endY = y;
    }
}

class Circle extends Shape {
    constructor(x, y, color, lineWidth) {
        super(x, y, color, lineWidth);
    }

    draw(context) {
        context.beginPath();
        context.lineWidth = this.lineWidth;
        context.arc(this.x,this.y,50,0,2*Math.PI);
        context.stroke();
    }
}

class Rectangle extends Shape {
    constructor(x, y, color, lineWidth) {
        super(x, y, color, lineWidth);
    }

    draw(context) {
        var height = this.endX - this.x;
        var width = this.endY - this.y;

        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, height, width);
    }
}

class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

class Pen extends Shape {
    constructor(x, y, color, lineWidth) {
        super(x, y, color, lineWidth);
        this.points = [];
    }

    setEnd(x, y) {
        this.points.push(new Point(x, y));
    }

    draw(context) {
        /* Got help from this site to draw smooth lines:
         * http://codetheory.in/html5-canvas-drawing-lines-with-smooth-edges/
         */
        context.lineWidth = this.lineWidth;
        context.strokeStyle = this.color;
    	context.fillStyle = this.color;

        if (this.points.length < 3) {
            context.beginPath();
            context.arc(this.x, this.y, context.lineWidth / 2, 0, Math.PI * 2, !0);
			context.fill();
			context.closePath();
        }
        else {
            context.beginPath();
            context.moveTo(this.x, this.y);
            var i;

            for (i = 1; i < this.points.length-1; i++) {
                var c = (this.points[i].x + this.points[i + 1].x) / 2;
                var d = (this.points[i].y + this.points[i + 1].y) / 2;
                context.quadraticCurveTo(
                    this.points[i].x,
                    this.points[i].y,
                    this.points[i+1].x,
                    this.points[i+1].y);
            }
            context.stroke();
        }
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

class Text {
    constructor(x, y, color) {
        // TODO: do stuff
    }

    draw(context) {
        // TODO: draw text
    }
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
