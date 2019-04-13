class Player{
    constructor(stack){
        this.score = 0;//currrent score for the current round
        this.cards = [];//current cards the player is holding
        this.stack = stack;//current amount of money the player holds
        this.stand = false;
        this.blackJack = false;
        this.bet = 0;//current player bet
        this.dealerScore = 0;//Only for dealer, score before dealer's turn
    }
    //Appends each element from cards to the current player's cards and updates the score accordingly
    assignCards(cards){
        cards.forEach(element => {
            this.score += element.points;
            this.cards.push(element);
        });
        this.checkBlackJack();
    }
    //Resets the current player's score and cards array; Returns the current player after reset
    reset(){
        this.score = 0;
        this.cards = [];
        this.stand = false;
        this.blackJack = false;
        this.bet = 0;
        this.dealerScore = 0;
        return this;
    }
    //Subtracts amount from amount to stack and updates it
    lost(amount){
        this.stack -= amount;
    }
    //Adds amount to stack and updates it
    won(amount){
        this.stack += amount;
    }
    //Finds if there is an Ace with 11 points, if there is decrease score by 10
    //and resets that card to 1 point
    findAce(){
        this.cards.forEach(card => {
            if(card.cardType === 1 && card.points === 11){
                this.score -= 10;
                card.points = 1;
                return;
            }
        });
    }
    //Sets the property blackJack to true if current player hit a Blackjack
    checkBlackJack(){
        if(this.score === 21)
            this.blackJack = true;
    }
}