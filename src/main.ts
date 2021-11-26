import GameLoop from './GameLoop.js';
import Player from './Player.js';
import Trophy from './Trophy.js';

console.log('Javascript is working!');

/**
 * Main class of this Game.
 */
export default class Game {
  // The canvas
  private canvas: HTMLCanvasElement;

  // private leftLane: number;

  // private middleLane: number;

  // private rightLane: number;

  // KeyListener so the user can give input
  // private keyListener: KeyListener;

  private gameloop: GameLoop;

  // The player on the canvas
  private player: Player;

  // private playerImage: HTMLImageElement;

  // private playerPositionX: number;

  // The objects on the canvas
  // TODO make multiple objects instead of one
  private trophy: Trophy;
  // private trophyImage: HTMLImageElement;

  // private trophyPositionX: number;

  // private trophyPositionY: number;

  // private trophySpeed: number;

  /**
   * Construct a new Game
   *
   * @param canvas The canvas HTML element to render on
   */
  public constructor(canvas: HTMLElement) {
    this.canvas = <HTMLCanvasElement>canvas;

    // Resize the canvas so it looks more like a Runner game
    this.canvas.width = window.innerWidth / 3;
    this.canvas.height = window.innerHeight;

    // x positions of the lanes in the canvas
    // this.leftLane = this.canvas.width / 4;
    // this.middleLane = this.canvas.width / 2;
    // this.rightLane = (this.canvas.width / 4) * 3;

    // TODO create multiple objects over time
    this.trophy = new Trophy(this.canvas);
    // this.trophy = null;
    // this.trophyImage = Game.loadNewImage('assets/img/objects/gold_trophy.png');
    // this.trophyPositionX = this.canvas.width / 2;
    // this.trophyPositionY = 60;
    // this.trophySpeed = 1;

    // Set the player at the center
    this.player = new Player(this.canvas);
    // this.playerImage = Game.loadNewImage('./assets/img/players/character_robot_walk0.png');
    // this.playerPositionX = this.canvas.width / 2;

    // Start the animation
    console.log('start animation');
    console.log(this.trophy);
    this.gameloop = new GameLoop(this);
    this.gameloop.start();
  }

  /**
   * Handles any user input that has happened since the last call
   */
  public processInput(): void {
    this.player.move();
  }

  // public processInput(): void {
  //   // Move player
  //   if (this.keyListener.isKeyDown(KeyListener.KEY_LEFT)
  //       && this.playerPositionX !== this.leftLane) {
  //     this.playerPositionX = this.leftLane;
  //   }
  //   if (this.keyListener.isKeyDown(KeyListener.KEY_UP)
  //       && this.playerPositionX !== this.middleLane) {
  //     this.playerPositionX = this.middleLane;
  //   }
  //   if (this.keyListener.isKeyDown(KeyListener.KEY_RIGHT)
  //       && this.playerPositionX !== this.rightLane) {
  //     this.playerPositionX = this.rightLane;
  //   }
  // }

  /**
   * Advances the game simulation one step. It may run AI and physics (usually
   * in that order)
   *
   * @param elapsed the time in ms that has been elapsed since the previous
   *   call
   * @returns `true` if the game should stop animation
   */
  public update(elapsed: number): boolean {
    // Move objects
    // TODO adjust for multiple objects
    this.trophy.move(elapsed);
    // this.trophyPositionY += this.trophySpeed * elapsed;

    // Collision detection of objects and player
    // Use the bounding box detection method: https://computersciencewiki.org/index.php/Bounding_boxes
    // TODO adjust for multiple objects
    if (this.player.collidesWithTrophy(this.trophy)) {
      // Create a new trophy in a random lane
      this.trophy = new Trophy(this.canvas);
      // const random = Game.randomInteger(1, 3);
      // if (random === 1) {
      //   this.trophy.positionX = this.leftLane;
      // }
      // if (random === 2) {
      //   this.trophyPositionX = this.middleLane;
      // }
      // if (random === 3) {
      //   this.trophyPositionX = this.rightLane;
      // }

      // this.trophyImage = Game.loadNewImage('assets/img/objects/gold_trophy.png');
      // this.trophyPositionY = 60;
      // this.trophySpeed = 1;
    }

    // Collision detection of objects with bottom of the canvas
    if (this.trophy.collisionWithCanvasBottom) {
      // Create a new trophy in a random lane
      this.trophy = new Trophy(this.canvas);
      // const random = Game.randomInteger(1, 3);
      // if (random === 1) {
      //   this.trophyPositionX = this.leftLane;
      // }
      // if (random === 2) {
      //   this.trophyPositionX = this.middleLane;
      // }
      // if (random === 3) {
      //   this.trophyPositionX = this.rightLane;
      // }

      // this.trophyImage = Game.loadNewImage('assets/img/objects/gold_trophy.png');
      // this.trophyPositionY = 60;
      // this.trophySpeed = 1;
    }
    return false;
  }

  /**
   * Draw the game so the player can see what happened
   */
  public render(): void {
    // Render the items on the canvas
    // Get the canvas rendering context
    const ctx = this.canvas.getContext('2d');
    // Clear the entire canvas
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.writeTextToCanvas('UP arrow = middle | LEFT arrow = left | RIGHT arrow = right', this.canvas.width / 2, 40, 14);

    // Render the player
    // Center the image in the lane with the x coordinates
    this.player.draw(ctx);
    // ctx.drawImage(
    //   this.playerImage,
    //   this.playerPositionX - this.playerImage.width / 2,
    //   this.canvas.height - 150,
    // );

    // Render the objects
    // Center the image in the lane with the x coordinates
    this.trophy.draw(ctx);
    // ctx.drawImage(
    //   this.trophyImage,
    //   this.trophyPositionX - this.trophyImage.width / 2,
    //   this.trophyPositionY,
    // );
  }

  /**
   * Writes text to the canvas
   *
   * @param text - Text to write
   * @param xCoordinate - Horizontal coordinate in pixels
   * @param yCoordinate - Vertical coordinate in pixels
   * @param fontSize - Font size in pixels
   * @param color - The color of the text
   * @param alignment - Where to align the text
   */
  public writeTextToCanvas(
    text: string,
    xCoordinate: number,
    yCoordinate: number,
    fontSize: number = 20,
    color: string = 'red',
    alignment: CanvasTextAlign = 'center',
  ): void {
    const ctx = this.canvas.getContext('2d');
    ctx.font = `${fontSize}px sans-serif`;
    ctx.fillStyle = color;
    ctx.textAlign = alignment;
    ctx.fillText(text, xCoordinate, yCoordinate);
  }
}

// Add EventListener to load the game whenever the browser is ready
window.addEventListener('load',
  () => new Game(document.getElementById('canvas')));
