import Player from "../components/player.js";
import SceneWelcomeMenu from "./0_welcome_mouse.js";
import Physics_v4_last from "./7_physics_v4_last.js";
import SceneGameOver from "./G_gameover.js";

export default class Physics_v4 extends Phaser.Scene {

    background;       // oggetto relativo all'elemento "sfondo"
    player;           // oggetto relativo all'elemento "giocatore"
    floorHeight;      // Altezza del terreno (asse y) rispetto al riquadro di gioco

     


    constructor() {
        // Il costruttore della classe base Phaser.Scene prende come argomento il nome della scena
        super("physics_v4");
    }

    init() {
        console.log("physics_v4 - Executing init()");
        // Definiamo l'altezza del terreno pari all'altezza del riquadro
        // di gioco, per posizionare il giocatore sul fondo della schermata.
        this.floorHeight = this.game.config.height - 90;
        this.worldWidth = 10240;
    }

    preload() {
        console.log("physics_v4 - Executing preload()");
        // Carichiamo gli asset grafici
        this.load.image("platform", "assets/images/environment_elements/guardrail.png");
        this.load.image("platform_small", "assets/images/environment_elements/asset_9.png");
        this.load.image("star", "assets/images/environment_elements/star.png");
        // this.load.image("background_2", "assets/images/background/background_2.png");
        this.load.image("level_1", "assets/images/background/parallax_layers_liv1/liv_1.png");
        this.load.image("level_1_2", "assets/images/background/parallax_layers_liv1/liv_1_2.png");
        this.load.image("level_1_3", "assets/images/background/parallax_layers_liv1/liv_1_3.png");
        this.load.image("level_1_4", "assets/images/background/parallax_layers_liv1/liv_1_4.png");
        this.load.image("level_1_5", "assets/images/background/parallax_layers_liv1/liv_1_5.png");
        this.load.image("hidden_obj", "assets/UI/hidden_object.png");
        this.load.image("vasca", "assets/images/environment_elements/balla_fieno.png");
        this.load.image("resume_button", "assets/UI/play_button_2.png");
        this.load.image("pause_panel", "assets/UI/menu_block.png");
        this.load.image("pause_button", "assets/UI/pause_button.png");
        this.load.image("next_button", "assets/UI/next_button.png");
        this.load.image("camera", "assets/UI/camera.png");
        this.load.image("folder", "assets/UI/folder.png");
    }

