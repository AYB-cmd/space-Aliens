/* global Phaser */

class GameScene extends Phaser.Scene {

  //create an alien 
  createAlien() {
    const alienXLocation = Math.floor(Math.random() * 1920) + 1;
    let alienXVelocity = Math.floor(Math.random() * 50) + 1;
    alienXVelocity *= Math.round(Math.random()) ? 1 : -1
    const anAlien = this.physics.add.sprite(alienXLocation, -100, 'alien');
    anAlien.body.velocity.y = 200;
    anAlien.body.velocity.x = alienXVelocity;
    this.alienGroup.Add(anAlien)
  }
  constructor() {
    super({ key: 'gameScene' });
    this.background = null;
    this.ship = null;
    this.fireMissile = false;
  }

  init(data) {
    this.cameras.main.setBackgroundColor('#ffffff');
  }

  preload() {
    console.log('game Scene');
    this.load.image('startBackground', './assets/starBackground.png');
    this.load.image('ship', './assets/spaceShip.png');
    this.load.image('missile', './assets/missile.png');
    this.load.image('alien', './assets/alien.png');

    this.load.audio('laser', './assets/laser1.wav');
    this.load.audio('explosion', './assets/barrelExploding.wav');
  }

  create(data) {
    this.background = this.add.sprite(0, 0, 'startBackground').setScale(2.0);
    this.background.setOrigin(0, 0);

    this.ship = this.physics.add.sprite(1920 / 2, 1080 - 100, 'ship');
    this.missileGroup = this.physics.add.group();
    this.alienGroup = this.physics.add.group();
    this.createAlien();

    this.physics.add.collider(this.missileGroup, this.alienGroup, function(missileCollide, alienCollide) {
      alienCollide.destroy();
      missileCollide.destroy();
      // this.createAlien();
      // this.createAlien();
      // this.sound.play('explosion');
    }.bind(this));
  }

  update(time, delta) {
    const keyLeftObj = this.input.keyboard.addKey('LEFT');
    const keyRightObj = this.input.keyboard.addKey('RIGHT');
    const keySpaceObj = this.input.keyboard.addKey('SPACE');

    if (keyLeftObj.isDown === true) {
      this.ship.x -= 15;
      if (this.ship.x < 0) {
        this.ship.x = 0;
      }
    }
    if (keyRightObj.isDown === true) {
      this.ship.x += 15;
      if (this.ship.x > 1920) {
        this.ship.x = 1920;
      }
    }
    if (keySpaceObj.isDown === true) {
      if (this.fireMissile === false) {
        this.fireMissile = true;
        const anewMissile = this.physics.add.sprite(this.ship.x, this.ship.y, 'missile');
        this.missileGroup.add(anewMissile);
        this.sound.play('laser');
      }
    }
    if (keySpaceObj.isUp === true) {
      this.fireMissile = false;
    }
    this.missileGroup.children.each(function(item) {
      item.y = item.y - 15;
      if (item.y < 0) {
        item.destroy();
      }
    })
  }
}
export default GameScene