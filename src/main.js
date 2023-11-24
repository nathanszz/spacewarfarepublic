import Phaser from 'phaser'

import StartScene from './scenes/StartScene'
import SpaceWarfareScene from './scenes/SpaceWarfareScene'
import GameOverScene from './scenes/GameOverScene';

const config = {
	type: Phaser.AUTO,
	width: 1280,
	height: 720,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 200 },
			
		}
	},
	scene: [StartScene,SpaceWarfareScene,GameOverScene],
	scale: {
		mode: Phaser.Scale.FIT,
		autoCenter: Phaser.Scale.CENTER_BOTH
		}
}

export default new Phaser.Game(config)
