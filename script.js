//seclect all docment
let boxes = document.querySelectorAll(".box");
let restBtn = document.querySelector("#reset-btn");
let newGamebtn = document.querySelector("#new-game");
let msgContainer = document.querySelector(".msg-contaner");
let msg = document.querySelector("#msg");

let turno = true;

// winning arr 
const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],

];


let clickSound = new Audio("click-sound.mp3"); // for add sound click sound
//to change the inner html and write ii box 
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        console.log("box was clicked")

        clickSound.currentTime = 0;
        clickSound.play();

        if (turno) {
            box.innerHTML = "o";
            turno = false;

        }
        else {
            box.innerHTML = "x";
            turno = true;
        }
        box.disabled = true;

        checkWinner();
    });
});

let winSound = new Audio("sound.mp3"); // for add congratulation sound 
// to show the congratulation message to winner 
const showWinner = (winner) => {
    msgContainer.classList.remove("hide");
    winSound.play();
    disabledBoxes();
}


// disable button for new game 
const disabledBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
}
// enable button for new game 
const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = ""
    }
}


// winner checker function 
const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                console.log("winner", pos1Val);

                showWinner(pos1Val);
            }
        }

    }
};

// reset button function 
const resetGame = () => {
    turno = true;
    enableBoxes();
    msgContainer.classList.add("hide");
    clickSound.currentTime = 0;
    clickSound.play();


    winSound.pause();        // stop sound
    winSound.currentTime = 0;
}

// add event on button 
newGamebtn.addEventListener("click", resetGame)
restBtn.addEventListener("click", resetGame)

// program end here 