    create() {
        // Qui le istruzioni su cosa creare e dove nel mondo di gioco
        console.log("physics_v4 - Executing create()");
       
        //singolo
        // // Sfondo
        // this.background = this.add.tileSprite(0, 0, 0, 0, "background_2");
        // this.background.setOrigin(0, 0);
        // this.background.setScrollFactor(0.5);

        //il flag lo stato del gioco e consentire di mettere in pausa il gioco in modo semplice e controllato.
        this.paused = false;

        // Parallax Scrolling
        this.bg_5 = this.add.tileSprite(0, 0, 0, 0, "level_1_5");
        this.bg_5.setOrigin(0,0);
        this.bg_5.setScrollFactor(0);

        this.bg_4 = this.add.tileSprite(0, 0, 0, 0, "level_1_4");
        this.bg_4.setOrigin(0,0);
        this.bg_4.setScrollFactor(0);

        this.bg_3 = this.add.tileSprite(0, 0, 0, 0, "level_1_3");
        this.bg_3.setOrigin(0,0);
        this.bg_3.setScrollFactor(0);

        this.bg_2 = this.add.tileSprite(0, 0, 0, 0, "level_1_2");
        this.bg_2.setOrigin(0,0);
        this.bg_2.setScrollFactor(0);

        this.bg_1 = this.add.tileSprite(0, 0, 0, 0, "level_1");
        this.bg_1.setOrigin(0,0);
        this.bg_1.setScrollFactor(0);

        // this.bg_1.tilePositionX = this.myCam.scrollX * .3;
        // this.platform1 = this.add.image(6200, this.floorHeight - 200, "platform");
        // this.platform2 = this.add.image(8000, this.floorHeight - 400, "platform_small");

        // this.background = this.add.tileSprite(0, 0, 0, 0, "level_1"); //creiamo il primo livello (quello più in sfondo) del nostro parallax scrolling
        // this.background.setScrollFactor(0,0);
        // this.background.setOrigin(0, 0);

        // this.background2 = this.add.tileSprite(0, 0, 0, 0, "level_1_2");
        // this.background2.setScrollFactor(0,0);
        // this.background2.setOrigin(0, 0);

        // this.background3 = this.add.tileSprite(0, 0, 0, 0, "level_1_3");
        // this.background3.setScrollFactor(0,0);
        // this.background3.setOrigin(0, 0);

        // this.background4 = this.add.tileSprite(0, 0, 0, 0, "level_1_4");
        // this.background4.setScrollFactor(0,0);
        // this.background4.setOrigin(0, 0);

        // this.background5 = this.add.tileSprite(0, 0, 0, 0, "level_1_5");
        // this.background5.setScrollFactor(0,0);
        // this.background5.setOrigin(0, 0);

        // this.background2.tilePositionX = this.cameras.main.scrollX * 0.05;
        // this.background3.tilePositionX = this.cameras.main.scrollX * 0.1; 
        // this.background4.tilePositionX = this.cameras.main.scrollX * 0.25;
        // this.background5.tilePositionX = this.cameras.main.scrollX * 0.3;

        // Crea un piano sul quale fermare gli oggetti soggetti alla fisica (gravità)
        this.floor = this.add.rectangle(0, this.game.config.height,
            this.worldWidth, this.game.config.height - this.floorHeight,
            0xFFFFFF, 0);
        this.floor.setOrigin(0, 1);
        // Aggiungi il piano alla fisica (e rendiamolo statico mettendo a 'true' il secondo parametro)
        this.physics.add.existing(this.floor, true);

        // Player
        const thePlayer = new Player(this, 0, this.floorHeight, 10000);
        // Aggiungi il player alla fisica
        this.player = this.physics.add.existing(thePlayer);
        this.physics.add.collider(this.player, this.floor);
        this.player.onWorldBounds = true;
        

        this.myCam = this.cameras.main;
        this.myCam.setBounds(0, 0, 10000, 0);

        this.cameras.main.startFollow(this.player);
        this.cameras.main.setFollowOffset(0, this.game.config.height / 3);

        //variabile globale stelle raccolte
        this.collectedStars=0;
        // Imposta la camera per seguire i movimenti del giocatore lungo l'asse x
        // this.cameras.main.startFollow(this.player);
        // this.cameras.main.setFollowOffset(0, this.game.config.height / 2); // Abbassiamo la telecamera


        // Inserisci delle piattaforme
        this.createStaticPlatforms();
        // this.onCollision();
        this.createStars();
        this.createMovingPlatforms();
        this.createUI();
        //Inserisco Vasche
        this.insertVasche();
        // this.starsCollision();
        this.onCollision();
        this.nextLevel();
        // this.nextLevelButton();
        // this.onCollision()
        

        // this.createStarsAnimation();
        // this.popUp();
        // this.scroll();

        // this.createObjectPanel();

    }

    //DA UTILIZZARE NEL PAUSE PANEL
    // createResumeButton() {
    //     this.resumeButton = this.add.sprite(this.game.config.width/2, this.game.config.height/2, "resume_button");
    //     this.resumeButton.setScale(0.1);
    //     this.resumeButton.setInteractive();
    //     this.resumeButton.on("pointerdown", () => {
    //         this.scene.resume(this.sceneName);
    //         this.pausePanel.setVisible(false);
    //     });
    // }

