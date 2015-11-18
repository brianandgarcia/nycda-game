var preload = function(game){}

preload.prototype = {
	preload: function(){ 
          var loadingBar = this.add.sprite(160,240,"loading");
          loadingBar.anchor.setTo(0.5,0.5);
          this.load.setPreloadSprite(loadingBar);
		this.game.load.spritesheet("numbers","assets/numbers.png",100,100);
		this.game.load.image("gameTitle","assets/title.png");
		this.game.load.image("play","assets/play.png");
		this.game.load.image("gameover","assets/gameover.png");

		this.game.load.image("splash", "assets/splash.jpg");
		this.game.load.image("level1", "assets/level1.jpg");
		this.game.load.spritesheet('dude', 'assets/dude.png', 66.75, 75);
		this.game.load.image("road", "assets/road.jpg");
		this.game.load.image("clouds", "assets/clouds.png");
		this.game.load.image("boss", "assets/boss.png", 86, 128);
		this.game.load.image("gameMessage", "assets/gameMessage.jpg");

	},
  	create: function(){
		this.game.state.start("GameTitle");
	}
}