class Player{
    constructor(stack){
        this.score = 0;//currrent score for the current round
        this.cards = [];//current cards the player is holding
        this.stack = stack;//current amount of money the player holds
        this.stand = false;
    }
    //Appends each element from cards to the current player's cards and updates the score accordingly
    assignCards(cards){
        cards.forEach(element => {
            this.score += element.points;
            this.cards.push(element);
        });
    }
    //Resets the current player's score and cards array; Returns the current player after reset
    reset(){
        this.score = 0;
        this.cards = [];
        return this;
    }
    //Subtracts amount from amount to stack and updates it
    bet(amount){
        this.stack -= amount;
    }
    //Adds amount to stack and updates it
    won(amount){
        this.stack += amount;
    }
}