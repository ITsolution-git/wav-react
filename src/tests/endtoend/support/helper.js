let core = require('../core');

module.exports = {

  timeout: function(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  },

  By: core.automate.By
}