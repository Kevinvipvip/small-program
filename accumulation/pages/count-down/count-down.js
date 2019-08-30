const app = getApp();
const utils = require('../../utils/util');

Page({
  data: {
    array: [15, 52, 36, 48],
    spring: ['00', '00', '00', '00'],
    valentine: ['00', '00', '00', '00'],
    mid_autumn: ['00', '00', '00', '00'],
    national: ['00', '00', '00', '00'],
  },

  onLoad() {
    // 春节倒计时
    let count_down = setInterval(() => {
      this.countDownDate(1579881600000, (res) => {
        this.setData({
          spring: res
        });
      }, () => {
        clearInterval(count_down);
      });
    }, 1000);
    // 情人节倒计时
    let valentine = setInterval(() => {
      this.countDownDate(1565107200000, (res) => {
        this.setData({
          valentine: res
        });
      }, () => {
        clearInterval(valentine);
      });
    }, 1000);

    // 中秋节倒计时
    let mid_autumn = setInterval(() => {
      this.countDownDate(1568304000000, (res) => {
        this.setData({
          mid_autumn: res
        });
      }, () => {
        clearInterval(mid_autumn);
      });
    }, 1000);

    // 国庆节倒计时
    let national = setInterval(() => {
      this.countDownDate(1569859200000, (res) => {
        this.setData({
          national: res
        });
      }, () => {
        clearInterval(national);
      });
    }, 1000);
  },
  countDownDate(timeStamp, fn, callback) {
    let time_stamp = timeStamp.toString()[12] ? timeStamp : timeStamp * 1000;
    let now_time_stamp = new Date().getTime(); //获取现在距离1970年的毫秒数

    if (time_stamp - now_time_stamp > 0) {
      let s = Math.floor((time_stamp - now_time_stamp) / 1000); //计算未来时间距离现在的秒数
      let d = Math.floor(s / (60 * 60 * 24)); //整数部分代表的是天；一天有24*60*60=86400秒
      s %= 60 * 60 * 24; //余数代表剩下的秒数
      let h = Math.floor(s / (60 * 60)); //整数部分代表小时
      s %= 60 * 60;
      let m = Math.floor(s / 60); //整数部分代表分钟数
      s %= 60; //最后剩下的是秒数

      let new_date = [d, h, m, s].map(this.formatNumber);
      fn(new_date)
    } else {
      if (callback) {
        callback()
      }
    }
  },
  formatNumber(item) {
    item = item.toString();
    return item[1] ? item : '0' + item
  }
});