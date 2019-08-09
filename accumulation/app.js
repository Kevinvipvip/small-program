const Bmob = require('/utils/Bmob-2.1.0.min.js');

App({

  onLaunch() {
    wx.cloud.init({
      env: 'grj18776554629',
      traceUser: true
    });

    // Bmob数据库初始化
    Bmob.initialize("4820b283f8489834", "GRJ526");
    // this.Bmob_add('slide_image', { name: '陆剑客', age: 23 })
  },

  config: {
    url: 'http://www.jd.com',
    api: ''
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
    }]
  }
})
;