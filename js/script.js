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
const obj = 
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

var x = 1;
var totalScore = 0;

function makeDrag(){

    $( ".tile" ).draggable({
        revertDuration: 800,
        start: function( event, ui ) {
          $( ".tile" ).draggable( "option", "revert", true );
          $(ui.droppable).removeClass("filled");
        }
      });

    $( ".boardPoint" ).droppable({
        drop: function( event, ui ) {
            ui.draggable
            $(ui.draggable).removeClass("onRack");
            $(ui.draggable).addClass("onBoard");
            $(this).addClass("bFilled");
            $(this).removeClass("bEmpty");
            $( ".tile" ).draggable( "option", "revert", false );
            $(ui.draggable).detach().css({top: 0,left: 0}).appendTo(this);
        },
        out: function(event, ui){
            $(this).removeClass("bFilled");
            $(this).addClass("bEmpty");
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
        },
        out: function(event, ui){
            $(this).removeClass("filled");
            $(this).addClass("empty");
        }
    })
};

$("button#newPieces").click(function() {
    var number;
    // $('.onRack').remove();
    var numTileNeeded = Math.abs($('#pieces .filled').length - 7);
    var numSpaces = ($('#pieces .filled').length);
    var numTilesInBag = 0;

    // console.log(x + ".");
    // x++;
    // console.log("numSpaces: " + numSpaces);
    // console.log("numTileNeeded: " + (numTileNeeded));
    // console.log("empty tiles: " + $(".empty").id);


    for(var i = 0; i < 27; i++){
        numTilesInBag += obj.pieces[i].amount;
    }
    // console.log("numTilesInBag: " + numTilesInBag);

    if(numTilesInBag > 7){
    if(numSpaces == 0){
        for(var i = 0; i < numTileNeeded; i++){
            number = parseInt(Math.random() * (26 - 0) + 0);

            if(obj.pieces[number].amount > 0){
                $("div#holderPiece" + (i + 1)).append("<img id='tile" + obj.pieces[number].letter +"' class='" + "tile onRack" + "'" + "src='Scrabble_Tiles/Scrabble_Tile_" + obj.pieces[number].letter + ".jpg'" + "'>" + "</img>");
                var destination = $('.snapPoint').offset().top;
                $('.tile').css({top: destination.top, left: destination.left}); 

                obj.pieces[number].amount = (obj.pieces[number].amount - 1);

                makeDrag();

                $("#holderPiece1").addClass("filled");
                $("#holderPiece1").removeClass("empty");
                $("#holderPiece2").addClass("filled");
                $("#holderPiece2").removeClass("empty");
                $("#holderPiece3").addClass("filled");
                $("#holderPiece3").removeClass("empty");
                $("#holderPiece4").addClass("filled");
                $("#holderPiece4").removeClass("empty");
                $("#holderPiece5").addClass("filled");
                $("#holderPiece5").removeClass("empty");
                $("#holderPiece6").addClass("filled");
                $("#holderPiece6").removeClass("empty");
                $("#holderPiece7").addClass("filled");
                $("#holderPiece7").removeClass("empty");
            } else {
                i--;
            }
        }
    } else if(numSpaces == 7){

    } else {
        // console.log(document.getElementsByClassName("empty"));

        var emptyElement = document.getElementsByClassName("empty");

        console.log(emptyElement[0].id);

        for(var i = 0; i < numTileNeeded; i++){
            number = parseInt(Math.random() * (26 - 0) + 0);

            if(obj.pieces[number].amount > 0){
                $("div#" + emptyElement[i].id).append("<img id='tile" + obj.pieces[number].letter +"' class='" + "tile onRack" + "'" + "src='Scrabble_Tiles/Scrabble_Tile_" + obj.pieces[number].letter + ".jpg'" + "'>" + "</img>");
                var destination = $('.snapPoint').offset().top;
                $('.tile').css({top: destination.top, left: destination.left}); 

                obj.pieces[number].amount = (obj.pieces[number].amount - 1);

                makeDrag();
            } else {
                i--;
            }
        }
        $("#holderPiece1").addClass("filled");
        $("#holderPiece1").removeClass("empty");
        $("#holderPiece2").addClass("filled");
        $("#holderPiece2").removeClass("empty");
        $("#holderPiece3").addClass("filled");
        $("#holderPiece3").removeClass("empty");
        $("#holderPiece4").addClass("filled");
        $("#holderPiece4").removeClass("empty");
        $("#holderPiece5").addClass("filled");
        $("#holderPiece5").removeClass("empty");
        $("#holderPiece6").addClass("filled");
        $("#holderPiece6").removeClass("empty");
        $("#holderPiece7").addClass("filled");
        $("#holderPiece7").removeClass("empty");
    }
}
});

$("button#submit").click(function() {
    var numBoardFilled = ($('#boardPieces .bFilled').length);
    // console.log("numBoardFilled: " + numBoardFilled);
    var wordScore = 0;

    var onBoard = document.getElementsByClassName("onBoard");

    for(var i = 0; i < numBoardFilled; i++){
        var str = onBoard[i].id;
        var id = str.replace('tile', '');
        // console.log( "id: " + id);

        var found = obj.pieces.find((element) => element.letter == id);

        if(i == 5){
            wordScore += (found.value * 2)
        } else{
        wordScore += found.value;
        }
        // console.log( found.letter + " " + found.value);
    }

    if(numBoardFilled >= 2){
        wordScore *= 2;
    }

    totalScore += wordScore;
    document.getElementById("wordScore").innerHTML = "Word Score: " + wordScore;
    document.getElementById("totalScore").innerHTML = "Total Score: " + totalScore;

    $('.onBoard').remove();

    $("#boardSpot1").removeClass("bFilled");
    $("#boardSpot1").addClass("bEmpty");
    $("#boardSpot2").removeClass("bFilled");
    $("#boardSpot2").addClass("bEmpty");
    $("#boardSpot3").removeClass("bFilled");
    $("#boardSpot3").addClass("bEmpty");
    $("#boardSpot4").removeClass("bFilled");
    $("#boardSpot4").addClass("bEmpty");
    $("#boardSpot5").removeClass("bFilled");
    $("#boardSpot5").addClass("bEmpty");
    $("#boardSpot6").removeClass("bFilled");
    $("#boardSpot6").addClass("bEmpty");
    $("#boardSpot7").removeClass("bFilled");
    $("#boardSpot7").addClass("bEmpty");


});

$("button#newGame").click(function() {
    location.reload();
});


$( function() {
    makeDrag();
});