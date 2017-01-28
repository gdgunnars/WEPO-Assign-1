class Text {
    constructor(x, y, text, color, font) {
        this.x = x;
        this.y = y;
        this.text = text;
        this.color = (color === undefined) ? "black" : color;
        this.font = (font === undefined) ? "20px Courier New" : font;
    }

    draw(context) {
        context.font = this.font;
        context.strokeStyle = this.color;
        context.strokeText(this.text, this.x, this.y);
    }
}
