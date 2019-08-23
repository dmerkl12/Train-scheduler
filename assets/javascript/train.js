
function getTrainData(cb){
    localforage.getItem("trainSchedule").then(function(result){
        cb(result || []);
    });
}
function setTrainData(NewTrainData, cb) {
    localforage.setItem("trainSchedule", NewTrainData).then(cb)
};

document.getElementById("submitbtn").addEventListener("click", function (event){
    event.preventDefault();

    

    let name = document.getElementById("trainName").value.trim();
    let destination = document.getElementById("destination").value.trim();
    let trainTime = document.getElementById("trainTime").value.trim();
    let frequency = document.getElementById("frequency").value.trim();
    

    const newTrain = { 
        name: name,
        destination: destination,
        trainTime: trainTime,
        frequency: frequency
       }

       getTrainData(function(result){
        let newArray = result;
        newArray.push(newTrain)


    alert("A new Train has been added!")

    


setTrainData(newArray, function() {
    console.log(newArray)

})

})
});



function newTrainTimes(result){

    let thomas = document.getElementById("table-body");
    thomas.innerHTML = "";

    for (let i = 0; i < result.length; i++){

        let tFrequency = result[i].frequency;

        let firstTrainTime = result[i].trainTime;

        let firstTimeConverted = moment(firstTrainTime, "HH:mm").subtract(1, "years");

        let currentTime = moment();
        console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

        let diffTime = moment().diff(moment(firstTimeConverted), "minutes");
        console.log("DIFFERENCE IN TIME " + diffTime);

        let tRemainder = diffTime % tFrequency;


        let tMinutesTillTrain = tFrequency - tRemainder;

        let nextTrain = moment().add(tMinutesTillTrain, "minutes");
        console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

        thomas.innerHTML += "<tr> <td>" + result[i].name 
        + "</td> <td>" + result[i].destination 
        + "</td> <td>" + result[i].frequency 
        + "</td> <td>" + nextTrain.format("hh:mm")
         + "</td> <td>" + tMinutesTillTrain
          +"</td> </tr>";
    }};


    getTrainData(function(result){ 
    newTrainTimes(result)
})

    window.setInterval(function(){

        getTrainData(function(result){
            newTrainTimes(result);

        });
    },1000)