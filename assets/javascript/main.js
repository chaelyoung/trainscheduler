// Initialize Firebase
var config = {
    apiKey: "AIzaSyCi9uTiQJznZJGq6M_Mlc4QQz8wTttAlZ4",
    authDomain: "trainschedule-460c3.firebaseapp.com",
    databaseURL: "https://trainschedule-460c3.firebaseio.com",
    projectId: "trainschedule-460c3",
    storageBucket: "",
    messagingSenderId: "701984611061"
  };
  firebase.initializeApp(config);

var database = firebase.database();

// Activate button for adding train

$("#addTrainButton").on("click", function(event) {

    event.preventDefault();

    // Take in data input by user
    var trainName = $("#inputTrainName").val().trim();
    var trainDestination = $("#inputDestination").val().trim();
    var trainTime = moment($("#inputTime").val().trim(),"HH:mm").format("HH:mm");
    var trainFrequency = $("#inputTrainFrequency").val().trim();

    // Creates local temp object to hold train data
    var newTrain = {
        name: trainName,
        location: trainDestination,
        ttime: trainTime,
        freq: trainFrequency
    };

    // Uploads train data to databse
    database.ref().push(newTrain);

    // Logs newTrain data to console
    console.log(newTrain.name);
    console.log(newTrain.location);
    console.log(newTrain.ttime);
    console.log(newTrain.freq);

});

// Create Firebase event to add new train data into database as well as html rows
database.ref().on("child_added", function(childSnapshot) {

    console.log(childSnapshot.val());

    // Store childSnapshot values into a variable
    var trainName = childSnapshot.val().name;
    var trainDestination = childSnapshot.val().location;
    var trainTime = childSnapshot.val().ttime;
    var trainFrequency = childSnapshot.val().freq;

    // Var for current time, formatted
    var firstTrain = moment(trainTime, "HH:mm");

    // Math to calculate train times
    var timeDif = moment().diff(moment(firstTrain), "minutes");
    var timeRemain = timeDif % trainFrequency;
    var trainMinutes = trainFrequency - timeRemain;
    var nextTrain = moment().add(trainMinutes, "minutes").format("HH:mm");

    // Push data to table
    $("#trainSchedule>tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" + trainFrequency + "</td><td>" + nextTrain + "</td><td>" + trainMinutes + "</td></tr>");

});


