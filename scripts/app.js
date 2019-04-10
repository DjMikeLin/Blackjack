$(() => {
    let game = new Game();
    game.player.assignCards(game.currRound.deck.deal(2));
    game.dealer.assignCards(game.currRound.deck.deal(2));
    game.player.stand = true;
    console.log(game.player);
});