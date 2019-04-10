class Deck{
    constructor(){
        this.numCards = 52; 
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
}

$(() => {
    let deck = new Deck();
});