    createUI(){

        // this.camera = this.add.image(this.game.config.width/2 - 100, 50, 'camera');
        // this.camera.setScrollFactor(0, 0);
        // this.camera.setScale(0.2);
        // this.folder = this.add.image(this.game.config.width/2 +100, 50, 'folder');
        // this.folder.setScrollFactor(0, 0);
        // this.folder.setScale(0.2);

        this.pauseButton = this.add.image(this.game.config.width - 100, 100, "pause_button");
        this.pauseButton.setOrigin(0.5, 0.5);
        this.pauseButton.setInteractive();
        this.pauseButton.setDepth(1);

        // Set the pause button's scroll factor to 0, so it stays in the same place during the scene's scrolling
        this.pauseButton.setScrollFactor(0, 0);
    
        // Add an event listener for when the pause button is clicked
        this.paused = false;
        this.pauseButton.on("pointerdown", () => {
            console.log("Pause button clicked");
            // this.scene.sleep();
            this.paused = true;
            this.pausePanel.setVisible(true);
            this.pausePanel.setScrollFactor(0, 0);
            this.pauseButton.setVisible(false);
            this.resumeButton.setVisible(true);            
        });

        // Create pause panel
        this.pausePanel = this.add.image(this.game.config.width/2, this.game.config.height/2, "pause_panel");
        this.pausePanel.setOrigin(0.5, 0.5);
        this.pausePanel.setVisible(false);

        // Add resume button to pause panel
        this.resumeButton = this.add.image(this.pausePanel.x/2, this.pausePanel.y/4, "resume_button");
        this.resumeButton.setOrigin(0.5, 0.5);
        this.resumeButton.setVisible(false);
        this.resumeButton.setScale(0.2);
        this.resumeButton.setScrollFactor(0, 0);
        this.resumeButton.setDepth(0.9);
        this.resumeButton.setInteractive();
        this.resumeButton.on("pointerdown", () => {
        // Resume the scene
        this.paused = false;
        // this.scene.wake();
        // Hide pause panel
        this.pausePanel.setVisible(false);
        this.pauseButton.setVisible(true);
        this.resumeButton.setVisible(false);
        });

        const styleConfig = { color: '000000', fontSize: 50};
        const startMessage = this.game.gameState.playTime;
        const textPosX = 0;
        const textPosY = 0;
        this.countdown = this.add.text(textPosX, textPosY, startMessage, styleConfig);
        this.countdown.setOrigin(0,0);
        this.countdown.setScrollFactor(0,0);

        this.timer = this.time.addEvent({ delay: 1000, callback: () => {
            if (!this.paused) {
                this.updateTimer();
            }
        }, callbackScope: this, loop: true });
    };
    
    


    createStaticPlatforms(){
        this.platforms = this.physics.add.staticGroup();
        this.platform1 = this.platforms.create(2000, this.floorHeight - 55, 'platform');
        this.platform2 = this.platforms.create(1500, this.floorHeight - 250, 'platform_small');
        this.platform3 = this.platforms.create(3000, this.floorHeight - 250, 'platform_small');
        this.platform4 = this.platforms.create(3500, this.floorHeight - 250, 'platform_small');
        this.platform5 = this.platforms.create(4500, this.floorHeight - 250, 'platform_small');
        
        
        //     this.platforms = this.physics.add.staticGroup({
        //     key: 'platform',
        //     repeat: 1,
        //     setXY: {
        //         x: 2000,
        //         y: this.floorHeight - 55,
        //     },
        // });

        // this.platforms.scaleXY(0.2);
        // this.platforms_small = this.physics.add.staticGroup({
        //     key: 'platform_small',
        //     repeat: 4,
        //     setXY: {
        //         x: 1500,
        //         y: this.floorHeight - 250,
        //         stepX: 500,
        //     }
        // });
        this.physics.add.collider(this.platforms, this.player, ()=> {
        this.player.isJumping = false; 
        });
    };

    // is touching arcade body collision


//        createMovingPlatforms() {
//         this.movingPlatforms.create(this.x
// , this.y, );
//         this.movingPlatforms.children.iterate( function (platform) {
//                 platform.setImmovable(true);
//                 platform.body.allowGravity = false;
//                 platform.body.setVelocityX(velocity);
//             });

        //poi nell'update:
    

          
        // createMovingPlatforms() {
        //     // Aggiungi le piattaforme come un gruppo di oggetti dinamici
        //     this.movingPlatforms = this.physics.add.group();
           
        //     //creo piattaforme
        //     for (let i = 0; i < 5; i++) {
        //         let platform = this.movingPlatforms.create(5500 + i * 500, this.floorHeight - 250, 'platform_small');
        //         platform.setImmovable(true);
        //         platform.body.allowGravity = false;
        //         platform.body.velocity.x = 100;
        //         platform.body.bounce.x = 1;
        //         platform.body.checkCollision.up = true;
        //         platform.body.checkCollision.down = true;
        //     }
    
        //     // Aggiungi la collisione con il player
        //     this.physics.add.collider(this.player, this.movingPlatforms, (player, platform) => {
        //         player.isJumping = false;
        //     });
        // }
        
