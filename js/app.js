
const blocks = [];
let   colorNow  = [];

function makeBlocks() {
  // assign block values
  const blockValues = ['red','orange','yellow','green','blue','purple'];
  return blockValues[Math.floor(Math.random() * blockValues.length)];
}

//loop to make game blocks
for (let i = 0; i < 225; i++) {
  blocks.push(makeBlocks());
}

//add blocks to page
for (let i = 0; i < blocks.length; i++) {
  $('<div>', {id: [i], 'class': blocks[i]}).appendTo('main');
}

$('.button').on('click', function(e) {
  colorNow = e.target.id;
  console.log(colorNow);
  $('#0').attr('class', colorNow);
});




// create object with N E S W, N - width
//
// const directions = [-15,+1,+15,-1]
//
// // Have the same color as
