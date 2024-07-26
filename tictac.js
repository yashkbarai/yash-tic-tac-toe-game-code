let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#reset-btn");
let newbtn = document.querySelector("#new-btn");
let msgcontainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turn0 = true; //player0, playerX

const winpattern = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

const resetgame = () => {
    turn0 = true;
    enableboxes();
    msgcontainer.classList.add("hide");
    resetbtn.style.display = 'none';  // Hide the reset button initially
}

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        console.log("the box was clicked");
        if (turn0) {
            box.innerText = "O";
            turn0 = false;
        } else {
            box.innerText = "X";
            turn0 = true;
        }
        box.disabled = true;

        checkwinner();
    });
});

const disableboxes = () =>{
    for (let box  of boxes){
        box.disabled = true;
    }
}

const enableboxes = () =>{
    for (let box  of boxes){
        box.disabled = false;
        box.innerText = "";
    }
}

const showWinner = (winner) => {
    msg.innerText = `Congratulations, the winner is : ${winner}`;
    msgcontainer.classList.remove("hide");
    disableboxes ();
    resetbtn.style.display = 'none';  // Hide the reset button
}

const showDraw = () => {
    msg.innerText = `It's a draw!`;
    msgcontainer.classList.remove("hide");
    disableboxes();
    resetbtn.style.display = 'none';  // Hide the reset button
}

const checkwinner = () => {
    for (let pattern of winpattern) {
        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;

        if(pos1val != ""&& pos2val != ""&& pos3val != ""){
            if(pos1val === pos2val && pos2val === pos3val){
                console.log("winner", pos1val);
                showWinner(pos1val);
            } else if ([...boxes].every(box => box.innerText !== "")) {
                showDraw();
                // resetbtn.remove("#reset-btn");
            }
           
        }
        
    }
};

newbtn.addEventListener("click", resetgame);
resetbtn.addEventListener("click", resetgame)
