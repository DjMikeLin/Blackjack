$(() => {
    let player = new Player(5000);
    let dealer = new Player(0);
    let game = new Game(player, dealer);

    $('#deal').click(() => {
        player.assignCards(game.currRound.deck.deal(2));
        dealer.assignCards(game.currRound.deck.deal(2));
        showCards(player, $('.playerCards'));
        showCards(dealer, $('.dealerCards'));
        $('#deal').hide();
        $('#bet').hide();
    });

    console.log(player, dealer);

/*     while(!game.dealer.stand){
        if(game.dealer.score <= 16){
            game.dealer.assignCards(game.currRound.deck.deal(1));
            game.currRound.bust(game.dealer);
        }
        else
            game.dealer.stand = true;
    } */
});
//Sends the card images that the player has to dom
function showCards(player, selector){
    let right = 0;
    for(let i = 0; i < player.cards.length; i++){
        let item = $('<img></img>').addClass('cards')
            .attr("src", player.cards[i].path)
            .css('right', right + 'px');

        selector.append(item);
        right += 50;
    }
}