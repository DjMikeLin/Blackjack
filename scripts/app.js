$(() => {
    let player = new Player(5000);
    let dealer = new Player(0);
    let game = new Game(player, dealer);
    player.assignCards(game.currRound.deck.deal(2));

    let right = 0;
    for(let i = 0; i < player.cards.length; i++){
        let item = $('<img></img>').addClass('cards')
            .attr("src", player.cards[i].path)
            .css('right', right + 'px');
        $('.playerCards').append(item);

        right += 50;
    }
    console.log(player);
    dealer.assignCards(game.currRound.deck.deal(2));
    console.log(dealer);

    while(!game.dealer.stand){
        if(game.dealer.score <= 16){
            game.dealer.assignCards(game.currRound.deck.deal(1));
            game.currRound.bust(game.dealer);
        }
        else
            game.dealer.stand = true;
    }

/*     console.log(game);
    console.log(game.dealer.cards); */
});

function showCards(player){
    let right = 0;
    for(let i = 0; i < player.cards.length; i++){
        let item = $('<img></img>').addClass('cards')
            .attr("src", player.cards[i].path)
            .css('right', right + 'px');
        $('.playerCards').append(item);

        right += 50;
    }
}