const app = getApp();
const utils = require('../../utils/util');

Page({
  data: {
    mine_img: [],
    animationData: {},
    bg_img: '',
    first: true,
    animation: {}
  },
  onLoad() {
    utils.getCloudImage(['cloud://grj18776554629.6772-grj18776554629/bg1.jpg'], (res) => {
      this.setData({
        bg_img: res[0].tempFileURL
      }, () => {
        this.data.animation = wx.createAnimation({
          duration: 1000,
          timingFunction: "ease"
        });

        this.anime_exec();
        this.data.first = false
      })
    });
    let swiper_img = [
      'cloud://grj18776554629.6772-grj18776554629/swipers/1.jpg',
      'cloud://grj18776554629.6772-grj18776554629/swipers/2.jpg',
      'cloud://grj18776554629.6772-grj18776554629/swipers/3.jpg',
      'cloud://grj18776554629.6772-grj18776554629/swipers/4.jpg'
    ];
    utils.getCloudImage(swiper_img, (res) => {
      let new_swiper = [];
      for (let i = 0; i < res.length; i++) {
        new_swiper.push(res[i].tempFileURL)
      }
      this.setData({
        mine_img: new_swiper
      })
    });

    // 调用小程序云函数
    // wx.cloud.callFunction({
    //   name: 'test'
    // }).then(res => {
    //   console.log(res);
    // }).catch(err => {
    //   console.log(err);
    // // // })
    // wx.cloud.callFunction({
    //   name: 'getUserInfo',
    //   complete: res => {
    //     console.log(res)
    //     let getData = res.result.data
    //     console.log(getData);
    //   }
    // })


  },
  onShow() {
    if (!this.data.first) {
      this.anime_exec();
    }
  },
  anime_exec() {
    this.data.animation.translateX(400).rotateX(180).step();
    this.data.animation.translateX(0).rotateX(360).step();
    this.setData({
      animationData: this.data.animation.export()
    });
  },

  removeSaveFile() {
    wx.getSavedFileList({
      success: (res) => {
        console.log(res);
        if (res.fileList.length > 0) {
          for (let i = 0; i < res.fileList.length; i++) {
            wx.removeSavedFile({
              filePath: res.fileList[i].filePath,
              complete(res) {
                wx.showModal({
                  title: '',
                  content: '清空文件缓存成功',
                  showCancel: false
                })
              }
            })
          }

        }
      }
    });
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

  // 点击图片查看大图
  openImage(e) {
    let index = e.currentTarget.dataset.index;
    wx.previewImage({
      urls: this.data.mine_img,
      current: this.data.mine_img[index]
    })
  }
});