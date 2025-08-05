var randomnumber1 = Math.floor(Math.random()*6)+1;

var randomdiceimage = "dice" + randomnumber1 + ".png";

var randomSoourceimage = "images/" + randomdiceimage;

var image1 = document.querySelectorAll("img")[0];

image1.setAttribute("src",randomSoourceimage);

var randomnumber2 = Math.floor(Math.random()*6)+1;

var randomdiceimage = "dice" + randomnumber2 + ".png";

var randomSoourceimage = "images/" + randomdiceimage;

var image2 = document.querySelectorAll("img")[1];

image2.setAttribute("src",randomSoourceimage);

if (randomnumber1>randomnumber2){
	document.querySelector("h1").innerHTML="shaik wins";
}
else if(randomnumber1<randomnumber2){
	document.querySelector("h1").innerHTML="Ayan wins";
}
else{
	document.querySelector("h1").innerHTML="DRAW!";
}