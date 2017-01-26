class Shape {
    constructor(x, y, color, lineWidth) {
        this.x = x;
        this.y = y;
        this.endX = x;
        this.endY = y;
        this.color = color;
        this.lineWidth = lineWidth;
    }

    setEnd(x, y) {
        this.endX = x;
        this.endY = y;
    }
}
