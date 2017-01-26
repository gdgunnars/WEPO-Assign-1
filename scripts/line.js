class Line extends Shape {
    constructor(x, y, color, lineWidth) {
        super(x, y, color, lineWidth);
    }

    draw(context) {
        context.lineWidth = this.lineWidth;
        context.strokeStyle = this.color;
        context.beginPath();
        context.moveTo(this.x, this.y);
        context.lineTo(this.endX, this.endY);
        context.stroke();
    }
}
