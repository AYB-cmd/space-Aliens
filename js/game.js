/* global Phaser */
import SplashScene from './splashScene.js';
import TitleScene from './titleScene.js';
import MenuScene from './menuScene.js';
import GameScene from './gameScene.js';

const splashScene = new SplashScene();
const titleScene = new TitleScene();
const menuScene = new MenuScene();
const gameScene = new GameScene();

const config = {
  type: Phaser.AUTO,
  width: 1920,
  height: 1080,
  physics: {
    default: 'arcade',
    arcade: {
      debug: true,
    }
  },
  backgrounColor: 0xffffff,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  }
}

const game = new Phaser.Game(config);

game.scene.add('SplashScene', splashScene);
game.scene.add('titleScene', titleScene);
game.scene.add('menuScene', menuScene);
game.scene.add('gameScene', gameScene);

game.scene.start('SplashScene'); 