class Player{
    constructor(score){
        this.score = score;//currrent score for the current round
        this.cards = [];//current cards the player is holding
        this.stack = 0;//current amount of money the player holds
    }
    //Sets the passed in cards to the cards array for this instance of the player
    assignCards(cards){
        this.cards = cards;
    }
}