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

$.validator.addMethod("greaterThan", function (value, element, param) { // Function derived from https://stackoverflow.com/questions/29451507/how-to-use-jquery-validator-to-determine-value-of-one-field-is-greater-than-anot
    var $otherElement = $(param);
    return parseInt(value, 10) >= parseInt($otherElement.val(), 10);
});

$.validator.addMethod("noDecimal", function(value, element) { // Function derived from https://code-cocktail.in/ultimate-tweets/decimal-numbers-jquery-validation/
    return !(value % 1);
});


$("#formValidation").validate({ // Validation for inputs for the multiplication table. Makes the fields 
                                // required, in the range of -50 to 50, not a decimal, and be proper amount
    rules:{                     // compared to other input fields.
    minCol:{
        required: true,
        range: [-50, 50],
        noDecimal: true
    },
    maxCol:{
        required: true,
        range: [-50, 50],
        greaterThan: "#minCol",
        noDecimal: true
    },
    minRow:{
        required: true,
        range: [-50, 50],
        noDecimal: true
    },
    maxRow:{
        required: true,
        range: [-50, 50],
        greaterThan: "#minRow",
        noDecimal: true
    },

    },
    messages: { // Error messages for each corresponding error type.
        minCol:{
            required: "Field has been left blank. Enter an integer value.",
            range: "Input must be between -50 and 50",
            noDecimal: "Input needs to be an integer not a decimal.",
        },
        maxCol:{
            required: "Field has been left blank. Enter an integer value.",
            range: "Input must be between -50 and 50",
            greaterThan: "Max column must be greater than minimum column. To fix make it greater than minimum column.",
            noDecimal: "Input needs to be an integer not a decimal.",
        },
        minRow:{
            required: "Field has been left blank. Enter an integer value.",
            range: "Input must be between -50 and 50",
            noDecimal: "Input needs to be an integer not a decimal.",
        },
        maxRow:{
            required: "Field has been left blank. Enter an integer value.",
            range: "Input must be between -50 and 50",
            greaterThan: "Max row must be greater than minimum row. To fix make it greater than minimum row.",
            noDecimal: "Input needs to be an integer not a decimal.",
        },
    },

    submitHandler: function(form) {
    // Responsible for creating table after all validation is passed.
    submitTable();
    }
});

function submitTable(){
var minCol = Number(document.getElementById("minCol").value); // takes inputs from text box in HTML and
var maxCol = Number(document.getElementById("maxCol").value); // assigns it to a JS variable as a Number
var minRow = Number(document.getElementById("minRow").value);
var maxRow = Number(document.getElementById("maxRow").value);    


const tblBody = document.getElementById("table");

    tblBody.innerHTML = ""; // clears table
    for (let i = minRow; i < maxRow + 2; i++) {
        const row = document.createElement("tr");

        if (i === minRow) { // if we are creating the first row the first element will be a 'x'
            const cell = document.createElement("th");
            const cellText = document.createTextNode('x');
            cell.appendChild(cellText);
            row.appendChild(cell);
        } else { // otherwise we start by writing the first appropriate column digit
            const cell = document.createElement("th");
            const cellText = document.createTextNode(i - 1);
            cell.appendChild(cellText);
            row.appendChild(cell);
        }

        for (let j = minCol; j < maxCol + 1; j++) { // creates the rows
            if (i === minRow) { // if we are writing the first row use th and write just the row values
                const cell = document.createElement("th");
                const cellText = document.createTextNode(j);
                cell.appendChild(cellText);
                row.appendChild(cell);
            } else { // otherwise write row with column digit multiplied by row
                const cell = document.createElement("td");
                const cellText = document.createTextNode((i - 1) * j);
                cell.appendChild(cellText);
                row.appendChild(cell);
            }
        }

        tblBody.appendChild(row);
    }

    document.getElementById("display").appendChild(tblBody);
};