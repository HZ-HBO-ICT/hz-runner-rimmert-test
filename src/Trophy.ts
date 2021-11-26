export default class Trophy {
  private image: HTMLImageElement;

  private positionY: number;

  private positionX: number;

  private speed: number;

  private leftLane: number;

  private middleLane: number;

  private rightLane: number;

  private canvas: HTMLCanvasElement;

  /**
   * Constructing a new instance of trophy
   *
   * @param canvas - canvas
   */
  public constructor(canvas: HTMLCanvasElement) {
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

  /**
   * Getter $image
   *
   * @returns the image of this instance
   */
  public get $image(): HTMLImageElement {
    return this.image;
  }

  /**
   * Getter $positionY
   *
   * @returns - the position of this object
   */
  public get $positionY(): number {
    return this.positionY;
  }

  /**
   * Getter $positionX
   * @returns {number}
   */
  public get $positionX(): number {
    return this.positionX;
  }

  /**
   * Getter $speed
   * @returns {number}
   */
  public get $speed(): number {
    return this.speed;
  }

  /**
   * Moves this object
   *
   * @param elapsed the time elapsed in ms since the previous update
   */
  public move(elapsed: number): void {
    this.positionY += this.speed * elapsed;
  }

  /**
   * Check if trophy collided with the bottom of the canvas
   *
   * @returns true if the object collides with the bottom of the canvas
   */
  public collisionWithCanvasBottom(): boolean {
    if (this.positionY + this.image.height > this.canvas.height) {
      return true;
    }
    return false;
  }

  /**
   * Draw the player on the canvas
   *
   * @param ctx - canvas rendering context
   */
  public draw(ctx: CanvasRenderingContext2D): void {
    ctx.drawImage(
      this.image,
      this.positionX - this.image.width / 2,
      this.positionY,
    );
  }

  /**
   * Generates a random integer number between min and max
   *
   * NOTE: this is a 'static' method. This means that this method must be called like
   * `Game.randomInteger()` instead of `this.randomInteger()`.
   *
   * @param min - minimal time
   * @param max - maximal time
   * @returns a random integer number between min and max
   */
  public static randomInteger(min: number, max: number): number {
    return Math.round(Math.random() * (max - min) + min);
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
