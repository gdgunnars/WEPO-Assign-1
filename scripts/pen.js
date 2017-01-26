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
