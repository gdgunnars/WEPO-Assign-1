class Circle extends Shape {
    constructor(x, y, primaryColor, secondaryColor, fill, lineWidth, type) {
        super(x, y, primaryColor, secondaryColor, lineWidth, type);
        this.fill = fill;
        this.radiusX = undefined;
        this.radiusY = undefined;
        this.centerX = undefined;
        this.centerY = undefined;
    }

    draw(context) {
        /* Got help to draw an ellipse from this site:
         * http://jsfiddle.net/37vge/21/
         */
        context.shadowBlur = 0;
        context.lineWidth = this.lineWidth;
        context.strokeStyle = this.primaryColor;

        this.radiusX = (this.x - this.endX) / 2;
        this.radiusY = (this.y - this.endY) / 2;
        this.centerX = this.x - this.radiusX;
        this.centerY = this.y - this.radiusY;
        var step = 0.01,
            pi2 = Math.PI * 2 - step;

        context.beginPath();
        context.moveTo(this.centerX + this.radiusX * Math.cos(0),
                       this.centerY + this.radiusY * Math.sin(0));

        for(var a = step; a < pi2; a += step) {
            context.lineTo(this.centerX + this.radiusX * Math.cos(a),
                           this.centerY + this.radiusY * Math.sin(a));

        }

        // Fix minor gap in circle.
        context.lineTo(this.centerX + this.radiusX * Math.cos(a+step),
                       this.centerY + this.radiusY * Math.sin(a+step));
        if (this.fill === "Fill") {
            context.fillStyle = this.secondaryColor;
            context.fill();
        }

        context.stroke();
        context.closePath();
    }
}
