import { DisplayTyping } from '../bin/displayTyping.js';

class CursorPositioner {
  #currentKey = '';

  constructor(displayTyping) {
    this.reset();
    
    this.displayTyping = displayTyping;
    this.countCorrectCharacters = 0;
    this.countUncorrectCharacters = 0;

    this.currentSpan.classList.add("underscore");
  }

  previous() {
    if (this.currentPosition < 1) {
      this.reset();
      return;
    }

    this.nextPosition = this.currentPosition;
    this.currentPosition--;
    this.previousPosition = this.currentPosition - 1;

    this.currentSpan.classList.remove('correct', 'incorrect');
    this.nextSpan.classList.remove('underscore');
    this.currentSpan.classList.add('underscore');
  }

  next() {

    if (this.nextPosition === this.displayTyping.spans.length) {
      this.currentSpan.classList.remove("underscore");
      this.reset();

      return;
    }

    this.previousPosition = this.currentPosition;
    this.currentPosition++;
    this.nextPosition = this.currentPosition + 1;
    

    this.previousSpan.classList.remove("underscore");

    if (this.#currentKey === this.previousChar) {
      this.countCorrectCharacters++;
      this.displayTyping.correctCharacters.innerText = this.countCorrectCharacters;

      this.previousSpan.classList.add("correct");
      
    } else {
      this.countUncorrectCharacters++;
      this.displayTyping.uncorrectCharacters.innerText = this.countUncorrectCharacters;

      this.previousSpan.classList.add('incorrect');
    }

    this.currentSpan.classList.add("underscore");
  }

  reset() {
    this.currentPosition = 0;
    this.previousPosition = -1;
    this.nextPosition = 1;
  }

  move(key){
    this.#currentKey = key;

    switch (this.#currentKey) {
      
      case 'Backspace':
        this.previous();
        break;

      case 'Tab':
        this.displayTyping.btn.focus();
        break;

      default:
        this.next();
        break;

    }
  }

  get previousSpan() {
    if (this.previousPosition < 0) {
      return this.displayTyping.spans[this.currentPosition];
    }

    return this.displayTyping.spans[this.previousPosition];
  }

  get nextSpan() {
    if (this.nextPosition >= this.displayTyping.spans.length - 1) {
      return this.displayTyping.spans[this.currentPosition];
    }

    return this.displayTyping.spans[this.nextPosition];
  }

  get previousChar() {
    return this.previousSpan.innerText;
  }

  get nextChar() {
    return this.nextSpan.innerText;
  }

  get currentChar() {
    return this.currentSpan.innerText;
  }

  get currentSpan() {
    return this.displayTyping.spans[this.currentPosition];
  }

  set spans(value) {
    this.displayTyping.spans = value;
  }
}

export { CursorPositioner };