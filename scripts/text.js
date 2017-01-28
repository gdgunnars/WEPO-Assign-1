class Text  {
    constructor(x, y, color, text, type, size, font) {
        this.endX = undefined;
        this.endY = undefined;
        this.x = x;
        this.y = y;
        this.color = (color === undefined) ? "black" : color;
        this.text = text;
        this.type = type;
        this.size = (size == undefined) ? "40px" : size;
        this.font = (font === undefined) ? size + "Courier New" : font;
    }

    draw(context) {
        context.beginPath();
        context.font = this.font;
        context.strokeStyle = this.color;
        context.strokeText(this.text, this.x, this.y);
    }

    setEnd(x, y) {
        this.endX = 0;
        this.endX = 0;
    }
}
