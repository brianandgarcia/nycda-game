var gameOver = function(game){}

gameOver.prototype = {
	init: function(){
		alert("You lost!")
	},
  	create: function(){
  		var gameOverTitle = this.game.add.sprite(0,0,"splash");
		var playButton = this.game.add.button(160,320,"play",this.playTheGame,this);
		playButton.anchor.setTo(0.5,0.5);
	},
	playTheGame: function(){
		this.game.state.start("TheGame");
	}
}