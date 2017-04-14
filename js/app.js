$(() => {
  var game = game || {};

  game.initGame = function initGame(){
    game.newColor;
    game.$firstBlock;
    game.originalColorOfFirstTile;
    game.$blocks     = [];
    game.width       = 10;
    game.blockCount  = 100;
    game.directions  = [-game.width,1,game.width,-1];
    game.blockValues = ['red','orange','yellow','green','blue','purple'];
    game.audioTheme  = $('<audio>', {src: './music/Blox.mp3' });
    game.audioBlock  = $('<audio>', {src: './music/move.mp3' });

    game.makeBlocks();
    game.addBlocks();
    game.blockSound();
    game.initAudio();

    $('#ai').on('click', game.autoClick);
    $('#reset').on('click', game.resetBlocks);
    $('.buttonColor').on('click', game.changeBlocks);
  };
  // Make blocks
  game.makeBlocks = function makeBlocks(){
    return game.blockValues[Math.floor(Math.random() * game.blockValues.length)];
  };
  // Add blocks to page
  game.addBlocks  = function addBlocks(){
    for (let i    = 0; i < game.blockCount; i++) {
      const block = $('<div>', { id: [i], 'class': game.makeBlocks(),name: 'allTheBlocks'});
      game.$blocks.push(block);
      $('.gameContainer').append(block);
      game.$firstBlock = game.$blocks[0];
    }
    // Reset game
    game.resetBlocks = function resetBlocks(){
      $('div[name="allTheBlocks"]').remove();
      $('.audio').remove();
      game.initGame();

    };
    // Change first block to color button clicked
    game.changeBlocks = function changeBlocks(e) {
      game.newColor            = e.target.id;
      game.originalColorOfFirstTile = game.$firstBlock.attr('class');
      $('h1, h2').css('color', game.newColor);
      game.recursiveBlockCheck(0);

      const setT = setInterval(function(){
        game.fallingBlocks();
      }, 0);
      setTimeout(function(){
        clearInterval(setT);
      },3000);
    };
    // Recursive function to check and color blocks
    game.recursiveBlockCheck = function recursiveBlockCheck(index) {
      // Select the block in the dom
      const $newBlock    = game.$blocks[index];
      // Get it's current Color
      const currentColor = $newBlock.attr('class');
      // Temporarily change the border-color for player to see check
      $newBlock.css('border-color', 'white');
      setTimeout(() => {
        $newBlock.css('border-color', 'grey');
      }, 250);
      // Stop if it's not the same color as the first block,
      if (game.originalColorOfFirstTile !== currentColor) return;
      // Change the block to be the new color
      $newBlock.attr('class', game.newColor);
      // Loop through the directions
      for (let i = 0; i < game.directions.length; i++) {
        // Use the directions to select a new block using the compass
        const newIndex  = index + game.directions[i];
        // Check that it's a valid move
        if (game.invalidMove(newIndex, index)) continue;
        recursiveBlockCheck(newIndex);
      }
    };
    // Check whether the move/adjacent block is valid(or not)
    game.invalidMove = function invalidMove(newIndex, currentIndex) {
      return game.aboveTop(newIndex) || game.belowBottom(newIndex) || game.pastSides(newIndex, currentIndex);
    };
    game.aboveTop = function aboveTop(index) {
      return index < 0;
    };
    game.belowBottom = function belowBottom(index) {
      return index > (game.width * game.width)-1;
    };
    game.pastSides = function pastSides(newIndex, currentIndex) {
      return (newIndex % game.width) - (currentIndex % game.width) === game.width-1;
    };
    // Play theme song
    game.initAudio = function initAudio(){
      $('.music').text('Music').on('click', function() {
        game.audioTheme[0].paused ? $('.music').text('Pause') : $('.music').text('Music');
        game.audioTheme[0].paused ? game.audioTheme[0].play() : game.audioTheme[0].pause();
      });
    };
    // Play move audio
    game.blockSound = function blockSound(){
      $('.buttonColor').on('click', function() {
        game.audioBlock[0].play();
      });
    };

    // Chaos mode - computer
    game.autoClick = function autoClick() {
      const $buttons = $($('.buttonColor').sort(function() {
        return 0.5 - Math.random();
      }));
      // Change blocks randomly
      $.each($buttons, function() {
        setTimeout(() => {
          $(this).trigger('click', game.changeBlocks);
        }, 500);
      });
      // Interval to Change blocks randomly
      setTimeout(() => {
        if ($('div').size() !== $(`div.${$('div').attr('class')}`).size()) {
          autoClick();
        }
      }, 500*$buttons.size());
    };
    // Falling animation
    game.fallingBlocks = function fallingBlocks() {
      const fallingBlock = $('<div class="fallingBlocks">');
      $('body').prepend(fallingBlock);
      $('.fallingBlocks').css('background', game.newColor);
      const blockAnimCount = Math.floor(Math.random() * $('body').width()*20);
      const blockSpeed = Math.floor(Math.random() + 1000);
      fallingBlock.css({'left': blockAnimCount+'px'});
      fallingBlock.animate({
        width: ['toggle', 'swing'],
        top: '800px',
        opacity: '0'
      }, blockSpeed, function(){
        $(this).remove();
      });
    };
  };
  $(game.initGame());
});
