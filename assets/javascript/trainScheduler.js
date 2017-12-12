//FIREBASE
var config = {
    apiKey: "AIzaSyCD_dEHczo5OtzO5GzkLwEq-2_6s2g-3BA",
    authDomain: "trainscheduler-37c84.firebaseapp.com",
    databaseURL: "https://trainscheduler-37c84.firebaseio.com",
    projectId: "trainscheduler-37c84",
    storageBucket: "",
    messagingSenderId: "115718742061"
};
firebase.initializeApp(config);
// Create a variable to reference the database.
var database = firebase.database();
// clicking sumbit
    $("#submit-btn").on("click", function (event) {
        event.preventDefault();
        //variables to store trainName,destination,firstTrainTime,frequency
        var trainName = $("#trainName").val().trim();
        var destination = $("#destination").val().trim();
        var firstTrainTime = $("#firstTrainTime").val().trim();
        var frequency = $("#frequency").val().trim();
        //New train object
        var newTrain = {
            name: trainName,
            destiny: destination,
            firstTrain: firstTrainTime,
            frequencyMins: frequency
        };
        // Push new object into database
        database.ref().push(newTrain);
        console.log(newTrain.name);
        console.log(newTrain.destiny);
        console.log(newTrain.firstTrain);
        console.log(newTrain.frequencyMins);
        //Clear the entry fields   
        $("#trainName").val(" ");
        $("#destination").val(" ");
        $("#firstTrainName").val(" ");
        $("#frequency").val(" ");
    });
        //accces database child
        database.ref().on('child_added', function (childSnapshot, prevChildKey) {
        //console.log(childSnapshot.val());
        // Child train variable declaration
        var trainName = childSnapshot.val().name;
        var destination = childSnapshot.val().destiny;
        var firstTrainName = childSnapshot.val().firstTrain;
        var frequency = childSnapshot.val().frequencyMins;


    //time Conversion
    var firstTrainNameConverted = moment(firstTrainName, "hh:mm").subtract(1, "years");
    console.log(firstTrainTime);
    //variable to store current time
    var currentTime = moment();
    // variable to store differecen in time between first train and current time
    var diffTime = moment().diff(moment(firstTrainNameConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);
    // time difference using Modulus %
    var tRemainder = diffTime % frequency;
    console.log(tRemainder);
    // Minute Until Train
    var tMinutesTillTrain = frequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("HH:MM"));
    //appending new row to table
    $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" +
        frequency + "</td><td>" + nextTrain.format("h:mm A") + "</td><td>" + "</td><td>" + tMinutesTillTrain + "</td><td>");




});