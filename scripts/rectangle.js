class Rectangle extends Shape {
    constructor(x, y, color, lineWidth) {
        super(x, y, color, lineWidth);
    }

    draw(context) {
        context.lineWidth = this.lineWidth;
        context.strokeStyle = this.color;
        var height = this.endX - this.x;
        var width = this.endY - this.y;

        //context.fillStyle = this.color;
        context.rect(this.x, this.y, height, width);
        context.stroke();
    }
}
