class Text  extends Shape {
    constructor(x, y, primaryColor, secondaryColor, text, type, size, font, context) {
        super(x, y, primaryColor, secondaryColor, undefined, type);
        this.text = text.split('\n');
        this.size = size;
        this.font = this.size.concat(font);
        this.width = this.maxWidth(context);
        this.y -= parseInt(this.size);
        this.endX = this.x + this.width;
        this.endY = this.y + (parseInt(this.size) * this.text.length-1);
    }

    draw(context) {
        context.beginPath();
        context.font = this.font;
        context.fillStyle = this.primaryColor;
        for (var i = 0; i < this.text.length; i++) {
            context.fillText(this.text[i], this.x, this.y + (parseInt(this.size) * i) + parseInt(this.size));
        }
        /*
        var height = this.endX - this.x;
        var width = this.endY - this.y;
        context.strokeStyle = "#F00";
        context.rect(this.x, this.y, height, width);
        context.stroke();*/
    }

    setEnd(x, y) {
        this.endX = this.x + this.width;
        this.endY = this.textY + parseInt(this.size);
    }

    maxWidth(context) {
        context.font = this.font;
        var w = 0;
        for (var i = 0; i < this.text.length; i++) {
            var lineWidth = parseInt(context.measureText(this.text[i]).width);
            if (lineWidth > w) {
                w = lineWidth;
            }
        }
        return w;
    }

    move(offsetX, offsetY) {
        this.x += offsetX;
        this.y += offsetY;
        this.endX += offsetX;
        this.endY += offsetY;
    }
}
