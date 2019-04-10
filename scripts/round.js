class Round{
    constructor(dealer, player){
        this.player = player;
        this.dealer = dealer;
        this.playerScore = player.score;
        this.dealerScore = dealer.score;
        this.deck = new Deck();
    }
    //Returns true if score is greater then 21; false otherwise
    bust(score){
        if(score > 21)
            return true;
        return false;
    }
}