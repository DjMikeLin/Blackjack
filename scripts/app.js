class Deck{
    constructor(){
        this.numCards = 52; 
        this.cards = this.makeDeck();
        this.cards = this.shuffle();
    }

    makeDeck(){
        let arr = [];

        let suits = ['C', 'D', 'H', 'S'];
        for(let i = 1; i <= 13; i++){
            for(let j = 0; j < 4; j++){
                arr.push('../Images/' + i + suits[j] + '.jpg');
            }
        }
        return arr;
    }
    //Shuffles the array of cards in the deck
    shuffle(){
        for(let i = 0; i < 500; i++){
            let randomIndex1 = Math.floor(Math.random() * this.cards.length);
            let randomIndex2 = Math.floor(Math.random() * this.cards.length);
            let element1 = this.cards[randomIndex1];
            let element2 = this.cards[randomIndex2];

            this.cards[randomIndex1] = element2;
            this.cards[randomIndex2] = element1;
        }
        return this.cards;
    }
}

$(() => {
    let deck = new Deck();
    console.log(deck);
});