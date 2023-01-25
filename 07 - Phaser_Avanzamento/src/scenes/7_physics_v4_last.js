import Player from "../components/player.js"


export default class Physics_v4_last extends Phaser.Scene {

    background;       // oggetto relativo all'elemento "sfondo"
    player;           // oggetto relativo all'elemento "giocatore"
    floorHeight;      // Altezza del terreno (asse y) rispetto al riquadro di gioco

     


    constructor() {
        // Il costruttore della classe base Phaser.Scene prende come argomento il nome della scena
        super("physics_v4_last");
    }

    init() {
        console.log("physics_v4_last - Executing init()");
        // Definiamo l'altezza del terreno pari all'altezza del riquadro
        // di gioco, per posizionare il giocatore sul fondo della schermata.
        this.floorHeight = this.game.config.height - 90
        this.worldWidth = 6000;
    }

    preload() {
        console.log("physics_v4_last - Executing preload()");
        // Carichiamo gli asset grafici
        this.load.image("platform", "assets/images/environment_elements/asset_8.png");
        this.load.image("platform_small", "assets/images/environment_elements/asset_9.png");
        // this.load.image("hiddden_obj", "assets/UI/hidden_object.png");
        this.load.image("star", "assets/images/environment_elements/star.png");
        this.load.image("level_2", "assets/images/background/parallax_layers_liv2/liv_2.png");
        this.load.image("level_2_2", "assets/images/background/parallax_layers_liv2/liv_2_2.png");
        this.load.image("level_2_3", "assets/images/background/parallax_layers_liv2/liv_2_3.png");
        this.load.image("level_2_4", "assets/images/background/parallax_layers_liv2/liv_2_4.png");
        this.load.image("level_2_5", "assets/images/background/parallax_layers_liv2/liv_2_5.png");
        this.load.image("resume_button", "assets/UI/play_button_2.png");
        this.load.image("pause_panel", "assets/UI/menu_block.png");
        this.load.image("pause_button", "assets/UI/pause_button.png");
        // this.load.image("vasca", "assets/images/environment_elements/vasca_liquami.png");
        
    }

    create() {
        // Qui le istruzioni su cosa creare e dove nel mondo di gioco
        console.log("physics_v4_last - Executing create()");

        //il flag lo stato del gioco e consentire di mettere in pausa il gioco in modo semplice e controllato.
        this.paused = false;
        // parallax scrolling
        this.bg_5 = this.add.tileSprite(0, 0, 0, 0, "level_2_5");
        this.bg_5.setOrigin(0,0);
        this.bg_5.setScrollFactor(0);

        this.bg_4 = this.add.tileSprite(0, 0, 0, 0, "level_2_4");
        this.bg_4.setOrigin(0,0);
        this.bg_4.setScrollFactor(0);

        this.bg_3 = this.add.tileSprite(0, 0, 0, 0, "level_2_3");
        this.bg_3.setOrigin(0,0);
        this.bg_3.setScrollFactor(0);

        this.bg_2 = this.add.tileSprite(0, 0, 0, 0, "level_2_2");
        this.bg_2.setOrigin(0,0);
        this.bg_2.setScrollFactor(0);

        this.bg_1 = this.add.tileSprite(0, 0, 0, 0, "level_2");
        this.bg_1.setOrigin(0,0);
        this.bg_1.setScrollFactor(0);

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
        const thePlayer = new Player(this, 0, this.floorHeight, 5000);
        // Aggiungi il player alla fisica
        this.player = this.physics.add.existing(thePlayer);
        this.physics.add.collider(this.player, this.floor);
        //camera per creazione scrolling
        this.myCam = this.cameras.main;
        this.myCam.setBounds(0, 0, 10000, 0);
        // Imposta la camera per seguire i movimenti del giocatore lungo l'asse x
        this.cameras.main.startFollow(this.player);
        this.cameras.main.setFollowOffset(0, this.game.config.height / 2); // Abbassiamo la telecamera


        // Inserisci delle piattaforme
        // this.createStaticPlatforms();
        // this.createStars();
        // this.createMovingPlatforms();
        this.CreateUI();
        //Inserisco Vasche
        // this.insertVasche();



        // 
    }

    CreateUI(){

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
        const styleConfig = { color: '#ffffff', fontSize: 50};
        const startMessage = "climate collapse: " +  this.game.gameState.playTime;
        const textPosX = 0;
        const textPosY = 0;
        this.countdown = this.add.text(textPosX, textPosY, startMessage, styleConfig);
        this.countdown.setOrigin(0,0);
        this.countdown.setScrollFactor(0,0);

        this.timedEvent = this.time.addEvent({ delay: 1000, callback: this.updateTimer, callbackScope: this, loop: true });
    };


