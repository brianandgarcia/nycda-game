var gameTitle = function(game){}

gameTitle.prototype = {
  	create: function(){

	    //add splash for game
	    this.game.add.sprite(0, 0, 'splash');

		var gameTitle = this.game.add.sprite(400,150, "gameTitle");

		gameTitle.anchor.setTo(0.5,0.5);
		var playButton = this.game.add.button(400,450,"play",this.playTheGame,this);
		playButton.anchor.setTo(0.5,0.5);


	},
	playTheGame: function(){
		this.game.state.start("TheGame");
	}
}