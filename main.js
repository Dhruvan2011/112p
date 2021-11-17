prediction1="";
prediction2="";

Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 90
});

camera = document.getElementById("camera");

Webcam.attach('#camera');

function take_snapshot() {
    Webcam.snap(function (data_uri){
        document.getElementById("result").innerHTML = '<img id="image_captured" src="'+data_uri+'"/>';
    });
}

console.log("ml5 version:",ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/q-FoSZVF-/model.json',modelLoaded);

function modelLoaded() {
    console.log("Model Loaded Successfully!");
}

function speak() {
    var synth = window.speechSynthesis;
    var speak_data_1 = "The Prediction 1 Is "+prediction1;
    var speak_data_2 = "The Prediction 2 Is "+prediction2;
    var utterThis = new SpeechSynthesisUtterance(speak_data_1+speak_data_2);
    synth.speak(utterThis);
}

function check() {
    img = document.getElementById("captured_image");
    classifier.classify(img, gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.error(error);
    } else {
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML = results[0].label;
        document.getElementById("result_emotion_name2").innerHTML = results[1].label;
        prediction1 = results[0].label;
        prediction2 = results[1].label;

        speak();

        if (results[0].label == "victory") {
            document.getElementById("update_emoji").innerHTML = "&#9996;";
        }
        if (results[0].label == "Thumbs up") {
            document.getElementById("update_emoji").innerHTML = "&#128532;";
        }

        if (results[0].label == "Super") {
            document.getElementById("update_emoji").innerHTML = "&#128077;";
        }

        if (results[1].label == "victory") {
            document.getElementById("update_emoji2").innerHTML = "&#9996;";
        }
        if (results[1].label == "Thumbs up") {         
            document.getElementById("update_emoji2").innerHTML = "&#128532;";
        }
        if (results[1].label == "Super") {       
            document.getElementById("update_emoji2").innerHTML = "&#128077;";
        }
    }
}