import { DisplayTyping } from '../bin/displayTyping.js';

class BaconipsumApi {
	
	constructor(displayTyping){
		this._url = 'https://baconipsum.com/api/?type=all-meat&paras=3&start-with-lorem=1&format=html';
	
		this.displayTyping = displayTyping;
	}

	async reset() {

		this.displayTyping.reset();

		[...await this.getText()].forEach(symbol => {
			let span = document.createElement('span');
	
			span.innerText = symbol;

			this.displayTyping.p.append(span);
		});

		this.displayTyping.spans = document.body.querySelectorAll('p span');
	}

	async getText() {
		const response = await fetch(this._url);
	
		let loremHtml = await response.text();

		const parser = new DOMParser();
		const htmlDoc = parser.parseFromString(loremHtml, 'text/html');

		const paragraphs = htmlDoc.querySelectorAll('p');

		return paragraphs[0].innerText.toLowerCase();
	}
}

export { BaconipsumApi };