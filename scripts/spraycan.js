class SprayCan extends Shape {
    constructor(x, y, color, lineWidth) {
        super(x, y, color, lineWidth);
        this.points = [];
    }

    setEnd(x, y) {
        this.points.push(new Point(x, y));
    }

    draw(context) {
        /*
        TODO: do stuff
        */
    }
}
