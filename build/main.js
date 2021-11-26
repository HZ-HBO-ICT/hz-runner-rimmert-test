import GameLoop from './GameLoop.js';
import Player from './Player.js';
import Trophy from './Trophy.js';
console.log('Javascript is working!');
export default class Game {
    canvas;
    gameloop;
    player;
    trophy;
    constructor(canvas) {
        this.canvas = canvas;
        this.canvas.width = window.innerWidth / 3;
        this.canvas.height = window.innerHeight;
        this.trophy = new Trophy(this.canvas);
        this.player = new Player(this.canvas);
        console.log('start animation');
        console.log(this.trophy);
        this.gameloop = new GameLoop(this);
        this.gameloop.start();
    }
    processInput() {
        this.player.move();
    }
    update(elapsed) {
        this.trophy.move(elapsed);
        if (this.player.collidesWithTrophy(this.trophy)) {
            this.trophy = new Trophy(this.canvas);
        }
        if (this.trophy.collisionWithCanvasBottom) {
            this.trophy = new Trophy(this.canvas);
        }
        return false;
    }
    render() {
        const ctx = this.canvas.getContext('2d');
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.writeTextToCanvas('UP arrow = middle | LEFT arrow = left | RIGHT arrow = right', this.canvas.width / 2, 40, 14);
        this.player.draw(ctx);
        this.trophy.draw(ctx);
    }
    writeTextToCanvas(text, xCoordinate, yCoordinate, fontSize = 20, color = 'red', alignment = 'center') {
        const ctx = this.canvas.getContext('2d');
        ctx.font = `${fontSize}px sans-serif`;
        ctx.fillStyle = color;
        ctx.textAlign = alignment;
        ctx.fillText(text, xCoordinate, yCoordinate);
    }
}
window.addEventListener('load', () => new Game(document.getElementById('canvas')));
//# sourceMappingURL=main.js.map