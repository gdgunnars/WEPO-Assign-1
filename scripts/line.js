class Line extends Shape {
    constructor(x, y, primaryColor, secondaryColor, lineWidth, type) {
        super(x, y, primaryColor, secondaryColor, lineWidth, type);
    }

    draw(context) {
        context.shadowBlur = 0;
        context.lineWidth = this.lineWidth;
        context.strokeStyle = this.primaryColor;
        context.beginPath();
        context.moveTo(this.x, this.y);
        context.lineTo(this.endX, this.endY);
        context.stroke();
    }

    pointIsOnLine(context, x, y) {
        var lineRect = this.defineLineAsRect();
        this.drawLineAsRect(context, lineRect, "transparent");
        if (context.isPointInPath(x, y)) {
            return true;
        }
        return false;
    }

    defineLineAsRect() {
        var dx = this.endX - this.x; // deltaX used in length and angle calculations
        var dy = this.endY - this.y; // deltaY used in length and angle calculations
        var lineLength = Math.sqrt(dx * dx + dy * dy);
        var lineRadianAngle = Math.atan2(dy, dx);

        return ({
            translateX: this.x,
            translateY: this.y,
            rotation: lineRadianAngle,
            recontext: 0,
            rectY: -this.lineWidth / 2,
            rectWidth: lineLength,
            rectHeight: this.lineWidth
        });
    }

    drawLineAsRect(context, lineAsRect, color) {
        var r = lineAsRect;
        context.save();
        context.beginPath();
        context.translate(r.translateX, r.translateY);
        context.rotate(r.rotation);
        context.rect(r.recontext, r.rectY, r.rectWidth, r.rectHeight);
        context.translate(-r.translateX, -r.translateY);
        context.rotate(-r.rotation);
        context.fillStyle = color;
        context.strokeStyle = color;
        context.fill();
        context.stroke();
        context.restore();
    }
}
