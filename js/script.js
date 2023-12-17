/* 
File: script.js
GUI Assignment: Creating an Interactive Dynamic Table
Michael Chagnon, UMass Lowell Computer Science,
michael_chagnon@student.uml.edu
Copyright (c) 2021 by Michael. All rights reserved. May be freely copied or
excerpted for educational purposes with credit to the author.
Created by MC on November 20, 2023
Description: Scrabble game that allows for draggable pieces and keeps track of score.
*/
const obj = // data structure provided by Ramon Meza to keep track of pieces
    {"pieces": [
        {"letter":"A", "value":1, "amount":9},
        {"letter":"B", "value":3, "amount":2},
        {"letter":"C", "value":3, "amount":2},
        {"letter":"D", "value":2, "amount":4},
        {"letter":"E", "value":1, "amount":12},
        {"letter":"F", "value":4, "amount":2},
        {"letter":"G", "value":2, "amount":3},
        {"letter":"H", "value":4, "amount":2},
        {"letter":"I", "value":1, "amount":9},
        {"letter":"J", "value":8, "amount":1},
        {"letter":"K", "value":5, "amount":1},
        {"letter":"L", "value":1, "amount":4},
        {"letter":"M", "value":3, "amount":2},
        {"letter":"N", "value":1, "amount":5},
        {"letter":"O", "value":1, "amount":8},
        {"letter":"P", "value":3, "amount":2},
        {"letter":"Q", "value":10, "amount":1},
        {"letter":"R", "value":1, "amount":6},
        {"letter":"S", "value":1, "amount":4},
        {"letter":"T", "value":1, "amount":6},
        {"letter":"U", "value":1, "amount":4},
        {"letter":"V", "value":4, "amount":2},
        {"letter":"W", "value":4, "amount":2},
        {"letter":"X", "value":8, "amount":1},
        {"letter":"Y", "value":4, "amount":2},
        {"letter":"Z", "value":10, "amount":1},
        {"letter":"Blank", "value":0, "amount":2}
    ],
};
// "creator":"Ramon Meza"

// var x = 1;
var totalScore = 0;


function makeDrag(){    // responsible for making tiles draggable and creating droppable points

    $( ".tile" ).draggable({
        revertDuration: 800,
        start: function( event, ui ) {
          $( ".tile" ).draggable( "option", "revert", true );
          $(ui.droppable).removeClass("filled"); // used to help in assigning droppable as filled or empty
        }
      });

    $( ".boardPoint" ).droppable({
        drop: function( event, ui ) {
            ui.draggable
            $(ui.draggable).removeClass("onRack"); // used to help in assigning draggable as on the rack or board
            $(ui.draggable).addClass("onBoard"); // used to help in assigning draggable as on the rack or board
            $(this).addClass("bFilled"); // used to help in assigning droppable as filled or empty
            $(this).removeClass("bEmpty"); // used to help in assigning droppable as filled or empty
            $( ".tile" ).draggable( "option", "revert", false );
            $(ui.draggable).detach().css({top: 0,left: 0}).appendTo(this);
            $(this).droppable('option', 'accept', ui.draggable); // makes it so droppable can only hold one draggable
        },
        out: function(event, ui){
            $(this).removeClass("bFilled"); // used to help in assigning droppable as filled or empty
            $(this).addClass("bEmpty"); // used to help in assigning droppable as filled or empty
            $(this).droppable('option', 'accept', '.tile');
        }
    })

    $( ".snapPoint" ).droppable({
        drop: function( event, ui ) {
            $(ui.draggable).removeClass("onBoard");
            $(ui.draggable).addClass("onRack");
            $(this).addClass("filled");
            $(this).removeClass("empty");
            $( ".tile" ).draggable( "option", "revert", false );
            $(ui.draggable).detach().css({top: 0,left: 0}).appendTo(this);
            $(this).droppable('option', 'accept', ui.draggable);
        },
        out: function(event, ui){
            $(this).removeClass("filled");
            $(this).addClass("empty");
            $(this).droppable('option', 'accept', '.tile');
        }
    })
};


