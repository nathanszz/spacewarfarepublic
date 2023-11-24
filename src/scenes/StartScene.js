import Phaser from 'phaser'
export default class GameOverScene extends Phaser.Scene {
constructor() {
super('start-scene')
}
init(data) {
this.StartButton = undefined
}
preload() {
this.load.image('background', 'images/bg_space1.jpg')
this.load.image('start-button', 'images/start.png')
}
create() {
    const gameWidht = this.scale.width*0.5;
    const gameHeight = this.scale.height*0.5;
    this.add.image(gameWidht,gameHeight,"background")
this.StartButton = this.add.image(gameWidht,gameHeight, 'start-button')
.setInteractive().setScale(5)
this.StartButton.once('pointerup', () => {
    this.scene.start('Space-Warfare-Scene')
    
    }, this)
}
}