class Round{
    constructor(dealer, player){
        this.player = player;
        this.dealer = dealer;
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
        if(this.player.score > this.dealer.score)
            return true;
        return false;
    }
}