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
    $( ".tile" ).draggable({
    snap: ".snapPoint",
    snapMode: "inner",
    drag: function(event, ui) {
        $(this).removeClass("onRack");
        $(this).addClass("offRack");
    }
    });

    $( ".snapPoint" ).droppable({snap: true,
        drop: function(event, ui) {
            $(ui.draggable).removeClass("offRack");
            $(ui.draggable).addClass("onRack");
        }
    });

    $( ".boardPoint" ).droppable({snap: true,
        drop: function(event, ui) {
            $(ui.draggable).removeClass("offRack");
            $(ui.draggable).removeClass("onRack");
            $(ui.draggable).addClass("onBoard");
            $("#" + ui.draggable.attr("id")).detach().appendTo("#boardSpot1");
            // alert();
        },
    });

    $( ".boardSnapPoint" ).droppable({snap: true});
}

$("#holderPiece1").droppable({
    drop: function(event, ui) {
        $("#holderPiece1").addClass("Occupied");
    }
  });


$("button#newPieces").click(function() {
    var letters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","Blank"]
    var number;
    $('.onRack').remove();
    var numTileNeeded = Math.abs($('#pieceHolder .onRack').length - 7);
    

    if($('#pieceHolder .onRack').length == 7){
        // var location = document.getElementsByClassName("onRack");
        for(var i = 0; i < numTileNeeded; i++){
            number = parseInt(Math.random() * (27 - 0) + 0);
            $("div#pieceImage").append("<img id='tile" + letters[number] +"' class='" + "tile onRack" + "'" + "src='Scrabble_Tiles/Scrabble_Tile_" + letters[number] + ".jpg'" + "'>" + "</img>");
            var destination = $('.snapPoint').offset().top;
            $('.tile').css({top: destination.top, left: destination.left}); 
            makeDrag();
        }
    } else {
        for(var i = 0; i < numTileNeeded; i++){
            number = parseInt(Math.random() * (27 - 0) + 0);
            $("div#pieceImage").append("<img id='tile" + letters[number] +"' class='" + "tile onRack" + "'" + "src='Scrabble_Tiles/Scrabble_Tile_" + letters[number] + ".jpg'" + "'>" + "</img>");
            var destination = $('.snapPoint').offset().top;
            $('.tile').css({top: destination.top, left: destination.left}); 
            makeDrag();
        }
    }
});

$("button#newGame").click(function() {
    location.reload();
});


$( function() {
    makeDrag();
});