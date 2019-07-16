const app = getApp();
const utils = require('../../utils/util');

Page({
  data: {},

  onLoad() {
    console.log(utils.formatTime(new Date(),'date'));
  }
});