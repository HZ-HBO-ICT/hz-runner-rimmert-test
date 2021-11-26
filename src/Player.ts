import KeyListener from './KeyListener.js';
import Trophy from './Trophy.js';

export default class Player {
  private positionX: number;

  private image: HTMLImageElement;

  private keyListener: KeyListener;

  private leftLane: number;

  private middleLane: number;

  private rightLane: number;

  private canvas: HTMLCanvasElement;

  /**
   * Constructor of the player class
   * @param {HTMLCanvasElement} canvas - image of the Player
   */
  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;

    this.image = Player.loadNewImage('./assets/img/players/character_robot_walk0.png');
    this.positionX = this.canvas.width / 2;

    this.keyListener = new KeyListener();

    this.leftLane = this.canvas.width / 4;
    this.middleLane = this.canvas.width / 2;
    this.rightLane = (this.canvas.width / 4) * 3;
  }

  /**
   * Find out if trophy collides with player
   * @param trophy - trophy element
   * @param canvas - canvas element
   * @returns {boolean} - player collided with trophy
   */
  public collidesWithTrophy(trophy: Trophy): boolean {
    if (
      this.positionX < trophy.$positionX + trophy.$image.width
      && this.positionX + this.image.width > trophy.$positionX
      && this.canvas.height - 150 < trophy.$positionY + trophy.$image.height
      && this.canvas.height - 150 + this.image.height > trophy.$positionY
    ) {
      return true;
    }
    return false;
  }

  /**
   * Move the player
   */
  public move(): void {
    if (
      this.keyListener.isKeyDown(KeyListener.KEY_LEFT)
      && this.positionX !== this.leftLane
    ) {
      this.positionX = this.leftLane;
    }
    if (
      this.keyListener.isKeyDown(KeyListener.KEY_UP)
      && this.positionX !== this.middleLane
    ) {
      this.positionX = this.middleLane;
    }
    if (
      this.keyListener.isKeyDown(KeyListener.KEY_RIGHT)
      && this.positionX !== this.rightLane
    ) {
      this.positionX = this.rightLane;
    }
  }

  /**
  * Draw the player on the canvas
  * @param ctx - canvas rendering context
  */
  public draw(ctx: CanvasRenderingContext2D): void {
    ctx.drawImage(this.image, this.positionX - this.image.width / 2, this.canvas.height - 150);
  }

  /**
   * Loads an image in such a way that the screen doesn't constantly flicker
   *
   *
   * NOTE: this is a 'static' method. This means that this method must be called like
   * `Game.loadNewImage()` instead of `this.loadNewImage()`.
   *
   * @param source The address or URL of the a media resource that is to be loaded
   * @returns an HTMLImageElement with the source as its src attribute
   */
  private static loadNewImage(source: string): HTMLImageElement {
    const img = new Image();
    img.src = source;
    return img;
  }
}
