//获取应用实例
const app = getApp();

Page({
  data: {
    linkArray: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    let link = app.data.linkData;
    this.setData({
      linkArray: link
    })
  }
});