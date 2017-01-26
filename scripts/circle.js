class Circle extends Shape {
    constructor(x, y, color, lineWidth) {
        super(x, y, color, lineWidth);
    }

    draw(context) {
        context.lineWidth = this.lineWidth;
        context.strokeStyle = this.color;

        var radiusX = (this.x - this.endX) * 0.5,
            radiusY = (this.y - this.endY) * 0.5,
            centerX = this.x - radiusX,
            centerY = this.y - radiusY,
            step = 0.01,
            a = step,
            pi2 = Math.PI * 2 - step;

        context.beginPath();
        context.moveTo(centerX + radiusX * Math.cos(0),
                       centerY + radiusY * Math.sin(0));

        for(; a < pi2; a += step) {
            context.lineTo(centerX + radiusX * Math.cos(a),
                           centerY + radiusY * Math.sin(a));
        }

        // Fix minor gap in circle.
        context.lineTo(centerX + radiusX * Math.cos(a+step),
                       centerY + radiusY * Math.sin(a+step));

        context.stroke();
        context.closePath();
    }
}