        createMovingPlatforms() {
            // Aggiungi le piattaforme come un gruppo di oggetti dinamici
            this.movingPlatforms = this.physics.add.group();
           
            //creo piattaforme
            this.mobplat1 = this.movingPlatforms.create(5500, 300, "platform_small");
            this.mobplat2 = this.movingPlatforms.create(6500, 400, "platform_small");
            this.mobplat3 = this.movingPlatforms.create(7500, 300, "platform_small");
            this.mobplat4 = this.movingPlatforms.create(8500, 400, "platform_small");
    
            this.movingPlatforms.children.iterate( function (platform) {
                    platform.setImmovable(true);
                    platform.body.allowGravity = false;
            });
            
            //movimenti
    
            this.mobplat1 = this.tweens.add({
                targets: this.mobplat1,
                x: 5000,
                duration: 2000,
                ease: 'Sine.easeInOut',
                yoyo: true,
                loop: -1,
            })
    
            this.mobplat2 = this.tweens.add({
                targets: this.mobplat2,
                x: 6000,
                duration: 2000,
                ease: 'Sine.easeInOut',
                yoyo: true,
                loop: -1,
            })

            this.mobplat3 = this.tweens.add({
                targets: this.mobplat3,
                x: 7000,
                duration: 2000,
                ease: 'Sine.easeInOut',
                yoyo: true,
                loop: -1,
            })
            this.mobplat4 = this.tweens.add({
                targets: this.mobplat4,
                x: 8000,
                duration: 2000,
                ease: 'Sine.easeInOut',
                yoyo: true,
                loop: -1,
                delay: 1000,
            })
            
            this.physics.add.collider(this.player, this.movingPlatforms, (player, platform) => {
                player.isJumping = false;
            });


        }    
    
     
    // createPopup(){
    //     this.popup = this.add.image(3500, 350, 'hidden_obj');
    //     this.popup.setOrigin(0.5, 0.5);
    //     this.game.time.addEvent(Phaser.time, this.removePopup, this);
    // }

    // removePopup(){
    //     popup.destroy();
    // }
     
    createStars() {
        this.stars = [];
        // this.collectedStars = 0;
        this.cameraAlpha = 0;
        this.folderAlpha = 0;
        for (let i = 0; i < 2; i++) {
        let star = this.physics.add.sprite(3500 + 3500*i, this.floorHeight, "star")
        star.setOrigin(0, 1);
        star.setScale(0.05,0.05);
        star.setAlpha(0);
        this.stars.push(star);
        this.createFlashingAnimation(star);
        this.physics.add.overlap(this.player, star, this.onCollision.bind(this,i), null, this);
        }
        this.starsGroup = this.physics.add.group(this.stars);
        this.starsGroup.children.iterate( (star, index) => {
        star.body.immovable = true;
        star.body.allowGravity = false;
        });
        }
        
        createFlashingAnimation(star) {
            this.tweens.add({
                targets: star,
                alpha: { from: 1, to: 0 },
                ease: 'linear',
                duration: 1000,
                repeat: -1,
                yoyo: true,
                delay: 3000
            });
        };
        
        
        
      
        // if (!this.stars[index].isCollected) {
        //     this.folder_line_image.setVisible(false);
        //     this.folder_image.setVisible(true);
        // }

        // this.folder_line_image = this.add.image(this.game.config.worldWidth/2 - 50, this.game.config.Height - 50, "folder_line");
        // this.folder_line_image.setOrigin(0, 0);
        // this.folder_line_image.setScrollFactor(0, 0);

        // this.folder_image = this.add.image(this.game.config.worldWidth/2 - 50, 0, "folder");
        // this.folder_image.setOrigin(0, 0);
        // this.folder_image.setScrollFactor(0, 0);

        // // this.camera_line_image = this.add.image(this.game.config.worldWidth/2 + 50, 50, "camera_line");
        // // this.camera_line_image.setOrigin(0.5, 0.5);
        // // this.camera_line_image.setScrollFactor(0, 0);

