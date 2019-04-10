class Player{
    constructor(stack){
        this.score = 0;//currrent score for the current round
        this.cards = [];//current cards the player is holding
        this.stack = stack;//current amount of money the player holds
        this.stand = false;
    }
    //Sets the passed in cards to the cards array for this instance of the player
    assignCards(cards){
        cards.forEach(element => {
            this.score += element.points;
            this.cards.push(element);
        });
        //this.cards.concat(cards);
    }
    //Resets the current player's score and cards array; Returns the current player after reset
    reset(){
        this.score = 0;
        this.cards = [];
        return this;
    }
}