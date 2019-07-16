const app = getApp();
const utils = require('../../utils/util');

Page({
  data: {
    array: [15, 52, 36, 48]
  },

  onLoad() {
    console.log(utils.formatTime(new Date(), 'date'));
    this.data.array.forEach((item) => {
      console.log(item * 100)
    })
  }
});