        // this.camera_image = this.add.image(this.game.config.worldWidth/2 + 50 , 50, "camera");
        // this.camera_image.setOrigin(0.5, 0.5);
        // this.camera_image.setInteractive();
        // this.camera_image.setScrollFactor(0, 0);
        // this.camera_image.setDepth(1);
        // OncollisionUI(index) {
        //     this.collectedStars[index]++;
        //     if (this.collectedStars[index] === 1) {
        //         this.camera.setAlpha(1);
        //     } else if (this.collectedStars[index] === 2) {
        //         this.folder.setAlpha(1);
        //     }
        // }
        onCollision(index, player, star) {
            this.camera = this.add.image(this.game.config.width/2 - 100, 100, 'camera');
            this.camera.setScrollFactor(0, 0);
            this.camera.setScale(0.2);
            this.camera.setAlpha(this.cameraAlpha);
            this.folder = this.add.image(this.game.config.width/2 + 100, 100, 'folder');
            this.folder.setScrollFactor(0, 0);
            this.folder.setScale(0.2);
            this.folder.setAlpha(this.folderAlpha);
            var popupImages = [this.add.sprite(3500, 400, 'hidden_obj'), this.add.sprite(7000, 400, 'hidden_obj')];
            this.popupImage = popupImages[index];
            var self = this;
            popupImages.forEach(function(popupImage) { 
                popupImage.setVisible(false);
            });
            this.physics.add.overlap(this.player, star, function() {
                self.popupImage.setVisible(true);
                star.setVisible(false);
                this.collectedStars++;
                if (self.collectedStars[index] === 0) {
                    self.collectedStars[index] = 1;
                    self.cameraAlpha = 0.5;
                    self.camera.setAlpha(self.cameraAlpha);
                } else if (self.collectedStars[index] === 1) {
                    self.collectedStars[index] = 2;
                    self.folderAlpha = 0.5;
                    self.folder.setAlpha(self.folderAlpha);
                }
                self.time.addEvent({
                    delay: 1700,
                    callback: 
                    self.popupImage.setVisible.bind(self.popupImage, false),
                    loop: false
                });
            }, null, this);
        }
        

        // updateUIObj(){
        //     if (this.game.gameState.score === 2){
        //         this.camera.setVisible(true);
        //         this.folder.setVisible(true);
        //     }
        //     if (this.game.gameState.score === 1){
        //         this.camera.setVisible(true);
        //         this.folder.setVisible(false);
        //     }
        //     if (this.game.gameState.score === 0){
        //         this.camera.setVisible(false);
        //         this.folder.setVisible(false);
        //     }
        // }

        
    // onCollision(index, player, star) {
    //     this.camera = this.add.sprite(this.game.config.width/2 - 100, 50, 'camera');
    //     this.camera.setScrollFactor(0, 0);
    //     this.camera.setScale(0.5);
    //     this.folder = this.add.sprite(this.game.config.width/2 +100, 50, 'folder');
    //     this.folder.setScrollFactor(0, 0);
    //     this.folder.setScale(0.4);
    //     var popupImages = [this.add.sprite(3500, 400, 'hidden_obj'), this.add.sprite(7000, 400, 'hidden_obj')];

    //     this.popupImage = popupImages[index];
    //     var self = this;
    //     var collectedStars = 0;
    //     var totalStars = 2;
    //     popupImages.forEach(function(popupImage) { 
    //         popupImage.setVisible(false);
    //     });
    //     this.physics.add.overlap(this.player, star, function() {
    //         self.popupImage.setVisible(true);
    //         star.setVisible(false);
    //         collectedStars++;
    //         self.time.addEvent({
    //             delay: 1700,
    //             callback: 
    //             self.popupImage.setVisible.bind(this.popupImage, false),
    //             loop: false
    //         });
    //     }, null, this);
    //     this.camera.setTint(0xff0000);
    //     this.folder.setTint(0xff0000);
    // }

    // checkNumStars(player, collectedStars, totalStars) {
    //     if(this.player.body.x >=  this.worldWidth - this.player.width && ( collectedStars == totalStars)) {
    //        this.scene.start("scene_welcome");
    //     }
    // }

    // handleStarOverlap(player, star) {
    //     const index = this.stars.indexOf(star);
    //     this.starImages[index].setVisible(true);
    //     star.setVisible(false);
    //     collectedStars++;
    //     this.time.addEvent({
    //         delay: 1700,
    //         callback: this.starImages[index].setVisible.bind(this.starImages[index], false),
    //         loop: false
    //     });
    // }
    
    
    
    
    //   createStars() {
    //     this.stars = [];
    //     for (let i = 0; i < 2; i++) {
    //         this.star = this.physics.add.sprite(3500 + 3500*i, this.floorHeight, "star")
    //         this.star.setOrigin(0, 1);
    //         this.star.setScale(0.025,0.025);
    //         this.star.setAlpha(0);
    //         this.stars.push(this.star)
    //     }
    //     // this.stars = this.physics.add.sprite(3500, this.floorHeight, "star");
    //     // this.stars.setOrigin(0, 1);
    //     // this.stars.setScale(0.025,0.025);
    //     // this.stars.setAlpha(0);

