App({

  onLaunch() {
    wx.cloud.init({
      env: 'grj18776554629',
      traceUser: true
    });
  },
  config: {
    url: 'http://www.jd.com',
    api: ''
  },

  cloud_ajax(name, data, succ, fail, complete) {
    // let d = data || {};
    wx.cloud.callFunction({
      name: name,
      data: data,
      success: res => {
				// console.log(res)
        succ(res.result);
      },
      fail: err => {
        if (fail) {
          fail();
        }
      },
      complete: () => {
        if (complete) {
          complete();
        }
      }
    })
  },

  data: {
    linkData: [{
      name: '测试',
      link: '/pages/test/test',
      color: '#ff4c4c'
    }, {
      name: '定位',
      link: '/pages/location/location',
      color: '#333333'
    }, {
      name: '选项卡',
      link: '/pages/tab/tab',
      color: '#ff4c4c'
    }, {
      name: '倒计时',
      link: '/pages/count-down/count-down',
      color: '#333333'
    }, {
      name: '房源发布',
      link: '/pages/publish-house/publish-house',
      color: '#ff4c4c'
    }, {
      name: '上传图片',
      link: '/pages/upload-image/upload-image',
      color: '#333333'
    }, {
      name: '授权登录',
      link: '/pages/auth/auth',
      color: '#ff4c4c'
    }]
  }
});