class Shape {
    constructor(x, y, color, lineWidth, type) {
        this.x = x;
        this.y = y;
        this.endX = x;
        this.endY = y;
        this.color = color;
        this.lineWidth = lineWidth;
        this.type = type;
    }

    setEnd(x, y) {
        this.endX = x;
        this.endY = y;
    }
}
