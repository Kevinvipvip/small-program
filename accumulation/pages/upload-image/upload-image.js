const utils = require('../../utils/util');

Page({

  data: {
    my_heigth: '',
    my_s_heigth: '',
    preview: [],
    img_url: '',
    has_img: false,
    i: 0
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

  //上传多张图片
  uploading_image() {
    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        // tempFilePath可以作为img标签的src属性显示图片
        let images = res.tempFiles;
        console.log('选择的图片', images);

        if ((this.data.preview.length + images.length) > 9) {
          wx.showToast({
            title: '最多只能上传9张图片',
            icon: 'none',
            duration: 2000
          });
        } else {
          this.compressImage(images);
          // that.getCanvasImg(0, 0, images);
          for (let i = 0; i < images.length; i++) {
            this.data.preview.push(images[i].path)
          }
          console.log('显示的图片', this.data.preview);
          this.setData({
            preview: this.data.preview,
          })
        }
      }
    })
  },
  //图片压缩
  compressImage(arr) {
    console.log('传入的图片的数组', arr);
    let new_arr = [];
    for (let i = 0; i < arr.length; i++) {
      console.log('选择的图片的size', arr[i].size);
      if (arr[i].size > 512000) {
        console.log('进来了' + i);
        console.log('要压缩的图片的路径', arr[i].path);
        wx.compressImage({
          src: arr[i].path,
          quality: 10,
          success(res) {
            console.log('压缩后的图片', res);
            new_arr.push(res.tempFilePath);
          }
        })
      }
    }
    console.log(new_arr);
    return arr
  },
  //每次上传一张图片
  uploading_one_image() {
    console.log('点击了按钮');
    // this.data.i++;
    this.upload_img_one((res, size) => {
      // console.log(size)

      wx.cloud.uploadFile({
        cloudPath: 'images/images' + size,
        filePath: res, // 文件路径
        success: res => {
          // get resource ID
          console.log('上传成功');
          let ids = [];
          ids.push(res.fileID);
          utils.getCloudImage(ids, (res) => {
            console.log('已获取图片');
            this.setData({
              img_url: res[0].tempFileURL,
              has_img: true
            });
            wx.hideLoading();
          })
        },
        fail: err => {
          utils.toast(err.errMsg)
        }
      });
    });
  },
  //每次上传一张图片
  upload_img_one(callback) {
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        // tempFilePath可以作为img标签的src属性显示图片
        wx.showLoading({
          title: '正在上传图片',
          // mask: true
        });
        let images = res.tempFiles;
        let get_img_url;
        // console.log(images);
        // console.log(images[0].size);
        if (images[0].size > 512000) {
          wx.compressImage({
            src: images[0].path,
            quality: 10,
            success: (res) => {
              // console.log(res);
              callback(res.tempFilePath, images[0].size);
            }
          })
        } else {
          callback(images[0].path, images[0].size);
        }
      }
    })
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
    query.select('.pre_box').boundingClientRect((rect) => {
      // console.log(rect, '外');
      this.setData({
        my_heigth: rect.width
      })
    }).exec();
    query.select('.pre_cont').boundingClientRect((rect) => {
      // console.log(rect, '内');
      this.setData({
        my_s_heigth: rect.width
      })
    }).exec();
    if (callback) {
      callback()
    }
  }
});