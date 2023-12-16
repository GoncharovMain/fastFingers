class DisplayTyping {

  maxTime = 60;

  constructor(body) {
    this.p = body.querySelector('.wrapper p');
    this.time = body.querySelector('.time b');
    this.correctCharacters = body.querySelector('.right b');
    this.uncorrectCharacters = body.querySelector('.error b');
    this.btn = document.body.querySelector('.btn');
    this.spans;
  }

  reset(){
    this.p.innerHTML = '';
    this.correctCharacters.innerText = 0;
    this.uncorrectCharacters.innerText = 0;
    this.time.innerText = this.maxTime;
  }
}

export { DisplayTyping };