class Circle extends Shape {
    constructor(x, y, color, lineWidth) {
        super(x, y, color, lineWidth);
    }

    draw(context) {
        /* Got help to draw an ellipse from this site:
         * http://jsfiddle.net/37vge/21/
         */
        context.lineWidth = this.lineWidth;
        context.strokeStyle = this.color;

        var radiusX = (this.x - this.endX) / 2,
            radiusY = (this.y - this.endY) / 2,
            centerX = this.x - radiusX,
            centerY = this.y - radiusY,
            step = 0.01,
            pi2 = Math.PI * 2 - step;

        context.beginPath();
        context.moveTo(centerX + radiusX * Math.cos(0),
                       centerY + radiusY * Math.sin(0));

        for(var a = step; a < pi2; a += step) {
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