    //     // //create an istance of star object
    //     // var objStar = this.add;
    //     // var newStar = objStar.existing(this.stars)
    //     // this.newStar.y = this.floorHeight;

    //     this.starsGroup = this.physics.add.group(this.stars);
    //     this.starsGroup.children.iterate(function (star) {
    //         star.body.immovable;
    //         star.body.allowGravity = false;
    //         star.Oncollision();
    //       });
          
    //     // this.starsGroup.setImmovable;
    //     // this.starsGroup.body.allowGravity=false;
    //     // this.physics.add.existing (this.stars);
    //     };
    // Oncollision() {
    //     var popupImage = this.add.sprite(3500, 400, 'hidden_obj');
    //     popupImage.setVisible(false);
        
    //     // create the overlap event
    //     this.physics.add.overlap(this.player, this.star, function() {
    //         // display the image
    //         popupImage.setVisible(true);
    //         this.starsGroup.destroy();

    //         // set a timer to remove the image after 2 seconds
    //         this.time.addEvent({
    //             delay: 1700,
    //             callback: function() {
    //                 popupImage.setVisible(false);
    //             },
    //             loop: false
    //         });
    //     }, null, this);
    // };    
    //     //this.physics.add.overlap(this.player, this.stars, null, this);

    //     // this.physics.add.collider(this.player, this.stars, this.destroyStars, this);
    //     // this.physics.add.collider(this.player, this.stars, this.createPopup, null, this);


    // createStarsAnimation(){
    //         let spritestar = this.add.image(3500, this.floorHeight, 'star').setAlpha(0).setScale(0.025).setOrigin(0, 1);
            
    //         this.tweens.add({
    //           targets: spritestar, 
    //           duration: 1000, 
    //           alpha: 1, 
    //           repeat: -1, 
    //           yoyo:100,
    //           delay: 1000
    //         });
            
    // }
    

    // createObjectPanel(){
    //     if(this.destroyStars.){
    //         this.object_panel = this.add.image, this.game.config /2, "hidden_obj";
    //         this.object_panel.setOrigin(0.5,0);
    //         this.object_panel.SetVisible(true);
    //     };
    // };



    update() {
        // Azioni che vengono eseguite a ogni frame del gioco
        this.player.manageMovements();
        // this.animateBackground();
        this.scroll();
        this.checkTimer();
        // this.checkNumStars();
        // this.updateUIObj();
        // this.movingPlatforms.velocity(-300) = - this.movingPlatforms.velocity(300);
        // this.movingPlatforms.children.iterate((platform, platform_small) => {
        //      platform.body.setVelocityX(this.movingPlatforms.velocity);
        // });
        //this.randomPlatformsMovementChange();
    }

   
    scroll() {
    this.bg_5.tilePositionX = this.myCam.scrollX * .05;
    this.bg_4.tilePositionX = this.myCam.scrollX * .1;
    this.bg_3.tilePositionX = this.myCam.scrollX * .3;
    this.bg_2.tilePositionX = this.myCam.scrollX * .5;
    this.bg_1.tilePositionX = this.myCam.scrollX;

    this.bg_5.tilePositionY = this.myCam.scrollY * .05;
    this.bg_4.tilePositionY = this.myCam.scrollY * .1;
    this.bg_3.tilePositionY = this.myCam.scrollY * .3;
    this.bg_2.tilePositionY = this.myCam.scrollY * .5;
    this.bg_1.tilePositionY = this.myCam.scrollY;



    }
    // animateBackground() {
    //     this.background.tilePositionX = this.cameras.main.scrollX * 0.5;
    //     this.cameras.main.followOffset.y = this.player.body.y + this.player.height/2 - this.game.config.height / 2;
    //     this.cameras.main.setBounds(0, 0, 10000, 0);
    // }

