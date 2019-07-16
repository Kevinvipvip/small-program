// pages/upload-image/upload-image.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    my_heigth: '',
    my_s_heigth: '',
    preview: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.set_my_height()
  },

  /**
   * 自定义的方法
   */

  //上传图片
  uploading_image() {
    console.log('点击了按钮');
    let that = this
    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        // tempFilePath可以作为img标签的src属性显示图片
        let images = res.tempFiles;
        console.log(images);

        if ((that.data.preview.length + images.length) > 9) {
          wx.showToast({
            title: '最多只能上传9张图片',
            icon: 'none',
            duration: 2000
          });
        } else {
          that.compressImage(images);
          // that.getCanvasImg(0, 0, images);
          for (let i = 0; i < images.length; i++) {
            that.data.preview.push(images[i].path)
          }
          console.log(that.data.preview);
          that.setData({
            preview: that.data.preview,
          })
        }
      }
    })
  },

  compressImage(arr) {
    let that = this;
    for (let i = 0; i < arr.length; i++) {
      console.log(arr[i].size)
      if (arr[i].size > 512000) {
        console.log('进来了' + i);
        console.log(typeof arr[i].path);
        wx.compressImage({
          src: arr[i].path,
          quality: 10,
          success(res) {
            console.log(res);
            wx.getImageInfo({
              src: res.tempFilePath,
              success(res) {
                console.log(res)
                console.log(res.width)
                console.log(res.height)
              }
            })
            arr[i].path = res.tempFilePath
          }
        })
      }
    }
    return arr
  },

  //压缩并获取图片，这里用了递归的方法来解决canvas的draw方法延时的问题
  getCanvasImg(index, failNum, tempFilePaths) {
    let that = this;
    if (index < tempFilePaths.length) {
      const ctx = wx.createCanvasContext('attendCanvasId');
      ctx.drawImage(tempFilePaths[index], 0, 0, 300, 150);
      ctx.draw(true, () => {
        index = index + 1;//上传成功的数量，上传成功则加1
        wx.canvasToTempFilePath({
          canvasId: 'attendCanvasId',
          success: (res) => {
            console.log(res);
            that.data.preview.push(res.tempFilePath);
            // that.uploadCanvasImg(res.tempFilePath);
            that.getCanvasImg(index, failNum, tempFilePaths);
          },
          fail: (e) => {
            failNum += 1;//失败数量，可以用来提示用户
            that.getCanvasImg(index, failNum, tempFilePaths);
          }
        });
      });
    }
  },

  //根据百分比宽度设置高度，形成正方形
  set_my_height(callback) {
    let query = wx.createSelectorQuery();
    query.select('#pre_box').boundingClientRect((rect) => {
      // console.log(rect, '外');
      this.setData({
        my_heigth: rect.width
      })
    }).exec();
    query.select('#pre_cont').boundingClientRect((rect) => {
      // console.log(rect, '内');
      this.setData({
        my_s_heigth: rect.width
      })
    }).exec();
    if (callback) {
      callback()
    }
  }
})