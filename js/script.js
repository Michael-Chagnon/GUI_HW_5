/* 
File: script.js
GUI Assignment: Creating an Interactive Dynamic Table
Michael Chagnon, UMass Lowell Computer Science,
michael_chagnon@student.uml.edu
Copyright (c) 2021 by Michael. All rights reserved. May be freely copied or
excerpted for educational purposes with credit to the author.
Created by MC on November 20, 2023
Description: Scrabble
*/

function makeDrag(){
    $( ".tile" ).draggable({snap: ".snapPoint" , snapMode:"inner"});
    $( ".snapPoint" ).droppable({snap: true});
}

$( function() {
    makeDrag();
});

// $( function() {
//     $( ".holderPiece1" ).droppable({snap: true});
// });


$("button#newPieces").click(function() {
    var letters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","Blank"]
    var number = parseInt(Math.random() * (27 - 0) + 0);
    $("div#pieceImage").append("<img id='tile' class='" + "tile" + "'" + "src='Scrabble_Tiles/Scrabble_Tile_" + letters[number] + ".jpg'" + "'>" + "</img>");
    var destination = $('.snapPoint').offset().top;
    $('.tile').css({top: destination.top, left: destination.left}); 
    makeDrag();
});