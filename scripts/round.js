class Round{
    constructor(dealer, player){
        this.player = player;
        this.dealer = dealer;
        this.playerScore = player.score;
        this.dealerScore = dealer.score;
        this.deck = new Deck();
    }
    //Returns true if score is greater then 21; false otherwise
    bust(player){
        player.findAce();

        if(player.score > 21)
            return true;
        return false;
    }
    //Returns true if player's score is higher then dealers; false otherwise
    checkScores(){
        if(this.playerScore > this.dealerScore)
            return true;
        return false;
    }
}