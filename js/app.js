
const blocks = [];

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
