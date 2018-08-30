let core = require('../core');

module.exports = {

	timeout: function(ms) {
			return new Promise(resolve => setTimeout(resolve, ms));
	},

	By: core.automate.By,

	selectButton: async function (buttonName) {
		let foundItem = null;
		let options = await core.driver().findElements(core.automate.By.tagName('button'))
		
		for (let i=0; i<options.length; i++) {
			let text = await options[i].getText()
			if (text === buttonName) {
				foundItem = options[i];
				break;
			}
		}
		if (foundItem) {
			foundItem.click()
		}
	}
}