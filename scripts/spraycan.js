class SprayCan extends Shape {
    constructor(x, y, color, lineWidth, type) {
        super(x, y, color, lineWidth, type);
        this.points = [];
    }

    setEnd(x, y) {
        this.points.push(new Point(x, y));
    }

    draw(context) {
        context.lineJoin = context.lineCap = 'round';
        var timeout;
        var density = 50;
        timeout = setTimeout(function spray() {
            for(var i = density; i--; ) {
                var angle = Math.random() * (0 - Math.PI*2) + Math.PI*2;
                var radius = Math.random() * (0 - 20) + 20;
                //var angle = getRandomFloat(0, Math.PI*2);
                //var radius = getRandomFloat(0, 20);
                context.fillRect(
                    this.x + radius * Math.cos(angle),
                    this.y + radius * Math.sin(angle),
                    1, 1);
            }
            if (!timeout) return;
            timeout = setTimeout(spray, 50);
        }, 50);
    }
}
