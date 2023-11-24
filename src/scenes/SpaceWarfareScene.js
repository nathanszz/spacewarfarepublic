import Phaser from 'phaser'
import FallingObject from '../ui/FallingObjects';
import Laser from '../ui/Laser';
export default class SpaceWarfareScene extends
Phaser.Scene
{
constructor(){
super('Space-Warfare-Scene')
}
init(){
    this.clouds = undefined;
    this.nav_left = false;
this.nav_right = false;
this.shoot = false;
this.player = undefined;
this.speed = 100
this.cursor = undefined
this.enemies = undefined;
this.enemySpeed = 50;
this.lasers = undefined
this.lastFired = 10
this.scoreLabel = undefined
 this.score= 0
 this.lifeLabel = undefined
 this.life = 3
 this.backsound = undefined
}
preload(){
    this.load.image('background','images/bg_space1.jpg')
    this.load.image('cloud','images/C2011.png')
    this.load.image('left-btn','images/LeftArrow.png')
    this.load.image('right-btn','images/RightArrow.png')
    this.load.image('shoot','images/button-bomb.png')
    this.load.audio('bgsound', 'sfx/bgm1.mp3')
    this.load.audio('shoot', 'sfx/shoot.wav')
    this.load.audio('gameover', 'sfx/gameover.wav')
    this.load.spritesheet('player', 'images/player.png', {

        frameWidth: 16,
        frameHeight: 16
        
        })
        this.load.spritesheet('enemy1', 'images/alien1.png', {

            frameWidth: 16,
            frameHeight: 16
            
            })
            this.load.spritesheet('enemy2', 'images/alien2.png', {

                frameWidth: 16,
                frameHeight: 16
                
                })
                 this.load.spritesheet('enemy3', 'images/alien3.png', {

        frameWidth: 16,
        frameHeight: 16
        
        })
        this.load.spritesheet('laser','images/beam.png',{
            frameWidth: 8,
            frameHeight: 8,
            })
}
create(){
    const gameWidht = this.scale.width*0.5;
    const gameHeight = this.scale.height*0.5;
    this.add.image(gameWidht,gameHeight,'background')
    this.clouds = this.physics.add.group({
        key : 'cloud',
        repeat :20,
        })
        Phaser.Actions.RandomRectangle(
        this.clouds.getChildren(),
        this.physics.world.bounds
        )
        this.createButton()
        this.player = this.createPlayer()
        this.cursor=this.input.keyboard.createCursorKeys()
        this.enemies = this.physics.add.group({
            classType: FallingObject,
            maxSize: 10,
            runChildUpdate: true 
        })
        this.time.addEvent({
            delay: Phaser.Math.Between(1000, 5000),
            callback: this.spawnEnemy,
            callbackScope: this,
            loop: true 
        })
        this.lasers = this.physics.add.group({
            classType: Laser,
            maxSize: 10,
        runChildUpdate: true
        })
        this.physics.add.overlap(
            this.enemies,
            this.lasers,
            this.hitEnemy,
            null,
            this
            )
            this.physics.add.overlap(
                this.player,
                this.enemies,
                this.decreaseLife,
                 null,
                this
                )
            
            this.scoreLabel = this.add.text(10,10,'Score', {
                fontSize: '16px',   
                color: 'black',
                backgroundColor: 'white'
                    
               }).setDepth(1)
               this.lifeLabel = this.add.text(300,10,'Life', {
                fontSize: '16px',
                color: 'black',
                backgroundColor: 'white'
             }).setDepth(1)
             
                        this.backsound = this.sound.add('bgsound') //untuk menambahkan backsound ke scene
                        var soundConfig={
                        loop: true,
                        volume: 0.5,
                        }
                        this.backsound.play(soundConfig)
               
}
        update(time){
            this.movePlayer(this.player, time)
            this.clouds.children.iterate((child) =>{
                child.setVelocityY(20)
                child.setScale(0.5)
                if (child.y > this.scale.height){
        
                    // @ts-ignore
                    child.x = Phaser.Math.Between(10,1070)
                    // @ts-ignore
                    child.y = 0;
                    
                }   
                })
                this.scoreLabel.setText('Score : ' + this.score);
                this.lifeLabel.setText('Life : '+this.life)
        }
        createButton(){
            this.input.addPointer(3)
            let shoot = this.add.image(1150,590, 'shoot')
            .setInteractive().setDepth(0.5).setAlpha(0.8).setScale(0.5)
            let nav_left = this.add.image(100,590, 'left-btn')
            .setInteractive().setDepth(0.5).setAlpha(0.8).setScale(2)
            let nav_right = this.add.image(nav_left.x +
            nav_left.displayWidth+20, 590,'right-btn')
            .setInteractive().setDepth(0.5).setAlpha(0.8).setScale(2)
            nav_left.on('pointerdown', () => {
                this.nav_left = true
                }, this)
                nav_left.on('pointerout', () => {
                this.nav_left = false
                }, this)
                nav_right.on('pointerdown', () => {
                    this.nav_right = true
                    }, this)
                    nav_right.on('pointerout', () => {
                    this.nav_right = false
                    }, this)
                    shoot.on('pointerdown', () => {
                    this.shoot = true
                    }, this)
                    shoot.on('pointerout', () => {
                    this.shoot = false
                    }, this)
                    
            }
            movePlayer(player, time) {
                if (this.cursor.left.isDown ||this.nav_left ){ this.player.setVelocityX(this.speed * -1)
                this.player.anims.play('left', true)
                this.player.setFlipX(false)
                } else if (this.cursor.right.isDown ||this.nav_right){
                this.player.setVelocityX(this.speed)
                this.player.anims.play('right', true)
                this.player.setFlipX(true)
                } else {
                this.player.setVelocityX(0)
                this.player.anims.play('turn')
                }
                if ((this.shoot) && time > this.lastFired) {
                    const laser = this.lasers.get(0, 0, 'laser')
                    if (laser) {
                    laser.fire(this.player.x, this.player.y)
                    this.lastFired = time + 150
                    this.sound.play('shoot')
                    }
                    }
                }    
                createPlayer() {
                    const player = this.physics.add.sprite(200, 450,'player').setScale(10)
                    player.setCollideWorldBounds(true)
                    this.anims.create({
                        key: 'turn',
                        frames: [{
                        key: 'player',frame: 1
                        }],
                        })
                        this.anims.create({
                        key: 'left',
                        frames: this.anims.generateFrameNumbers('player', {
                        start: 0, end: 1
                        }),
                        })
                        this.anims.create({
                        key: 'right',
                        frames: this.anims.generateFrameNumbers('player', {
                        start: 2,end: 1
                        })
                        })
                    return player
                    }    
                    spawnEnemy() {
                        const config = {
                        speed: 30,
                        rotation: 0.1
                        }
                        // @ts-ignore
                        const enemy = this.enemies.get(0,0,'enemy1','enemy2','enemy3',config)
                        const positionX = Phaser.Math.Between(10, 1070)
                        if (enemy) {
                        enemy.spawn(positionX) //method muncul nya enemy, kecepatan dan juga rotasi enemy
                        }
                        }
                        hitEnemy(laser, enemy) {
                            laser.die()
                            enemy.die()
                            this.score += 10;
                            this.sound.play('destroy')
                            }      
                            decreaseLife(player, enemy){
                                enemy.die()
                                this.life--
                                if (this.life == 2){
                                player.setTint(0xff0000)
                                }else if (this.life == 1){
                                player.setTint(0xff0000).setAlpha(0.2)
                                }else if (this.life == 0) {
                                    this.sound.stopAll()
                                    this.sound.play('gameover')
                                this.scene.start('over-scene',{score:this.score})
                                 }
                                 }  
    }

