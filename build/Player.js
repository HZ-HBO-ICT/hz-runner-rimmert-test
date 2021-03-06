import KeyListener from './KeyListener.js';
export default class Player {
    positionX;
    image;
    keyListener;
    leftLane;
    middleLane;
    rightLane;
    canvas;
    constructor(canvas) {
        this.canvas = canvas;
        this.image = Player.loadNewImage('./assets/img/players/character_robot_walk0.png');
        this.positionX = this.canvas.width / 2;
        this.keyListener = new KeyListener();
        this.leftLane = this.canvas.width / 4;
        this.middleLane = this.canvas.width / 2;
        this.rightLane = (this.canvas.width / 4) * 3;
    }
    collidesWithTrophy(trophy) {
        if (this.positionX < trophy.$positionX + trophy.$image.width
            && this.positionX + this.image.width > trophy.$positionX
            && this.canvas.height - 150 < trophy.$positionY + trophy.$image.height
            && this.canvas.height - 150 + this.image.height > trophy.$positionY) {
            return true;
        }
        return false;
    }
    move() {
        if (this.keyListener.isKeyDown(KeyListener.KEY_LEFT)
            && this.positionX !== this.leftLane) {
            this.positionX = this.leftLane;
        }
        if (this.keyListener.isKeyDown(KeyListener.KEY_UP)
            && this.positionX !== this.middleLane) {
            this.positionX = this.middleLane;
        }
        if (this.keyListener.isKeyDown(KeyListener.KEY_RIGHT)
            && this.positionX !== this.rightLane) {
            this.positionX = this.rightLane;
        }
    }
    draw(ctx) {
        ctx.drawImage(this.image, this.positionX - this.image.width / 2, this.canvas.height - 150);
    }
    static loadNewImage(source) {
        const img = new Image();
        img.src = source;
        return img;
    }
}
//# sourceMappingURL=Player.js.map