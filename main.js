video="";
s=false;
o=[];



function preload(){
    video = createVideo("iliketurtles.mp4");
}

function setup(){
    canvas = createCanvas(500,450);
    canvas.center();
    video.hide();
}

function draw(){
    image(video,0,0,500,450);

    if (s == true) {
        objectdetector.detect(video, good);
        for (var i = 0; i < o.length; i++) {
          document.getElementById("status").innerHTML = "Status : Object Detected";
          document.getElementById("numberofobjects").innerHTML = "objects identified:" + o.length;
          fill("cyan");
          percent = floor(o[i].confidence * 100);
          text( o[i].label + " " + percent + "%", o[i].x + 15,  o[i].y + 15);
          noFill();
          stroke(255, 44, 63);
          rect( o[i].x, o[i].y,  o[i].width,  o[i].height);
        }
      }
}

function start(){
    objectdetector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML ="status: detecting objects pls wait";
}

function modelLoaded(){
console.log("model loaded!");
s = true;
video.loop();
video.speed(1);
video.volume(2);
}

function good(error, results) {
    if (error) {
      console.log(error);
    }
    console.log(results);
    o = results;
  }