$(() => {
    let player = new Player(5000);
    let dealer = new Player(0);
    let game = new Game(player, dealer);

    let clickableChips = new Chips();
    assignOnClickToChips(clickableChips.types, player);

    $('#deal').hide();
    $('#hit').hide();
    $('#stand').hide();

    $('#bet').click(() => {
        if(player.bet > player.stack){
            $('#errorMessage').text("You can't bet more then your current stack!");
        }

        $('#bet').hide();
        $('.chips').hide();
        $('#deal').show();
    });

    $('#deal').click(() => {
        player.assignCards(game.currRound.deck.deal(2));
        dealer.assignCards(game.currRound.deck.deal(2));
        showCards(player, $('.playerCards'));
        showCards(dealer, $('.dealerCards'));
        $('#deal').hide();
        $('#hit').show();
        $('#stand').show();
    });

    $('#hit').click(() => {
        player.assignCards(game.currRound.deck.deal(1));
        
        if(game.currRound.bust(player)){
            console.log("busted");

        }
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
//Assign onClicks to every chip
function assignOnClickToChips(chips, player){
    chips.forEach(chip => {
        let item = $('<img></img>').attr('src', chip.path);
        //On player click() increase the player's current bet
        item.click(() => {
            player.bet += chip.value;
            console.log(player);
        });
        $('.chips').append(item);
    });
}
//Refreshes page with player's current stack
function setStack(player){
    $('.stackSize').text(player.stack);
}