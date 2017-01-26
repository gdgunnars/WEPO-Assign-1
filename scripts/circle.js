class Circle extends Shape {
    constructor(x, y, color, lineWidth) {
        super(x, y, color, lineWidth);
    }

    draw(context) {
        context.beginPath();
        context.lineWidth = this.lineWidth;
        context.arc(this.x,this.y,50,0,2*Math.PI);
        context.stroke();
    }
}
