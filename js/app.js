$(function initGame() {
  const $blocks     = [];
  const width       = 20;
  const blockCount  = 400;
  const directions  = [-width,1,width,-1];
  const blockValues = ['red','orange','yellow','green','blue','purple'];
  const audioTheme  = $('<audio>', {src: './music/Blox.mp3' });
  const audioBlock  = $('<audio>', {src: './music/move.mp3' });
  let   newColor;
  let   $firstBlock;
  let   originalColorOfFirstTile;

  addBlocks();
  blockSound();
  initAudio();

  $('#ai').on('click', autoClick);
  $('#reset').on('click', resetBlocks);
  $('.buttonColor').on('click', changeBlocks);

  // Make blocks
  function makeBlocks() {
    return blockValues[Math.floor(Math.random() * blockValues.length)];
  }
  // Add blocks to page
  function addBlocks(){
    for (let i = 0; i < blockCount; i++) {
      const block = $('<div>', { id: [i], 'class': makeBlocks()});
      $blocks.push(block);
      $('.gameContainer').append(block);
      $firstBlock = $blocks[0];
    }
  }
  // Reset game
  function resetBlocks(){
    $('div[name="allTheBlocks"]').remove();
    $('.audio').remove();
    initGame();
  }
  // Change first block to color button clicked
  function changeBlocks(e) {
    newColor                 = e.target.id;
    originalColorOfFirstTile = $firstBlock.attr('class');
    $('h1, h2').css('color', newColor);
    recursiveBlockCheck(0);

    const setT = setInterval(function(){
      fallingBlocks();
    }, 0);
    setTimeout(function(){
      clearInterval(setT);
    },3000);
  }
  // Recursive function to check and color blocks
  function recursiveBlockCheck(index) {
    // Select the block in the dom
    const $newBlock    = $blocks[index];
    // Get it's current Color
    const currentColor = $newBlock.attr('class');
    // Temporarily change the border-color for player to see check
    $newBlock.css('border-color', 'white');
    setTimeout(() => {
      $newBlock.css('border-color', 'grey');
    }, 250);
    // Stop if it's not the same color as the first block,
    if (originalColorOfFirstTile !== currentColor) return;
    // Change the block to be the new color
    $newBlock.attr('class', newColor);
    // Loop through the directions
    for (let i = 0; i < directions.length; i++) {
      // Use the directions to select a new block using the compass
      const newIndex  = index + directions[i];
      // Check that it's a valid move
      if (invalidMove(newIndex, index)) continue;
      recursiveBlockCheck(newIndex);
    }
  }
  // Check whether the move/adjacent block is valid(or not)
  function invalidMove(newIndex, currentIndex) {
    return aboveTop(newIndex) || belowBottom(newIndex) || pastSides(newIndex, currentIndex);
  }
  function aboveTop(index) {
    return index < 0;
  }
  function belowBottom(index) {
    return index > (width * width)-1;
  }
  function pastSides(newIndex, currentIndex) {
    return (newIndex % width) - (currentIndex % width) === width-1;
  }
  // Play theme song
  function initAudio(){
    $('.music').text('Music').on('click', function() {
      console.log(audioTheme);
      audioTheme[0].paused ? $('.music').text('Pause') : $('.music').text('Music');
      audioTheme[0].paused ? audioTheme[0].play() : audioTheme[0].pause();
    });
  }
  // Play move audio
  function blockSound(){
    $('.buttonColor').on('click', function() {
      audioBlock[0].play();
    });
  }

  // Chaos mode - computer
  function autoClick() {
    const $buttons = $($('.buttonColor').sort(function() {
      return 0.5 - Math.random();
    }));

    $.each($buttons, function() {
      setTimeout(() => {
        $(this).trigger('click', changeBlocks);
      }, 500);
    });

    setTimeout(() => {
      if ($('div').size() !== $(`div.${$('div').attr('class')}`).size()) {
        autoClick();
      }
    }, 500*$buttons.size());
  }
  // Falling animation
  function fallingBlocks() {
    const fallingBlock = $('<div class="fallingBlocks">');
    $('body').prepend(fallingBlock);
    $('.fallingBlocks').css('background', newColor);
    const blockAnimCount = Math.floor(Math.random() * $('body').width()*20);
    const blockSpeed = Math.floor(Math.random() + 1000);
    fallingBlock.css({'left': blockAnimCount+'px'});
    fallingBlock.animate({
      width: [ 'toggle', 'swing' ],
      top: '800px',
      opacity: '0'
    }, blockSpeed, function(){
      $(this).remove();
    });
  }

});
