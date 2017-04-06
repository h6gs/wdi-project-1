# wdi-project-1
![](./images/ballMania.png)

**Introduction**

Ball-Mania is based from the sort-of popular single player web game 'Drench'. This was made for my first project on the Web Development course at General Assembly using JavaScript(JQuery) / CSS & HTML. 

A hosted version of my game can be found [here] (fierce-temple-20446.herokuapp.com) on Heroku.


**How to play**

The player starts in the top-left corner of the grid and has to use the buttons on the bottom to join the adjacent colors & ultimately fill the screen. 

**Project Brief**

* Make a game

* Object-Orientate the code

* Multiplayer (where possible)

**How it was built**

HTML, CSS and JavaScript with the aid of Jquery. 

Some snippets below:


    const block = $('<div>', { id: [i], 'class': game.makeBlocks()});
 .
         
    if (game.invalidMove(newIndex, index)) continue;
        recursiveBlockCheck(newIndex);
      
         
.
      
    game.pastSides = function pastSides(newIndex, currentIndex) {
      return (newIndex % game.width) - (currentIndex % game.width) === game.width-1;

      


**Credits**

My General Assembly instructors

Jake Weary
