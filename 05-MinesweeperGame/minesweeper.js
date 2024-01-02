let board = []; //2D Array
let rows = 9;
let columns = 9;

let minesCount = 10; // For Beginner Level
let minesLocation = []; // Random Locations (IDs===> tile's coordinates)


//Tracking Clicked Tiles
let tilesClicked = 0; //Goal===> To click all tiles except the ones containing mines (81 - 10 = 71)
let flagEnabled = false; // whenever I click on the flag button it's gonna altrnate between true & false

let gameOver = false; // When we click on any mine so (true) ==> game over

window.onload = function() {
    startGame();
}



// Generate Mines And Put Them On The Board Randomly
function setMines() {
    // minesLocation.push("3-4");
   

    let minesLeft = minesCount; // to keep track how many mines are left to be placed on the board 
    while (minesLeft > 0) { 
        let r = Math.floor(Math.random() * rows);
        let c = Math.floor(Math.random() * columns);
        let id = r.toString() + "-" + c.toString();

        if (!minesLocation.includes(id)) {
            minesLocation.push(id);
            minesLeft -= 1; // ones mine has successfully placed
        }
    }//END while Loop
}// END setMines()

// #########################################################################


// Draw The tiles within the board div
function startGame() {
    document.getElementById("mines-count").innerText = minesCount;
    document.getElementById("flag-button").addEventListener("click", setFlag);
    setMines();

    //Draw The board
    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < columns; c++) {


            let tile = document.createElement("div"); // create <div id="r-c"></div>
            tile.id = r.toString() + "-" + c.toString(); // Put The ID for each div(tile)
            tile.addEventListener("click", clickTile); // Make the tiles clickble
            document.getElementById("board").append(tile); //effectively adds each tile to the game board, arranging them in a row-wise manner.(visual representation)
            row.push(tile);
        }
        board.push(row); // push them row by row
    }

    console.log(board); // print the board

} //END startGame() 
// #########################################################################

/* Add event to the flag button, Alternating between active || inactive state*/
function setFlag() {
    if (flagEnabled) {
        // Turn It OFF
        flagEnabled = false;
        document.getElementById("flag-button").style.backgroundColor = "#000";
    }
    else {
        // Turn It ON
        flagEnabled = true;
        document.getElementById("flag-button").style.backgroundColor = "#006400";
    }
} // END setFlag()


// #########################################################################

// Add Flags To The Board Depending On tile's state & flagEnabled(the button is clicked)
function clickTile() {
    if (gameOver || this.classList.contains("tile-clicked")) {
        return;
    }

    let tile = this; // this refers to the tiles that was clicked

    if (flagEnabled) {

        if (tile.innerText == "") { // means has not clicked yet
            tile.innerText = "🚩";
        }
        else if (tile.innerText == "🚩") { // if we wanna remove it
            tile.innerText = "";
        }
        return;
    }

// ====================================================================

// Check If The Tile That Was Clicked Is One Of (minesLocation) depending on it's ID that represent it's location on the board
    if (minesLocation.includes(tile.id)) {
        showAlert("🎮😵❌ GAME OVER ❌😵🎮"); // Messge Alert The You Lost
        gameOver = true; // End The Game
        ShowMines(); // Show Mines On The Board
        return;
    }

// else if we didn't hit a mine we want to see
// how many mines are nearby

    let coords = tile.id.split("-"); // "4-4" ===> ["4", "4"]
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);
    checkMine(r, c);

} // END setFlag()


// #########################################################################

// Showing The Mines Location On The Board After Game Is Over
function ShowMines() {
    for (let r= 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let tile = board[r][c];
            if (minesLocation.includes(tile.id)) {
                tile.innerText = "💣";
                tile.style.backgroundColor = "red";                
            }
        }
    }
} // END PutMines()


// #########################################################################

function checkMine(r, c) {

    // We wanna check to make sure that the row and coloumn are within the boundaries of the board
    if (r < 0 || r >= rows || c < 0 || c >= columns) {
        return; // Out Of Range
    }

    if (board[r][c].classList.contains("tile-clicked")) {
        return;// it is clicked so it is not a mine , don't check twice
    }

    board[r][c].classList.add("tile-clicked");
    tilesClicked += 1;

    let minesFound = 0;

    /* Checking The clicked tile's neighbours on the board*/
    //top 3 tiles
    minesFound += checkTile(r-1, c-1);      //top left
    minesFound += checkTile(r-1, c);        //top 
    minesFound += checkTile(r-1, c+1);      //top right

    //left and right tiles
    minesFound += checkTile(r, c-1);        //left
    minesFound += checkTile(r, c+1);        //right

    //bottom 3 tiles
    minesFound += checkTile(r+1, c-1);      //bottom left
    minesFound += checkTile(r+1, c);        //bottom 
    minesFound += checkTile(r+1, c+1);      //bottom right

    // ====================================================================
    if (minesFound > 0) { // we have at least one mine
        board[r][c].innerText = minesFound; // print the number on the board depending on the numbers of mines
        board[r][c].classList.add("num" + minesFound.toString()); // change tile background color depending on the number
    }
    else {
        //check empty tiles (there are no mines nearby) to expand them (recursion)
        board[r][c].innerText = "";
        
        //top 
        checkMine(r-1, c-1);    //top left
        checkMine(r-1, c);      //top
        checkMine(r-1, c+1);    //top right

        //left and right
        checkMine(r, c-1);      //left
        checkMine(r, c+1);      //right

        //bottom 
        checkMine(r+1, c-1);    //bottom left
        checkMine(r+1, c);      //bottom
        checkMine(r+1, c+1);    //bottom right
    }

    // we wanna make sure that we don't click on a tile that has already been revealed (don't check the same tile twice)
    if (tilesClicked == rows * columns - minesCount) {// that means we clicked on every single tile except the ones containing mines (GOAL STATE) ====> YOU WIN
        showAlert("👏🎉🥳Congratiolations, YOU WIN🥳🎉👏")
    }
} // END CheckMine()


// #########################################################################

// This Function Will Be Called Many Times Because We Wanna Check For Out Of Bounds(Empty Tiles)
function checkTile(r, c) {
    if (r < 0 || r >= rows || c < 0 || c >= columns) {
        return 0; // out od range
    }
    
    if (minesLocation.includes(r.toString() + "-" + c.toString())) {
        return 1; // check if any neighbor is a mine
    }

    return 0;

}// END check Tiles

// #########################################################################

function showAlert(message) {
    const customAlert = document.getElementById("my-custom-alert-box");
    const customAlertMessage = document.getElementById("my-alert-message");
    const playAgainButton = document.getElementById("play-again-button");
  
    customAlertMessage.textContent = message;
    customAlert.style.display = "block";
 
  
    playAgainButton.onclick = function () {
      // Reload the page to start the game again
      location.reload();
    };


  }
  

  