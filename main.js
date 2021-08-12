music = "";
rightW_x = 0;
rightW_y= 0; 
leftW_x = 0; 
leftW_y = 0; 
scoreRW = 0; 
scoreLW = 0;

function setup(){
c1 = createCanvas(550, 450);
c1.center();
v1 = createCapture(VIDEO);
v1.hide();

poseN = ml5.poseNet(v1, modelLoaded);
poseN.on('pose', gotPoses);
}

function modelLoaded(){
console.log("Model has loaded");


}

function gotPoses(results){
 
    if (results.length>0){

console.log(results);

scoreLW = results[0].pose.keypoints[9].score;
scoreRW = results[0].pose.keypoints[10].score;
console.log("Score Left Wrist: "+scoreLW);
console.log("Score Right Wrist: "+scoreRW);

rightW_x = results[0].pose.rightWrist.x;
rightW_y = results[0].pose.rightWrist.y; 

leftW_x = results[0].pose.leftWrist.x; 
leftW_y = results[0].pose.leftWrist.y; 

console.log("Right Wrist X: "+rightW_x+ " Right Wrist Y: "+rightW_y);
console.log("Left Wrist X: "+leftW_x+" Left Wrist Y: "+leftW_y);

    }


}

function preload(){
music = loadSound("music.mp3");


}

function draw(){
image (v1, 0, 0, 550, 450);

fill ("red");
stroke ("red");

if (scoreRW > 0.2){

circle (rightW_x, rightW_y, 20);
num = Number(rightW_y);
no_decimals = floor(num);
volume = no_decimals/450;
document.getElementById("vol_value").innerHTML = volume;
music.setVolume(volume);
}

fill ("red");
stroke ("red");

if (scoreLW > 0.2){
circle (leftW_x, leftW_y, 20);

if (leftW_y >= 0 && leftW_y <= 90){
document.getElementById("speed_value").innerHTML = " 0.5x";
music.rate(0.5);}

if (leftW_y >= 90 && leftW_y <= 180){
document.getElementById("speed_value").innerHTML = " 1x";
music.rate(1);}

if (leftW_y >= 180 && leftW_y <= 270){
document.getElementById("speed_value").innerHTML = " 1.5x";
music.rate(1.5);}

if (leftW_y >= 270 && leftW_y <= 360){
document.getElementById("speed_value").innerHTML = " 2x";
music.rate(2);}

if (leftW_y >= 360 && leftW_y <= 450){
document.getElementById("speed_value").innerHTML = " 2.5x";
music.rate(2.5);}

}


}



function start(){
music.play();
music.setVolume(0.5);
music.rate(1);

}

function stop(){
music.pause();


}