    // createStaticPlatforms(){
    //     this.platforms = this.physics.add.staticGroup({
    //         key: 'platform',
    //         repeat: 3,
    //         setXY: {
    //             x: 1000,
    //             y: this.floorHeight - 200,
    //             stepX: 1000,
    //         }
    //     });
    //     this.platforms_small = this.physics.add.staticGroup({
    //         key: 'platform_small',
    //         repeat: 2,
    //         setXY: {
    //             x: 1500,
    //             y: this.floorHeight - 400,
    //             stepX: 1000,
    //         }
    //     });
    //  this.physics.add.collider(this.platforms_small, this.player, ()=> {
    //     this.player.isJumping = false; 
    //     });
    //  this.physics.add.collider(this.platforms, this.player, ()=> {
    //     this.player.isJumping = false; 
    //     });
    // };

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
    //     this.movingPlatforms.create(1500, Phaser.Math.Between(this.game.config.height - 200, this.game.config.height - 200), 'platform').setScrollFactor
    //     this.movingPlatforms.create(2000, Phaser.Math.Between(this.game.config.height - 400, this.game.config.height - 400), 'platform_small')
    //     this.movingPlatforms.create(2500, Phaser.Math.Between(this.game.config.height - 200, this.game.config.height - 200), 'platform');
    //     this.movingPlatforms.create(3000, Phaser.Math.Between(this.game.config.height - 400, this.game.config.height - 400), 'platform_small')
    //     this.movingPlatforms.create(3500, Phaser.Math.Between(this.game.config.height - 200, this.game.config.height - 200), 'platform');
    //     this.movingPlatforms.create(4000, Phaser.Math.Between(this.game.config.height - 400, this.game.config.height - 400), 'platform_small')
    //     // ...sottrai le piattaforme all'effetto della gravità!
    //     this.movingPlatforms.children.iterate( function (platform,platform_small) {
    //             platform.setImmovable(true);
    //             platform.body.allowGravity = false;
    //             platform.body.setVelocityX(Phaser.Math.Between(-200, +200));
    //     });

    // //     // Rendi le piattaforme "solide". Se il giocatore è su una piattaforma
    // //     // allora il suo stato è "non sta saltando" (questo per riprodurre l'animazione
    // //     // del giocatore fermo).
    //         this.physics.add.collider(this.movingPlatforms, this.player, ()=> {
    //         this.player.isJumping = false;
    //     });
    // };    

    // animatePlatforms() {

    //     if(this.platformGoingLeft) {
    //         this.platform2.x = this.platform2.x - 2;
    //     } else {
    //         this.platform2.x = this.platform2.x + 2;
    //     }

    //     if(this.platform2.x < 1300-100) {
    //         this.platformGoingLeft = false;
    //     } else {
    //         if(this.platform2.x > 1300+100) {
    //             this.platformGoingLeft = true;
    //         }
    //     }

    // }

    
      createStars(){

        this.stars = this.physics.add.image(3500, this.floorHeight, "star");
        this.stars.setOrigin(0, 1);
        this.stars.setScale(0.025,0.025);
        
        // this.stars.repeat(2);
        // this.stars.setXY(1300, 3500);


        this.stars.setImmovable;
        this.stars.body.allowGravity=false;

        this.physics.add.existing (this.stars);

        //this.physics.add.overlap(this.player, this.stars, null, this);

        this.physics.add.overlap(this.player, this.stars, this.destroyStars, null, this);
    };



    update() {
        // Azioni che vengono eseguite a ogni frame del gioco
        this.player.manageMovements();
        this.scroll();
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

    
    updateTimer(){
        this.game.gameState.playTime -= 1;
        this.countdown.setText("climate collapse: " +  this.game.gameState.playTime);
    };

//     insertVasche() {
//         // vasche
//         console.log("insertVasche");
//         this.vasche = [];
//         for (let i = 0; i < 3; i++) {
//             const vasca = this.physics.add.image(5000 + 1500*i, 0,  "vasca");
//             vasca.setOrigin(0, 0);
//             vasca.setScale(0.3);
//             this.vasche.push(vasca);
//         }
//         this.vascaGroup = this.physics.add.group(this.vasche);
//         this.physics.add.collider(this.floor, this.vascaGroup);  
//         this.physics.add.collider(this.player,this.vascaGroup);
//     }
    
//     destroyStars(player, star) {
//         star.destroy();
//     }
    

}
