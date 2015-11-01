
var zombies = [];
var animate = [];
var attackHP = [];
var hp = 100;
var kills = 0;
var txt = document.createElement("p");
var killDisplay = document.createElement("p");
var but = document.createElement("button");
var t = document.createTextNode("Reset");
but.appendChild(t);
but.style.position = "absolute";
but.style.left = 600+'px';
but.style.top = 600+'px';
but.addEventListener("click",resetGame);
document.body.appendChild(but);
txt.innerHTML = "HP: " + hp;
txt.style.top = 550 + 'px';
txt.style.left= 0 + 'px';
txt.style.position = "absolute";
killDisplay.innerHTML = "Kills: " +kills;
killDisplay.style.top = 600+'px';
killDisplay.style.left = 0+'px';
killDisplay.style.position = "absolute";
document.body.appendChild(killDisplay);
function initialize(){
	for(var i =0; i<10; i++){
		zombies[i] = document.createElement("img");
		zombies[i].src = "images/zombie.gif";
		zombies[i].height = 50;
		zombies[i].width = 50;
		zombies[i].style.top = 50*i + 'px';
		zombies[i].addEventListener("click", update);
		zombies[i].style.left = 0 + 'px';
		zombies[i].hits = 0;
		zombies[i].i = i;
		//zombies[i].maxHits = Math.random()*1 + 1;
		//zombies[i].isAlive = true;
		
		animate[i] = 0;
		attackHP[i] = 0;
		moveRight(i);

		zombies[i].style.position = "absolute";
		document.body.appendChild(zombies[i]);
	}



document.body.appendChild(txt);
}
initialize();

function moveRight(i){
	clearTimeout(animate[i]);
	clearTimeout(attackHP[i]);
	if(parseInt(zombies[i].style.left)<600) {
		zombies[i].style.left = parseInt(zombies[i].style.left) + 1 + 'px';
		animate[i] = setTimeout(function() {moveRight(i);},10);
	}
	else {
		attackHP[i] = setTimeout(function() {attack(i);},1000);
	}
}

function update(){
	var a = event.target;
	///clearTimeout(attackHP[]);
	a.hits = 1;
	kills = kills+1;
	killDisplay.innerHTML = "Kills: " + kills;

	if(a.hits>=1){
		a.style.left = 0;
	}
	moveRight(a.i);
}

function resetGame(){
	for(var i =0; i <10; i++){
		zombies[i].style.top = 50*i + 'px';
		zombies[i].style.left = 0;
		hp = 100;
		kills = 0;
		clearTimeout(animate[i]);
		clearTimeout(attackHP[i]);
		moveRight(i);
	}
	txt.innerHTML = "HP: " + hp;
	killDisplay.innerHTML = "Kills: " + kills;
}

//function kill(i) {
//	zombies[i].style.top = 100;
//	zombies[i].style.left = 0;
//}

function attack(i){
	hp--;
	txt.innerHTML = "HP: " + hp;
	attackHP[i] = setTimeout(function() {attack(i);},1000);
	if(hp<=0) {
		txt.innerHTML = "HP: 0<br>GAME OVER";
	}
}