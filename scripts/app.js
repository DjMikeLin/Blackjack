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
    $('#nextRound').hide();
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

        setScore(player, $('.playerScore'));
        setDealerScore(dealer);
        checkBlackJack(player);
        //Dealer or player will only bust after dealing if both cards are Aces
        if(game.currRound.bust(player))
            player.findAce();
        
        if(game.currRound.bust(dealer))
            dealer.findAce();
    });

    $('#hit').click(() => {
        player.assignCards(game.currRound.deck.deal(1));

        if(game.currRound.bust(player))
            player.findAce();

        appendCard(player, $('.playerCards'), $('.playerCards > .cards'));
        checkBlackJack(player);
        setScore(player, $('.playerScore'));
        
        if(game.currRound.bust(player)){
            $('#errorMessage').text("Busted!");
            $('#hit').hide();
            $('#stand').hide();
            $('#nextRound').show();
            flipCard(dealer);
        }
    });

    $('#stand').click(() => {
        $('#hit').hide();
        $('#stand').hide();

        flipCard(dealer);
        dealerTurn(game);
    });

    $('#nextRound').click(() => {
        nextRound(game);
        console.log(game);
    });
});
//Checks if player have blackjack; If true auto click stand
function checkBlackJack(player){
    if(player.blackJack){
        player.stand = true;
        $('#stand').click();
    }
}
//Dealer takes turn
function dealerTurn(game){
    while(!game.dealer.stand){
        if(game.dealer.score <= 16){
            game.dealer.assignCards(game.currRound.deck.deal(1));

            if(game.currRound.bust(game.dealer))
                game.dealer.findAce();
            
            appendCard(game.dealer, $('.dealerCards'), $('.dealerCards > .cards'));
            setScore(game.dealer, $('.dealerScore'));
            checkBlackJack(game.dealer);

            if(game.currRound.bust(game.dealer)){
                playerWon(game.player);
                $('#nextRound').show();
                return;
            }
        }
        else
            game.dealer.stand = true;
    }

    $('#nextRound').show();
    if(game.currRound.checkScores() === true)
        playerWon(game.player);
    else if(game.currRound.checkScores() === false)
        $('#errorMessage').text("You've Lost!");
    else{
        $('#errorMessage').text("You've Drawed!");
        setStack(game.player, game.player.stack + game.player.bet);
    }
}
//Starts a new round in the game
function nextRound(game){
    game.newRound();
}
//Updates stuff after player has won
function playerWon(player){
    $('#errorMessage').text("You've Won!");
    setStack(player, player.stack + (player.bet * 2));
}
//Flip the dealer card and updates the dealer score in dom
function flipCard(dealer){
    $('.dealerCards > .cards').first().attr('src', dealer.cards[0].path);
    setScore(dealer, $('.dealerScore'));
}
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
//Appends the new card from player into the pre existing container
function appendCard(player, container, selector){
    container.append($('<img></img>')
        .addClass('cards')
        .attr("src", player.cards[player.cards.length - 1].path)
        .css('right', (parseInt(selector.last().css('right')) + 50) + 'px')
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
function setScore(player, selector){
    selector.text(player.score);
}
//Refreshes page with dealer's score before dealer's turn
function setDealerScore(dealer){
    $('.dealerScore').text(dealer.dealerScore);
}