var startButton = document.getElementById("start");
var secondsInput = document.getElementById("secondsInput");
var minutesInput = document.getElementById("minutesInput");
var hoursInput = document.getElementById("hoursInput");

var timeOutput = document.getElementById("display");

//create timer variables
var startTime;
var timerRunning = false;
var remainingSec;
var remainingMS;
var timeLoop;

document.getElementById('start').addEventListener('click', function() {
    //if start clicked:
    if(timerRunning){
        //reset
        clearInterval(timeLoop);
        timerRunning = false;
        timeOutput.textContent = 0;
        startButton.textContent = "Start"
        
    //if stop clicked
    } else {
        //initialize timer variables

        if (parseInt(secondsInput.value) < 0 || parseInt(minutesInput.value) < 0 || parseInt(hoursInput.value) < 0) {
            alert("At least one invalid input");
            return; //break out of function
        }

        if (parseInt(hoursInput.value) > 99){
            alert("Hours must be less than 100");
            return;
        }

        //convert hours, minutes, and seconds to seconds
        var h = parseInt(hoursInput.value);
        var m = parseInt(minutesInput.value);
        var s = parseInt(secondsInput.value);

        console.log(isNaN(h));

        //if input is not a number, set to 0
        if(isNaN(h)) {
            h = 0;
        }
        if(isNaN(m)) {
            m = 0;
        }
        if(isNaN(s)) {
            s = 0;
        }
        //initialize timer variables
        remainingSec = s + m*60 + h*3600;
        remainingMS = remainingSec * 1000;
        startTime = Date.now();
        timerRunning = true;
    
        //display initial time
        timeOutput.textContent = remainingSec;
    
        //change button
        startButton.textContent = "Stop";
    
        //loop every 100ms to get accurate time
        timeLoop = setInterval(function(){
            //calculate time change
            var diff = Date.now() - startTime;
            startTime = Date.now();
            
            //subtract time change from initial time
            remainingMS = remainingMS - diff;
    
            //convert from ms to s
            remainingSec = Math.ceil(remainingMS / 1000);
            
            //convert from s to h, m, s
            var timeLeft = remainingSec;
            console.log(timeLeft);
            var displayH = Math.floor(timeLeft / 3600);
            timeLeft = timeLeft - displayH*3600;
            var displayM = Math.floor(timeLeft / 60);
            timeLeft = timeLeft - displayM*60;
            var displayS = timeLeft;

            //convert to strings and check if digit length, if 1 digit then add 0 in front
            var displayH = displayH.toString();
            var displayM = displayM.toString();
            var displayS = displayS.toString();
            if (displayH.length == 1) {
                displayH = "0" + displayH;
            }
            if (displayM.length == 1) {
                displayM = "0" + displayM;
            }
            if (displayS.length == 1) {
                displayS = "0" + displayS;
            }

            //display countdown
            timeOutput.textContent = displayH + ":" + displayM + ":" + displayS;
    
            //check if time is up
            if (remainingSec <= 0) {
                clearInterval(timeLoop);
                startButton.textContent = "Start";
                timerRunning = false;
                alert("Time's up!");
            }
        }, 100);
    }
});