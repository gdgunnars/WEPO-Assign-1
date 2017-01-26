class FilledRectangle extends Shape {
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
