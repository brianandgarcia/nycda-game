var theGame = function(game){
	spriteNumber = null;
	number = 0;
	workingButtons = true;
	higher = true;
	score = 0;

	//lets shorten this
	var clouds,
	players,
	cursors,
	boss,
	bossArrives,
	s,
	gameMessage,
	displayMessage;
}

theGame.prototype = {
  	create: function(){

		//load level bg
	    this.game.add.sprite(0, 0, 'level1');
	    this.game.add.sprite(0, 550, 'road');


	   //  The platforms group contains the ground that we can jump on
	    platforms = this.game.add.group();
	    //  We will enable physics for any object that is created in this group
	    platforms.enableBody = true;
	    // Here we create the ground.
	    var ground = platforms.create(0, this.game.world.height - 84, 'road');
	    //  This stops it from falling away when you jump on it
	    ground.body.immovable = true;
	    // The player and its settings
	    player = this.game.add.sprite(42, this.game.world.height - 290, 'dude');
	    //  We need to enable physics on the player
	    this.game.physics.arcade.enable(player);
	    //  Player physics properties. Give the little guy a slight bounce.
	    player.body.bounce.y = 0.1;
	    player.body.gravity.y = 600;
	    //this prevents the player from falling randomly outside of the game
	    player.body.collideWorldBounds = true;
	    //  Our two animations, walking left and right.
	    player.animations.add('left', [0, 1, 2, 3], 10, true);
   		player.animations.add('right', [5, 6, 7, 8], 10, true);
	    //  Our controls.
	    cursors = this.game.input.keyboard.createCursorKeys();
	    //clouds
	    //need to turn this into a method + add a tween
	    //  This sprite is using a texture atlas for all of its animation data
	    clouds = this.game.add.sprite(300,-50, 'clouds');
	    //  Here we add a new animation called 'run'
	    //  We haven't specified any frames because it's using every frame in the texture atlas
	    var float = clouds.animations.add('float');
	    //  true means it will loop when it finishes
	    clouds.animations.play('float', 1, true);

        //width is larger than game so it comes out from the right side
	    boss = this.game.add.sprite(900, 390, 'boss', 1);
	    boss.scale.setTo(0.8, 0.8);
	    bossArrives = this.game.add.tween(boss);
	    bossArrives.to({x:700}, 1000, Phaser.Easing.Bounce.Out).delay(3000);
	    //bossArrives.onComplete.add(this.attackMode, this);
	    bossArrives.onComplete.add(this.bossMessage, this);
	    bossArrives.start();

	},
	bossMessage: function() {
		console.log("Start Boss Message");
		gameMessage = this.game.add.sprite(800,200,'gameMessage');
		displayMessage = this.game.add.tween(gameMessage);
		displayMessage.to({x: 90, y:60}, 1000, Phaser.Easing.Linear.None);
		displayMessage.onComplete.addOnce(this.theEnd, this);
		displayMessage.start();
	},
	theEnd: function() {
		console.log("Trigger end");
	    
	    e = this.game.add.tween(gameMessage);
	    e.to({ x: -1500 }, 1000, Phaser.Easing.Bounce.Out).delay(10000);
	    e.onComplete.addOnce(this.attackMode, this);
	    e.start();
	},
	attackMode: function() {
		console.log("start second movement");
		attackMode = this.game.add.tween(boss);
		//will have to create a loop to run left and right
		attackMode.to({x: 20}, 2000, Phaser.Easing.Linear.None).delay(2000);
		attackMode.to({x: 800}, 1800, Phaser.Easing.Linear.None).delay(2000);
		attackMode.start();
	},
	checkOverlap: function(boss, player) {
	    var boundsA = boss.getBounds();
	    var boundsB = player.getBounds();

	    return Phaser.Rectangle.intersects(boundsA, boundsB);
	},
	update: function() {
	  	//  Collide the player and the ground
	    this.game.physics.arcade.collide(player, platforms);

	    //  Reset the players velocity (movement)
	    player.body.velocity.x = 0;

	    if (cursors.left.isDown)
	    {
	        //  Move to the left
	        player.body.velocity.x = -150;
	        player.animations.play('left');
	    }
	    else if (cursors.right.isDown)
	    {
	        //  Move to the right
	        player.body.velocity.x = 150;
	        player.animations.play('right');
	    }
	    else
	    {
	        //  Stand still
	        player.animations.stop();
	        player.frame = 4;
	    }
	    
	    //  Allow the player to jump if they are touching the ground.
	    if (cursors.up.isDown && player.body.touching.down)
	    {
	        player.body.velocity.y = -450;
	    }

	    //clouds
	    clouds.x -= 2;

	    if (clouds.x < -clouds.width)
	    {
	        clouds.x = this.game.world.width;
	    }

	    //check collide
        if (this.checkOverlap(player, boss))
	    {
	        console.log("overlap true");
	        this.game.state.start("GameOver");	
	    }
	    else
	    {
	        console.log("overlap false");
	    }

	}
}