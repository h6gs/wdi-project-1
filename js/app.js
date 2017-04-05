$(function gameSetup() {
  const $blocks     = [];
  const width       = 15;
  let   newColor;
  let   $firstBlock;
  let   originalColorOfFirstTile;

  addBlocks();

  $('#reset').on('click', resetBlocks);
  $('.buttonColor').on('click', changeBlocks);
  $('#test').on('click', autoClick);

  // add blocks to page
  function makeBlocks() {
    const blockValues = ['red','orange','yellow','green','blue','purple'];
    return blockValues[Math.floor(Math.random() * blockValues.length)];
  }
  // Add blocks to page
  function addBlocks(){
    for (let i = 0; i < 225; i++) {
      const block = $('<div>', { id: [i], 'class': makeBlocks(), name: 'allTheBlocks'});
      $blocks.push(block);
      $('main').append(block);
      $firstBlock = $blocks[0];
    }
  }
  // Reset game
  function resetBlocks(){
    $('div[name="allTheBlocks"]').remove();
    gameSetup();
  }

  function changeBlocks(e) {
    newColor                 = e.target.id;
    originalColorOfFirstTile = $firstBlock.attr('class');
    recursiveBlockCheck(0);
  }

  // Faux-that randomly assigns adjacent cells a new color
  function autoClick() {
    const $buttons = $($('.buttonColor').sort(function() {
      return 0.9 - Math.random();
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

  function recursiveBlockCheck(index) {
    // Select the block in the dom
    const $newBlock    = $blocks[index];
    // Get it's current Color
    const currentColor = $newBlock.attr('class');
    // Temporarily change the border-color for player to see spread
    $newBlock.css('border-color', 'white');
    setTimeout(() => {
      $newBlock.css('border-color', 'black');
    }, 250);

    // Stop if it's not the same color as the first block,
    if (originalColorOfFirstTile !== currentColor) return;
    // Change the block to be the new color
    $newBlock.attr('class', newColor);
    // Directions to look
    const directions  = [-width,1,width,-1];
    // Loop through the directions
    for (let i = 0; i < directions.length; i++) {
      // Use the directions to select a new block using the compass
      const newIndex  = index + directions[i];
      // Check that it's a valid move
      if (invalidMove(newIndex, index)) continue;
      recursiveBlockCheck(newIndex);
    }
  }

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
    return (newIndex % width) - (currentIndex % width) === 14;
  }


  const audioElement = document.createElement('audio');
  audioElement.setAttribute('src', './music/Blox.mp3');

  $('#music').on( 'click', function() {
    audioElement.paused ? audioElement.play() : audioElement.pause();
    console.log(this);

  });














});
