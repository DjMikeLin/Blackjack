$(() => {
    let game = new Game();
    game.player.assignCards(game.currRound.deck.deal(2));
    game.dealer.assignCards(game.currRound.deck.deal(2));
    
    while(!game.dealer.stand){
        if(game.dealer.score <= 16)
            game.dealer.assignCards(game.currRound.deck.deal(1));
        else
            game.dealer.stand = true;
    }

    console.log(game);
});