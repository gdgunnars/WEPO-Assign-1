class Text  {
    constructor(x, y, color, text, type, size, font) {
        this.endX = undefined;
        this.endY = undefined;
        this.x = x;
        this.y = y;
        this.color = (color === undefined) ? "black" : color;
        this.text = text;
        this.type = type;
        this.size = (size === undefined) ? "40px " : size;
        this.font = (font === undefined) ? this.size.concat("Courier New")  : this.size.concat(font);
        console.log(size);
        console.log(this.size);
        console.log(this.font);
    }

    draw(context) {
        context.beginPath();
        context.font = this.font;
        context.fillStyle = this.color;
        context.fillText(this.text, this.x, this.y);
    }

    setEnd(x, y) {
        this.endX = 0;
        this.endX = 0;
    }

    move(context, offsetX, offsetY) {
        this.x += offsetX;
        this.y += offsetY;
        this.endX += offsetX;
        this.endY += offsetY;
    }
}
