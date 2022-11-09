export default class mainScene extends Phaser.Scene {
  constructor() {
    super("mainScene");

    this.grond;
    this.platforms;
    this.player;
    this.cursor;
  }

  preload() {
    this.load.image("sky", "../assets/sky.png");
    this.load.image("ground", "../assets/ground.png");
    this.load.image("platform", "../assets/platform.png");
    this.load.spritesheet("player", "../assets/player/player.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
  }

  create() {
    this.add.image(400, 300, "sky");
    this.grond = this.physics.add.staticGroup();
    this.grond.create(400, 600, "ground");

    this.platforms = this.physics.add.staticGroup();
    this.platforms.create(200, 350, "platform");
    this.platforms.create(50, 500, "platform");
    this.platforms.create(550, 350, "platform");
    this.platforms.create(600, 500, "platform");

    this.player = this.physics.add.sprite(100, 100, "player");
    this.player.setCollideWorldBounds(true);
    this.player.setBounce(0.2);

    this.cursor = this.input.keyboard.createCursorKeys();

    this.physics.add.collider(this.player, this.platforms);
    this.physics.add.collider(this.player, this.grond);
  }

  update() {
    if (this.cursor.left.isDown) {
      this.player.setVelocityX(-160);
      this.player.anims.play("left", true);
    } else if (this.cursor.right.isDown) {
      this.player.setVelocityX(160);
      this.player.anims.play("right", true);
    } else {
      this.player.setVelocityX(0);
      this.player.anims.play("turn");
    }
    if (this.cursor.up.isDown && this.player.body.touching.down) {
      this.player.setVelocityY(-330);
    }
  }
}
