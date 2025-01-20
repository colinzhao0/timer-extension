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

// Restore timer state on load
chrome.storage.local.get(["time", "remainingMS", "timerRunning"]).then((res) => {
    if (res.timerRunning) {
        startTime = res.time;
        remainingMS = res.remainingMS;
        timerRunning = true;
        startButton.textContent = "Stop";

        timeLoop = setInterval(function(){
            var diff = Date.now() - startTime;
            startTime = Date.now();
            chrome.storage.local.set({time: startTime});
            
            remainingMS -= diff;
            chrome.storage.local.set({remainingMS});

            remainingSec = Math.ceil(remainingMS / 1000);
            
            var timeLeft = remainingSec;
            var displayH = Math.floor(timeLeft / 3600);
            timeLeft -= displayH * 3600;
            var displayM = Math.floor(timeLeft / 60);
            timeLeft -= displayM * 60;
            var displayS = timeLeft;

            displayH = displayH.toString().padStart(2, '0');
            displayM = displayM.toString().padStart(2, '0');
            displayS = displayS.toString().padStart(2, '0');

            timeOutput.textContent = `${displayH}:${displayM}:${displayS}`;

            if (remainingSec <= 0) {
                clearInterval(timeLoop);
                startButton.textContent = "Start";
                timerRunning = false;
                chrome.storage.local.set({timerRunning: false});
                alert("Time's up!");
            }
        }, 100);
    }
});

document.getElementById('start').addEventListener('click', function() {
    if (timerRunning) {
        clearInterval(timeLoop);
        timerRunning = false;
        timeOutput.textContent = "00:00:00";
        startButton.textContent = "Start";
        chrome.storage.local.set({time: undefined, remainingMS: undefined, timerRunning: false});
    } else {
        if (parseInt(secondsInput.value) < 0 || parseInt(minutesInput.value) < 0 || parseInt(hoursInput.value) < 0) {
            alert("At least one invalid input");
            return;
        }
        if (parseInt(hoursInput.value) > 99) {
            alert("Hours must be less than 100");
            return;
        }

        var h = parseInt(hoursInput.value) || 0;
        var m = parseInt(minutesInput.value) || 0;
        var s = parseInt(secondsInput.value) || 0;

        remainingSec = s + m * 60 + h * 3600;
        remainingMS = remainingSec * 1000;
        startTime = Date.now();
        timerRunning = true;

        chrome.storage.local.set({time: startTime, remainingMS, timerRunning: true});

        startButton.textContent = "Stop";

        timeLoop = setInterval(function(){
            var diff = Date.now() - startTime;
            startTime = Date.now();
            chrome.storage.local.set({time: startTime});
            
            remainingMS -= diff;
            chrome.storage.local.set({remainingMS});

            remainingSec = Math.ceil(remainingMS / 1000);
            
            var timeLeft = remainingSec;
            var displayH = Math.floor(timeLeft / 3600);
            timeLeft -= displayH * 3600;
            var displayM = Math.floor(timeLeft / 60);
            timeLeft -= displayM * 60;
            var displayS = timeLeft;

            displayH = displayH.toString().padStart(2, '0');
            displayM = displayM.toString().padStart(2, '0');
            displayS = displayS.toString().padStart(2, '0');

            timeOutput.textContent = `${displayH}:${displayM}:${displayS}`;

            if (remainingSec <= 0) {
                clearInterval(timeLoop);
                startButton.textContent = "Start";
                timerRunning = false;
                chrome.storage.local.set({timerRunning: false});
                alert("Time's up!");
            }
        }, 100);
    }
});