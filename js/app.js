
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

//change color of key square (top left)
$('[name="redButton"]').on('click', function() {
  $('#0').attr('class','red');
});

//change color of next cells until next red.
$('[name="redButton"]').on('click', function() {
  if ($('#0').next().attr('red')) {
    $('#0').nextUntil('.red').attr('class','red');
  } else {
    console.log('no');
  }

});

// $('#0').next(),console.log(this);






// click color button
// key block (top left) changes to that color
// then evaluate if immediately adjacent blocks match the colour clicked
// if yes, colour is added and the adjacent block(s) join to the winning array
// repeat