    // randomPlatformsMovementChange() {
    //     this.movingPlatforms.children.iterate( function (platform) {
    //         // Genera un cambio di velocità casuale (destra o sinistra) con una probabilità
    //         // 1 su 100 (ricordiamo che la update() viene invocata diverse volte al secondo).
    //         // Cosa accadrebbe se variassiamo velocità ad ogni frame, quindi N volte al secondo?
    //         if (Phaser.Math.Between(0, 100) == 50) {
    //             const updatedSpeed = Phaser.Math.Between(-100, 100);
    //             platform.body.setVelocityX(updatedSpeed);
    //         }
    //     });
    // }


    insertVasche(){
        // vasche
        console.log("insertVasche");
        this.vasche = [];
        for (let i = 0; i < 5; i++) {
            const vasca = this.physics.add.image(5000 + 1500*i, this.floorHeight,  "vasca");
            vasca.setOrigin(0, 1);
            vasca.setScale(0.7);
            this.vasche.push(vasca);
        }
        this.vascaGroup = this.physics.add.group(this.vasche);
        this.vascaGroup.children.iterate( function (vasca) {
            vasca.body.immovable = true;
            vasca.body.allowGravity = false;

        });
        this.physics.add.collider(this.floor, this.vascaGroup);  
        this.physics.add.collider(this.player, this.vascaGroup, () => {
            if (!this.player.invincible) {
                if(this.game.gameState.playTime>0){
                    this.game.gameState.playTime -= 5;
                    this.countdown.setText(this.game.gameState.playTime);
                    this.player.invincible = true;
                    this.time.addEvent({
                        delay: 2000,
                        callback: () => {
                            this.player.invincible = false;
                        },
                        loop: false
                    });
                }
            }
        });
        
            // function (){
            // setTimeout(()=>{
            //     if (this.game.gameState.playTime > 5) {
            //     this.game.gameState.playTime -= 5;
            //     this.countdown.setText("climate collapse: " +  this.game.gameState.playTime);
            //     }
            //   },1);
            // });
    
        // this.player.onCollision = onCollision();
        // this.vascaGroup.children.iterate(function (vasca) {
        //     vasca.body.collider = onCollision();
        // });
        

    //     this.physics.add.overlap(this.player, this.vascaGroup, this.wasteTime, null, this)
    //     {
    //         wasteTime.disableBody(true, true);
    //     }
    // }
    
    // wasteTime(){
    }

    // onCollision(player, vascaGroup)
    // {

    //         if(this.game.gameState.playTime > 10) 
    //         {
    //             this.game.gameState.playTime -= 10;
    //             this.countdown.setText("climate collapse: " +  this.game.gameState.playTime);
    //         }
        
    // };

    updateTimer(){
        if (!this.player.invincible) {
            this.game.gameState.playTime -= 1;
        }
        this.countdown.setText(this.game.gameState.playTime); 
    };
    checkTimer(){
        if(this.game.gameState.playTime <= 0) {
            this.timer.remove();
            this.scene.start("gameover");
        }
    }

    nextLevel(){
    this.nextButton = this.add.sprite(9900, this.game.config.height / 2, 'next_button')
    this.nextButton.setInteractive();
    this.nextButton.setScale(0.2);
    this.nextButton.on('pointerdown', () => {
        this.scene.start("physics_v4_last");
    });  
} 

    // nextLevelCheck(){ 
    //     this.nextButton = this.add.sprite(x, y, 'nextButton').setInteractive();
    //     this.nextButton.on('pointerdown', function () {
    //         this.scene.start('nextLevel');
    //     }, this);
    // }

    

    // destroyStars(player, star) 
    // {
    //     star.destroy();
    // }

//     popUp(){
//     var popup = this.game.add.graphics(0, 0);
//     popup.beginFill(0xFFFFFF);
//     popup.drawRect(100, 100, 200, 100);
//     this.game.world.addChild(popup);

//     var text = this.game.add.text(150, 120, "This is a pop-up", {
//     font: "bold 32px Arial",
//     fill: "#000",
//     align: "center"
//     });
//     popup.addChild(text);

//     popup.inputEnabled = true;
//     popup.events.onInputDown.add(closePopup, this);

// function closePopup() {
//     popup.destroy();
// }
// };
    // if (this.player.body.x >=  this.worldWidth - this.player.width && (this.objectCounter == 6)) {
    //     this.scene.start ("physics_v4_last");
    //     }
    // }

}