$("button#submit").click(function() { // used to handle submission of tiles on board
    var numBoardFilled = ($('#boardPieces .bFilled').length); // finds number of spots on the board filled
    var wordScore = 0;

    var onBoard = document.getElementsByClassName("onBoard");

    for(var i = 0; i < numBoardFilled; i++){ // iterates proper amount of times to give appropriate score
        var str = onBoard[i].id;    // used to get id of specific element for score keeping
        var id = str.replace('tile', '');

        var found = obj.pieces.find((element) => element.letter == id);

        if(i == 5){ // gives double letter score to fifth place on board
            wordScore += (found.value * 2)
        } else{
        wordScore += found.value;
        }
    }

    if(numBoardFilled >= 2){ // gives double word score for second spot on board
        wordScore *= 2;
    }

    totalScore += wordScore;
    document.getElementById("wordScore").innerHTML = "Word Score: " + wordScore;
    document.getElementById("totalScore").innerHTML = "Total Score: " + totalScore;

    $('.onBoard').remove();

    $("#boardSpot1").removeClass("bFilled"); // used to reset board values back to blank after submission
    $("#boardSpot1").addClass("bEmpty");
    $("#boardSpot1").droppable('option', 'accept', '.tile');
    $("#boardSpot2").removeClass("bFilled");
    $("#boardSpot2").addClass("bEmpty");
    $("#boardSpot2").droppable('option', 'accept', '.tile');
    $("#boardSpot3").removeClass("bFilled");
    $("#boardSpot3").addClass("bEmpty");
    $("#boardSpot3").droppable('option', 'accept', '.tile');
    $("#boardSpot4").removeClass("bFilled");
    $("#boardSpot4").addClass("bEmpty");
    $("#boardSpot4").droppable('option', 'accept', '.tile');
    $("#boardSpot5").removeClass("bFilled");
    $("#boardSpot5").addClass("bEmpty");
    $("#boardSpot5").droppable('option', 'accept', '.tile');
    $("#boardSpot6").droppable('option', 'accept', '.tile');
    $("#boardSpot6").removeClass("bFilled");
    $("#boardSpot6").addClass("bEmpty");
    $("#boardSpot6").droppable('option', 'accept', '.tile');
    $("#boardSpot7").removeClass("bFilled");
    $("#boardSpot7").addClass("bEmpty");
    $("#boardSpot7").droppable('option', 'accept', '.tile');

    newPieces();
});

$("button#newGame").click(function() { // new game button
    location.reload();
});


$( function() {
    makeDrag();
});

