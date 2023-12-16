import { random } from './utils.js';
import '../style/style.scss';
import { CursorPositioner } from '../bin/cursorPositioner.js';
import { DisplayTyping } from '../bin/displayTyping.js';
import { BaconipsumApi } from '../bin/baconipsumApi.js';

const btn = document.body.querySelector('.btn');

const displayTyping = new DisplayTyping(document.body);

const baconipsumApi = new BaconipsumApi(displayTyping);

// displayTyping initialize a new spans.
await baconipsumApi.reset();


let cursorPositioner,  timer;


btn.addEventListener('click', initTest);

await initTest(event);

function keyDown(event) {
  cursorPositioner.move(event.key);
}

async function run(event) {
  let expiringTime = displayTyping.maxTime;

  cursorPositioner.move(event.key);

  document.removeEventListener('keydown', run);
  document.addEventListener('keydown', keyDown);

  setTimeout(async () => {

    document.removeEventListener('keydown', keyDown);

    }, expiringTime * 1000);

  timer = setInterval(() => {
    if (expiringTime > 0) {
      expiringTime--;

      displayTyping.time.innerText = expiringTime;
      return;
    }

    clearInterval(timer);
  }, 1000);
}

async function initTest() {

  // unfocus on button
  btn.blur();

  clearInterval(timer);

  // get new text for test
  await baconipsumApi.reset();

  cursorPositioner = new CursorPositioner(displayTyping);

  document.addEventListener('keydown', run);
}

