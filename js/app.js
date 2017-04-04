const $blocks     = [];
let   newColor;
let   originalColorOfFirstTile;
let   $firstBlock;
const width       = 15;

addBlocks();

$('#reset').on('click', addBlocks);
// $('#test').on('click', autoClick);
$('.buttonColor').on('click', changeBlocks);

// function autoClick() {
//   const $buttons = $($('.buttonColor').sort(function() {
//     return .5 - Math.random();
//   }));
//
//   $.each($buttons, function() {
//     setTimeout(() => {
//       $(this).trigger('click', changeBlocks);
//     }, 500);
//   });
//   setTimeout(() => {
//     if ($('div').size() !== $(`div.${$('div').attr('class')}`).size()) {
//       autoClick();
//     }
//   }, 500*$buttons.size());
// }

function makeBlocks() {
  // assign block values
  const blockValues = ['red','orange','yellow','green','blue','purple'];
  return blockValues[Math.floor(Math.random() * blockValues.length)];
}

// add blocks to page
function addBlocks(){
  for (let i = 0; i < 225; i++) {
    const block = $('<div>', { id: [i], 'class': makeBlocks() });
    $blocks.push(block);
    $('main').append(block);
    $firstBlock = $blocks[0];
  }
}

function changeBlocks(e) {
  newColor                 = e.target.id;
  originalColorOfFirstTile = $firstBlock.attr('class');
  recursiveBlockCheck(0);
}


function recursiveBlockCheck(index) {
  // console.log('CHECKING NEW INDEX', index);
  // Select the block in the dom
  const $newBlock    = $blocks[index];
  // Get it's current Color
  const currentColor = $newBlock.attr('class');

  // Temp change the border-color to see recursion in action...
  $newBlock.css('border-color', 'black');
  setTimeout(() => {
    $newBlock.css('border-color', 'white');
  }, 250);
  // If it's not the same color as the first block,
  // Stop recursion and exit with return
  // console.log(originalColorOfFirstTile, currentColor);
  if (originalColorOfFirstTile !== currentColor) return;

  // Change the block to be the new color
  $newBlock.attr('class', newColor);

  const directions  = [-width,1,width,-1];
  // Loop through the directions
  for (let i = 0; i < directions.length; i++) {
    // Use the directions to select a new block using the compass
    const newIndex  = index + directions[i];
    // Check that it's a valid move
    if (invalidMove(newIndex, index)) continue;
    // console.log('checking', newIndex)

    // // Use that block as the new starting block
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



/*
was in line 59 between invalidMove(newIndex)
// // e.g. above the top
// (newIndex < 0) ||
// // e.g. below the bottom
// (newIndex > (width * width)) ||
// // (1 % 15) - (0 % 15) -> VALID
// // (14 % 15) - (15 % 15) -> NOT VALID
// // e.g. checking end of row to the right
// // e.g. end of row to the left
// (newIndex % width - index % width) === 14
*/
