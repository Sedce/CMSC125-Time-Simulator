var canvas = document.getElementById("myCanvas");
var User_header = document.getElementById("UserHeader");
var Resource_header = document.getElementById("ResourceHeader");
var context = canvas.getContext("2d");
var counter = 0;
//objects
function Resource(name){
	this.number = name;
	this.isUsed = false;
}
function User(name){
	this.number =  name;
	this.resourceUsed = [];
	this.timeUsed = [];
	this.isActive = false;
	this.queueResource = function(name, duration){
		var temp = this.resourceUsed.length;
		for(trav = 0; trav<temp; trav++){
			if(name == this.resourceUsed[trav]){
				return true;
			}
		}
		this.resourceUsed.push(name);
		this.timeUsed.push(duration);
		return false;
	}
}
function Randomizer(max){
	var temp = Math.floor((Math.random() * max) + 1);
	return temp;
}
var resources = [];
var temp = Randomizer(30);
for(i = 0; i < temp; i++){
	resources.push(new Resource(i+1));
}
//users initialization
var users = [];
var temp2 = Randomizer(30);
for(i = 0; i < temp2; i++){
	users.push(new User(i+1));
}
for(ctr = 0; ctr < temp2; ctr++){
	var usingRes = Randomizer(temp);
	for(x = 0; x<usingRes; x++){
		do{
			var temp3 = Randomizer(temp);
			var temp4 = Randomizer(30);
			var answer = users[ctr].queueResource(temp3, temp4);
		}while(answer);
	}
}
//loop for users made as a function to ensure that the the clear function and this function won't overlap
function displayUsers(){
	var text = "";
	var text2 = "";
	for(r = 0; r<temp2; r++){
		  context.strokeStyle = "#000";
			context.fillStyle = "black";
			context.fillText("User: " + users[r].number,250,60+(r*20));
		//	if(count == 0){
			//var para = document.createElement("P");
	    text = "User: " + users[r].number;
	//	}
			//text = "User: " + users[r].number + "<br>";
		if(users[r].isActive && users[r].resourceUsed.length > 0 ){//if user is active
			context.fillStyle = "#ff3333";
			context.fillText("Using Resource:" + users[r].resourceUsed[0] + " (" + users[r].timeUsed[0] + ")",350,60+(r*20));
			text += "Using Resource:" + users[r].resourceUsed[0] + " (" + users[r].timeUsed[0] + ")" ;
		}
		else if(users[r].resourceUsed.length > 0){
			context.fillStyle = "#ff3333";
			context.fillText("Waiting for: Resource "+users[r].resourceUsed[0] ,350,60+(r*20));
			text += "Waiting for: Resource "+users[r].resourceUsed[0] ;
		}
		else{
			context.fillStyle = "#FFFFFF";//...make it blue
			context.fillRect(350,50+(r*20), 40,10);
		}
		var para = document.createElement("P");
		var t = document.createTextNode(text);
		para.appendChild(t);
		document.getElementById("areas1").appendChild(para);
		context.fillStyle = "#bbb";

	}
	console.log("before");
	return true;
}
function emptyDIV(){
	$('#areas1').empty();
	 console.log("after");
}
//main loop
//let removeElements = elms => Array.from(elms).forEach(el => el.remove());
function Time(){
	//logic
	for(c = 0; c<temp2; c++){
		if(users[c].resourceUsed.length > 0){
			if(resources[(users[c].resourceUsed[0])-1].isUsed == false){
				users[c].isActive = true;
				resources[(users[c].resourceUsed[0])-1].isUsed = true;//and set the resources to used
				if(users[c].timeUsed[0]> 0){//if timer is not et 0, countdown continues
					users[c].timeUsed[0]--;
				}
				else{
					users[c].resourceUsed.shift();
					users[c].timeUsed.shift();
				}
			}else{
				users[c].isActive = false;
			}
		}
		else
			users[c].isActive = false;
	}

	//UI
	context.fillStyle = "#FFFFFF";
	context.fillRect(0,0,500,700);
	context.fillStyle = "black";
	context.font = "30px Arial";
	//Header UI
	Resource_header.innerHTML = "Resources(" + temp + ")";
	User_header.innerHTML = "Users(" + temp2 + ")";
	//context.fillText("Resources(" + temp + ")" ,10,40);
	//context.fillText("Users(" + temp2 + ")" ,250,40);
	//users area
	context.font = "12px Arial";
	//var user_list = document.getElementById('list_of_users');
	//setInterval(displayUsers, 500);
	counter += 1;
	//setInterval(emptyDIV, 500);
	 $.when(setInterval(displayUsers, 1000)).then(setInterval(emptyDIV(),500));
	//displayUsers();
	//this removes elements
	//document.getElementById("list_of_users").innerHTML = text;
	//document.getElvar para = document.createElement("P");
  //  var t = document.createTextNode("This is a paragraph.");
    //para.appendChild(t);ementById("resources_used_byUser").innerHTML = text2;
	//resource area
	context.font = "12px Arial";
	for(r = 0; r<temp; r++){
		context.fillText("resource " + resources[r].number,10,60+(r*20));
		if(resources[r].isUsed){
			context.fillStyle = "#ffd700";//...make it RED
			context.fillText("Used",100,60+(r*20));
			 context.strokeStyle = "black";
					 context.stroke();
		}
		else{
			context.fillStyle = "#ff7f50";//...green is good
			context.fillText("Free",100,60+(r*20));
		}
		context.fillStyle = "black";
	}
	for(r = 0; r<temp; r++){
		resources[r].isUsed = false;
	}
//emptydiv();
}
//the main loop
setInterval(displayUsers, 5000)
setInterval(Time, 500);
