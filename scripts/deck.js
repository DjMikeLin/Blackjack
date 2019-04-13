class Deck{
    constructor(){
        this.numCards = 52;//current number of cards in the Deck
        this.cards = this.makeDeck();//current cards in the Deck
        this.cards = this.shuffle();//shuffles deck on creation
    }
    //Returns a array of objects; Objects have path to image, points regarding to card, and the number cardType
    makeDeck(){
        let arr = [];

        let suits = ['C', 'D', 'H', 'S'];
        for(let i = 1; i <= this.numCards / 4; i++){
            for(let j = 0; j < 4; j++){
                let points = 0;
                if(i >= 10)
                    points = 10;
                else if(i < 10 && i > 1)
                    points = i;
                else//if it is an ACE
                    points = 11;

                arr.push({
                    path: 'Images/' + i + suits[j] + '.jpg',
                    points: points,
                    cardType: i
                });
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
    //Pops and returns num cards in a array from the begining of cards array
    deal(num){
        let arr = [];
        for(let i = 0; i < num; i++){
            arr.push(this.cards.pop());
            this.numCards--;
        }
        return arr;
    }
}