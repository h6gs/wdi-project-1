
const blocks = [];
const board = {};
const keys = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O'];
let initBlock = '';

function makeBlocks() {
  // assign block values
  const blockValues = ['red','orange','yellow','green','blue','purple'];
  return blockValues[Math.floor(Math.random() * blockValues.length)];
}

//loop to make game blocks
for (let i = 0; i < 225; i++) {
  blocks.push(makeBlocks());
}
//loop to make defined grid for blocks
for (let i=0 ; i < keys.length; i++) {
  board[keys[i]] = [];
  for (let j = 0; j < keys.length; j++) {
    board[keys[i]][j] = makeBlocks();
    $('<div>', {id: keys[i] + j , 'class': board[keys[i]][j]}).appendTo('main');
  }
}
console.log(board);

// click event, change colour of #A0 based off button color
$('.button').on('click', function(e) {
  const thisColor = e.target.id;
  console.log(thisColor);
  $('#A0').attr('class',thisColor);
  initBlock = thisColor;
});








// click color button
// key block (top left) changes to that color
// then evaluate if immediately adjacent blocks match the colour clicked
// if yes, colour is added and the adjacent block(s) join to the winning array
// repeat


//add blocks to page
// for (let i = 0; i < blocks.length; i++) {
//   $('<div>', {id: [i], 'class': blocks[i]}).appendTo('main');
// }
