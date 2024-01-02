var you; // User Choice
var computerChoice;


//choices for each agent
var USerchoices = ["rock", "paper", "scissors"];
var OPchoices = ["rightRock", "paper", "scissors"];



/*==================================== Playing ===============================================*/
function Game(userChoice) {
    // Hide the choices
    document.getElementById("choices").style.display = "none";

    //Get Your Choice From The DOM Obj.
    you = userChoice;
    document.getElementById("your-choice").src = you + ".svg";

    // Randomly select computerChoice's choice
    computerChoice = OPchoices[Math.floor(Math.random() * 3)];
    document.getElementById("computer-choice").src = computerChoice + ".svg";


    // Check for the winner
    var result = getResult(you, computerChoice);
    document.getElementById("result").innerText = result;


    // Display the game window
    document.querySelector(".Game-Window").style.display = "flex";
    document.querySelector("#play-again").style.display = "block";
} //END Game Func.


/*==================================== Checking ===============================================*/

function getResult(player, computer) {
    if ((player === computer) || ( (player == "rock") && (computer== "rightRock")) ){
        return "YOU TIED!";
    } else if ((player === "rock" && computer === "scissors") ||
        (player === "scissors" && computer === "paper") ||
        (player === "paper" && computer === "rock") ||  (player === "paper" && computer === "rightRock")) {
        return "YOU WIN!";
    } else {
        return "YOU LOST!";
    }
} // END getResult Func.

/*==================================== Play Again ===============================================*/

function resetGame() {
    // Clear the result
    document.getElementById("result").innerText = "";
    // Reset images
    document.getElementById("your-choice").src = "";
    document.getElementById("computer-choice").src = "";

    // Show the choices again
    document.getElementById("choices").style.display = "flex";

    // Hide the game window
    document.querySelector(".Game-Window").style.display = "none";
    document.querySelector("#play-again").style.display = "none";

} //END resetGame Func.