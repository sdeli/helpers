/* eslint-disable no-undef */
var step = 0.1;
var isRunning = false;
document.addEventListener('keydown', (event) => {
  if (isRunning) return;
  isRunning = true;
  console.log(event.which);
  if (event.which === 191) {
    stepForward();
  }

  if (event.which === 190) {
    stepBackward();
  }

  if (event.which === 65) {
    rockStepUp();
  }

  if (event.which === 90) {
    rockStepDown();
  }
});

function stepForward() {
  var timeNow = html5player.lastKnownCurrentTime;
  console.log('my seek:' + timeNow + step);
  html5player.seek(timeNow + step);
  isRunning = false;
}

function stepBackward() {
  var timeNow = html5player.lastKnownCurrentTime;
  console.log('my seek:' + timeNow + step);
  html5player.seek(timeNow - step);
  isRunning = false;
}

function rockStepUp() {
  step += 0.01;
  console.log('step is now at: ' + step);
  isRunning = false;
}

function rockStepDown() {
  step -= 0.01;
  console.log('step is now at: ' + step);
  isRunning = false;
}
