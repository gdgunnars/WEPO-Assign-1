class Rectangle extends Shape {
    constructor(x, y, borderColor, fillColor, fill, lineWidth, type) {
        super(x, y, borderColor, lineWidth, type);
        this.fillColor = fillColor;
        this.fill = fill;
    }

    draw(context) {
        context.lineWidth = this.lineWidth;
        context.strokeStyle = this.color;
        var height = this.endX - this.x;
        var width = this.endY - this.y;
        if (this.fill === "Fill") {
            context.fillStyle = this.fillColor;
            context.fillRect(this.x, this.y, height, width);
        }
        context.lineWidth = this.lineWidth;
        context.strokeStyle = this.color;
        context.beginPath();
        context.rect(this.x, this.y, height, width);
        context.stroke();
    }

}
