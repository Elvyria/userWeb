// ==UserScript==
// @name        Honest Volume Slider
// @description Video volume will now accurately reflect volume slider position
// @author      Elvyria
// @homepage    https://github.com/Elvyria/userWeb
// @match       *://*.youtube.com/*
// @grant       none
// ==/UserScript==

(function() {
	const volume = () => {
		const slider = document.querySelector('.ytp-volume-panel') 
		const i = slider.getAttribute('aria-valuenow')

		return i / 100;
	}

	const { _, set } = Object.getOwnPropertyDescriptor(HTMLMediaElement.prototype, 'volume')
	Object.defineProperty(HTMLMediaElement.prototype, 'volume', {
		set() { set.call(this, volume()) }
	});
})();