function newPieces() {  // function for adding new pieces to rack
    var number; // decides what random piece to get
    var numTileNeeded = Math.abs($('#pieces .filled').length - 7);  // finds number of tiles needed
    var numSpaces = ($('#pieces .filled').length); // finds number of spaces left
    var numTilesInBag = 0; // counts to see how many tiles left in bag

    for(var i = 0; i < 27; i++){ // count num tiles in bag
        numTilesInBag += obj.pieces[i].amount;
    }

    if(numTilesInBag > 7){  // if theres more than 7 left continue else notify player no more pieces
    if(numSpaces == 0){ // generation for blank board
        for(var i = 0; i < numTileNeeded; i++){
            number = parseInt(Math.random() * (26 - 0) + 0);

            if(obj.pieces[number].amount > 0){
                $("div#holderPiece" + (i + 1)).append("<img id='tile" + obj.pieces[number].letter +"' class='" + "tile onRack" + "'" + "src='Scrabble_Tiles/Scrabble_Tile_" + obj.pieces[number].letter + ".jpg'" + "'>" + "</img>");
                var destination = $('.snapPoint').offset().top;
                var x = document.getElementById("tile" + obj.pieces[number].letter);
                $("div#holderPiece" + (i + 1)).droppable('option', 'accept', x);
                $('.tile').css({top: destination.top, left: destination.left}); 

                obj.pieces[number].amount = (obj.pieces[number].amount - 1);

                makeDrag();

                $("#holderPiece1").addClass("filled"); // used to reset rack values back to blank after submission
                $("#holderPiece1").removeClass("empty");
                $("#holderPiece1").droppable('option', 'accept', '.tile');

                $("#holderPiece2").addClass("filled");
                $("#holderPiece2").removeClass("empty");
                $("#holderPiece2").droppable('option', 'accept', '.tile');

                $("#holderPiece3").addClass("filled");
                $("#holderPiece3").removeClass("empty");
                $("#holderPiece3").droppable('option', 'accept', '.tile');

                $("#holderPiece4").addClass("filled");
                $("#holderPiece4").removeClass("empty");
                $("#holderPiece4").droppable('option', 'accept', '.tile');

                $("#holderPiece5").addClass("filled");
                $("#holderPiece5").removeClass("empty");
                $("#holderPiece5").droppable('option', 'accept', '.tile');

                $("#holderPiece6").addClass("filled");
                $("#holderPiece6").removeClass("empty");
                $("#holderPiece6").droppable('option', 'accept', '.tile');

                $("#holderPiece7").addClass("filled");
                $("#holderPiece7").removeClass("empty");
                $("#holderPiece7").droppable('option', 'accept', '.tile');
            } else {
                i--;
            }
        }
    } else if(numSpaces == 7){ // dont do anything if board is filled

    } else { // generation for missing pieces
        var emptyElement = document.getElementsByClassName("empty"); // find all empty spots on rack

        for(var i = 0; i < numTileNeeded; i++){ // for that amount choose random pieces that are avaliable
            number = parseInt(Math.random() * (26 - 0) + 0);

            if(obj.pieces[number].amount > 0){
                $("div#" + emptyElement[i].id).append("<img id='tile" + obj.pieces[number].letter +"' class='" + "tile onRack" + "'" + "src='Scrabble_Tiles/Scrabble_Tile_" + obj.pieces[number].letter + ".jpg'" + "'>" + "</img>");
                var destination = $('.snapPoint').offset().top;
                $('.tile').css({top: destination.top, left: destination.left}); 

                // var x = document.getElementById("tile" + obj.pieces[number].letter);
                // $("div#holderPiece" + (i + 1)).droppable('option', 'accept', x);

                obj.pieces[number].amount = (obj.pieces[number].amount - 1);

                makeDrag();
            } else {
                i--;
            }
        }
        $("#holderPiece1").addClass("filled"); // used to reset rack values back to blank after submission
        $("#holderPiece1").removeClass("empty");
        $("#holderPiece1").droppable('option', 'accept', '.tile');

        $("#holderPiece2").addClass("filled");
        $("#holderPiece2").removeClass("empty");
        $("#holderPiece2").droppable('option', 'accept', '.tile');

        $("#holderPiece3").addClass("filled");
        $("#holderPiece3").removeClass("empty");
        $("#holderPiece3").droppable('option', 'accept', '.tile');

        $("#holderPiece4").addClass("filled");
        $("#holderPiece4").removeClass("empty");
        $("#holderPiece4").droppable('option', 'accept', '.tile');

        $("#holderPiece5").addClass("filled");
        $("#holderPiece5").removeClass("empty");
        $("#holderPiece5").droppable('option', 'accept', '.tile');

        $("#holderPiece6").addClass("filled");
        $("#holderPiece6").removeClass("empty");
        $("#holderPiece6").droppable('option', 'accept', '.tile');

        $("#holderPiece7").addClass("filled");
        $("#holderPiece7").removeClass("empty");
        $("#holderPiece7").droppable('option', 'accept', '.tile');

    }
} else {
    document.getElementById("bagAlert").innerHTML = "Out Of Pieces";
}
}

$(function(){
    newPieces();
});