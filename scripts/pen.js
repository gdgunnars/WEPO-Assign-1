class Pen extends Shape {
    constructor(x, y, primaryColor, secondaryColor, fill, lineWidth, type) {
        super(x, y, primaryColor, secondaryColor, lineWidth, type);
        this.points = [];
        this.fill = fill;
    }

    setEnd(x, y) {
        this.points.push(new Point(x, y));
    }

    draw(context) {
        /* Got help from this site to draw smooth lines:
         * http://codetheory.in/html5-canvas-drawing-lines-with-smooth-edges/
         */
        context.restore();
        context.lineWidth = this.lineWidth;
        context.strokeStyle = this.primaryColor;
    	context.fillStyle = this.primaryColor;
        context.lineJoin = "round";
        context.lineCap = "round";

        if (this.fill === "Fill") {
            context.shadowBlur = this.lineWidth * 4;
            context.shadowColor = this.secondaryColor;
        }
        else {
            context.shadowBlur = 0;
        }

        if (this.points.length < 3) {
            context.beginPath();
            context.arc(this.x, this.y, context.lineWidth / 2, 0, Math.PI * 2, !0);
			context.fill();
			context.closePath();
            return;
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
            //context.shadowBlur = 0;
            context.closePath();
        }
    }

    move(offsetX, offsetY) {
        this.x += offsetX;
        this.y += offsetY;
        for (var i = 0; i < this.points.length; i++) {
            this.points[i].x += offsetX;
            this.points[i].y += offsetY;
        }
    }
}
