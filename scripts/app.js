$(() => {
    let player = new Player(5000);
    let dealer = new Player(0);
    let game = new Game(player, dealer);
    game.player.assignCards(game.currRound.deck.deal(2));
    game.dealer.assignCards(game.currRound.deck.deal(2));
    
    while(!game.dealer.stand){
        if(game.dealer.score <= 16){
            game.dealer.assignCards(game.currRound.deck.deal(1));
            game.currRound.bust(game.dealer);
        }
        else
            game.dealer.stand = true;
    }

    console.log(game);
    console.log(game.dealer.cards);
});