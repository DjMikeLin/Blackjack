$(() => {
    let player = new Player(5000);
    setStack(player, player.stack);
    setBet(player, player.bet);

    let dealer = new Player(0);
    let game = new Game(player, dealer);

    let clickableChips = new Chips();
    assignOnClickToChips(clickableChips.types, player);

    $('#deal').hide();
    $('#hit').hide();
    $('#stand').hide();
    $('.playerInfo').hide();

    $('#bet').click(() => {
        $('#errorMessage').text("");
        //Edge case checking
        if(player.bet === 0){
            $('#errorMessage').text("You need to bet a amount by clicking the chips!");
            return;
        }
        else if(player.bet > player.stack){
            $('#errorMessage').text("You can't bet more then your current stack!");
            setBet(player, 0);
            return;
        }

        setStack(player, player.stack - player.bet);
        $('#bet').hide();
        $('.chips').hide();
        $('#deal').show();
    });

    $('#deal').click(() => {
        player.assignCards(game.currRound.deck.deal(2));
        dealer.assignCards(game.currRound.deck.deal(2));
        dealer.dealerScore = dealer.score - dealer.cards[0].points;

        showCards(player, $('.playerCards'));
        showPreFlipCards(dealer, $('.dealerCards'));

        $('.playerInfo').show();
        $('#deal').hide();
        $('#hit').show();
        $('#stand').show();

        setScore(player);
        setDealerScore(dealer);
    });

    $('#hit').click(() => {
        player.assignCards(game.currRound.deck.deal(1));
        appendCard(player, $('.playerCards'));

        if(game.currRound.bust(player)){
            console.log("busted");

        }
    });

    $('#stand').click(() => {

    });

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

function appendCard(player, selector){
    selector.append($('<img></img>')
        .addClass('cards')
        .attr("src", player.cards[player.cards.length - 1].path)
        .css('right', (parseInt(selector.last().css('right')) + 50) + "px")
    );
}
//Show dealer cards pre flip
function showPreFlipCards(dealer, selector){
    selector.append($('<img></img>')
        .addClass('cards')
        .attr("src", "Images/Yellow_back.jpg")
        .css('right', '0px'));
    
    selector.append($('<img></img>')
        .addClass('cards')
        .attr("src", dealer.cards[1].path)
        .css('right', '50px'));
}
//Assign onClicks to every chip
function assignOnClickToChips(chips, player){
    chips.forEach(chip => {
        let item = $('<img></img>').attr('src', chip.path);
        //On player click() increase the player's current bet
        item.click(() => {
            player.bet += chip.value;
            setBet(player, player.bet);
        });
        $('.chips').append(item);
    });
}
//Refreshes page with player's current stack
function setStack(player, currStack){
    player.stack = currStack;
    $('.stackSize').text(player.stack);
}
//Refreshes page with player's current bet
function setBet(player, currBet){
    player.bet = currBet;
    $('.betSize').text(player.bet);
}
//Refreshes page with player's current score
function setScore(player){
    $('.playerScore').text(player.score);
}
//Refreshes page with dealer's score before dealer's turn
function setDealerScore(dealer){
    $('.dealerScore').text(dealer.dealerScore);
}