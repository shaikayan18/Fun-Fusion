let boxes=document.querySelectorAll(".box");
let resetbtn=document.querySelector(".reset-btn");
let newgamebtn=document.querySelector(".new-btn");
let msgcontainer=document.querySelector(".msg-container");
let msg=document.querySelector("#msg");
let turn0 =true;
const winpatterns=[
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],

];
const reset=()=>{
    turn0=true;
    enabledbox();
    msgcontainer.classList.add("hide");
};
boxes.forEach((box) => {
    box.addEventListener("click", () =>{
        console.log("jeee");
        if(turn0==true){
            box.innerText="ayan";
            turn0=false;
        } else {
            box.innerText="shaik";
            turn0=true;
        }
        box.disabled=true;
        checkwinner();
    });

}
);
const disabledbox=()=>{
    for(let box of boxes){
    box.disabled=true;
}};
const enabledbox=()=>{
    for(let box of boxes){
    box.disabled=false;
    box.innerText="";
    }
};
const showWinner= (winner) => {
    msg.innerHTML=`congrats,Winner is ${winner}`;
    msgcontainer.classList.remove("hide");
    disabledbox();
};
const checkwinner = () => {
    for( let patterns of winpatterns){
    let pos1 = boxes[ patterns[0]].innerText;
    let pos2 = boxes[ patterns[1]].innerText;
    let pos3 = boxes[ patterns[2]].innerText;
    if (pos1!="" && pos2!="" && pos3!=""){
        if(pos1===pos2 && pos2===pos3){
        console.log("hi buddy",pos1);
        showWinner(pos1);
    }}
    }
};
resetbtn.addEventListener("click",reset);
newgamebtn.addEventListener("click",reset);
