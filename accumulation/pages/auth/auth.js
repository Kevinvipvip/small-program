const app = getApp();
const utils = require('../../utils/util');
Page({
  data: {
    isAuth: true,
    user_detail: {}
  },
  onLoad: function(options) {
    // app.cloud_ajax('login', {}, (res) => {
    //   console.log(res)
    // })
    let that = this;
    wx.getSetting({
      success: (res) => {
        console.log(res.authSetting)
        if (!res.authSetting['scope.userInfo']) {
          // console.log(1111)
          that.setData({
            isAuth: false
          })
        } else {
          app.cloud_ajax('getUserInfo', {}, (res) => {
            console.log(res)
            that.setData({
              isAuth: true,
              user_detail: res.data
            })
          })
        }
      }
    })
  },
  getUserInfo(e) {
    console.log(e.detail.userInfo)
    app.cloud_ajax('login', {
      avatarUrl: e.detail.userInfo.avatarUrl,
      gender: e.detail.userInfo.gender,
      nickName: e.detail.userInfo.nickName,
    }, (res) => {
      console.log(res)
      this.setData({
        isAuth: true
      })
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})