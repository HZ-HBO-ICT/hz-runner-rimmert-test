export default class Trophy {
    image;
    positionY;
    positionX;
    speed;
    leftLane;
    middleLane;
    rightLane;
    canvas;
    constructor(canvas) {
        this.canvas = canvas;
        this.leftLane = this.canvas.width / 4;
        this.middleLane = this.canvas.width / 2;
        this.rightLane = (this.canvas.width / 4) * 3;
        const random = Trophy.randomInteger(1, 3);
        if (random === 1) {
            this.positionX = this.leftLane;
        }
        if (random === 2) {
            this.positionX = this.middleLane;
        }
        if (random === 3) {
            this.positionX = this.rightLane;
        }
        this.image = Trophy.loadNewImage('assets/img/objects/gold_trophy.png');
        this.positionY = 60;
        this.speed = 1;
    }
    get $image() {
        return this.image;
    }
    get $positionY() {
        return this.positionY;
    }
    get $positionX() {
        return this.positionX;
    }
    get $speed() {
        return this.speed;
    }
    move() {
        this.positionY += this.speed;
    }
    collisionWithCanvasBottom() {
        if (this.positionY + this.image.height > this.canvas.height) {
            return true;
        }
        return false;
    }
    draw(ctx) {
        ctx.drawImage(this.image, this.positionX - this.image.width / 2, this.positionY);
    }
    static randomInteger(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }
    static loadNewImage(source) {
        const img = new Image();
        img.src = source;
        return img;
    }
}
//# sourceMappingURL=Trophy.js.map