class Game{
    constructor(){
        this.dealer = new Player(0);
        this.player = new Player(0);
        this.currRound = new Round(this.dealer, this.player);
    }
    //Returns true if the player's stack goes to 0; false otherwise
    endGame(){
        if(this.player.stack === 0)
            return true;
        return false;
    }
    //Starts a new round
    newRound(){
        this.currRound = new Round(this.dealer, this.player.reset());
    }
}