
// function getTrainData(cb){
//     localforage.getItem("trainSchedule").then(function(result){
//         cb(result || []);
//     });
// }
// function setTrainData(NewTrainData, cb) {
//     localforage.setItem("trainSchedule", NewTrainData).then(cb)
// };

document.getElementById("submitbtn").addEventListener("click", function (event){
    event.preventDefault();
    let name = document.getElementById("trainName").value.trim()
    let destination = document.getElementById("destination").value.trim()
    let trainTime = document.getElementById("trainTime").value.trim()
    let frequency = document.getElementById("frequency").value.trim()
    
    localStorage.setItem("name",name)
    localStorage.setItem("destination",destination)
    localStorage.setItem("trainTime",trainTime)
    localStorage.setItem("frequency",frequency)
    alert("Train has been added!")
    console.log(name)
    console.log(destination)
    console.log(trainTime)
    console.log(frequency)
    
    let newName = localStorage.getItem("name")
    let newdestination = localStorage.getItem("destination")
    let newtrainTime = localStorage.getItem("trainTime")
    let newfrequency = localStorage.getItem("frequency")
    let arrival = 0;
    let minutes = 0;
    console.log(newName)



    document.getElementById("table-body").insertAdjacentHTML("beforeend",
    "<tr> <td>"+ newName
     + "</td> <td>" + newdestination
      + "</td> <td>" + newfrequency
       + "</td> <td>" + arrival + "</td> <td>" + minutes + "</td> </tr>")
    document.getElementById("trainName").value = ""
    document.getElementById("destination").value = ""
    document.getElementById("trainTime").value = ""
    document.getElementById("frequency").value = ""
})

function newTrainTimes(result){

    let thomas = document.getElementById("table-body");
    thomas.innerHTML = "";
    for (let i = 0; i < result.length; i++){

        let tFrequency = result[i].frequency;

        let firstTime = result[i].trainTime;

        let firstTimeConverted = moment(firstTrainTime, "HH:mm").subtract(1, "years");

        // let currentTime = moment();

        let diffTime = moment().diff(moment(firstTimeConverted), "minutes");

        let tRemainder = diffTime % tFrequency;

        let tMinutesTillTrain = tFrequency - tRemainder;

        let nextTrain = moment().add(tMinutesTillTrain, "minutes");

        thomas.innerHTML += "<tr> <td>" + result[i].name 
        + "</td> <td>" + result[i].frequency 
        + "</td> <td>" + nextTrain
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