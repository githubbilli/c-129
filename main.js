song = "";

function preload() {
    song = loadSound('music.mp3');
}

score_right_wrist = 0;
score_left_wrist = 0;

right_wrist_x = 0;
right_wrist_y = 0;

left_wrist_x = 0;
left_wrist_y = 0;

function setup() {
    canvas = createCanvas(600,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded() {
    console.log("the model has loaded");
}

function gotPoses(results) {
    if(results.length > 0){
        console.log(results);
        score_right_wrist = results[0].pose.keypoints[10].score;
        score_left_wrist = results[0].pose.keypoints[9].score;
        console.log("score right wrist = " + score_right_wrist + "score left wrist " + score_left_wrist);

        right_wrist_x = results[0].pose.rightWrist.x;
        right_wrist_y = results[0].pose.rightWrist.y;
        console.log("right wrist x = " + right_wrist_x + "right wrist y = " + right_wrist_y);

        left_wrist_x = results[0].pose.leftWrist.x;
        left_wrist_y = results[0].pose.leftWrist.y;
        console.log("left wrist x = " + left_wrist_x + "left wrist y = " + left_wrist_y);
    }
}

function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function draw() {
    image(video, 0,0,600,500);
    fill("#29a3cc");
    stroke("#16db82");
    if (score_left_wrist > 0.2){
    circle(left_wrist_x,left_wrist_y,20);
    InNumberleftwristy = Number(left_wrist_y);
    remove_decimal = floor(InNumberleftwristy);
    volume = remove_decimal/500;
    document.getElementById("volume").innerHTML = "volume = " + volume;
    song.setVolume(volume);
    }
}