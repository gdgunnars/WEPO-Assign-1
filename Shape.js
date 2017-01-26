class Shape {
    constructor() {

    }
}

class Circle extends Shape {
    constructor(x, y) {
        super();
        this.x = x;
        this.y = y;
    }
}


class Rectangle extends Shape {
    constructor() {
        super();

    }

    draw {
        var c=document.getElementById("mainCanvas");
        var ctx=c.getContext("2d");
        ctx.beginPath();
        ctx.arc(this.x,this.y,50,2*Math.PI);
        ctx.stroke();
    }
}
