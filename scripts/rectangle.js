class Rectangle extends Shape {
    constructor(x, y, primaryColor, secondaryColor, fill, lineWidth, type) {
        super(x, y, primaryColor, secondaryColor, lineWidth, type);
        this.fill = fill;
    }

    draw(context) {
        context.lineJoin = "miter";
        context.lineCap = "miter";
        context.shadowBlur = 0;
        context.lineWidth = this.lineWidth;
        context.strokeStyle = this.primaryColor;
        var height = this.endX - this.x;
        var width = this.endY - this.y;
        if (this.fill === "Fill") {
            context.fillStyle = this.secondaryColor;
            context.fillRect(this.x, this.y, height, width);
        }
        context.lineWidth = this.lineWidth;
        context.strokeStyle = this.primaryColor;
        context.beginPath();
        context.rect(this.x, this.y, height, width);
        context.stroke();
    }
}
