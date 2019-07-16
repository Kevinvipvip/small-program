const utils = require('../../utils/util');

Page({
  data: {
    height: '', //上传图片的显示框的高度

    // 发布帖子类型的数组
    invitation: [{
      id: 0,
      title: '房东直租',
      isChecked: false
    }, {
      id: 1,
      title: '租客转租',
      isChecked: true
    }, {
      id: 2,
      title: '有房找室友',
      isChecked: false
    }, {
      id: 3,
      title: '无房找室友',
      isChecked: false
    }],

    // 租赁类型的数组
    lease: [{
      id: 0,
      title: '整租',
      isChecked: false
    }, {
      id: 1,
      title: '合租',
      isChecked: false
    }],

    houseImg: [], //上传的房源图片的链接数组
    proveImg: [], //上传的房源证明材料图片的链接数组

    // 房屋户型的数据数组
    multiArray: [
      ['1室', '2室', '3室', '4室', '5室', '6室', '7室', '8室', '9室'],
      ['0厅', '1厅', '2厅', '3厅', '4厅', '5厅', '6厅', '7厅', '8厅', '9厅'],
      ['0卫', '1卫', '2卫', '3卫', '4卫', '5卫', '6卫', '7卫', '8卫', '9卫']
    ],

    requireSex: ['不限', '男', '女'], // 租客性别要求的数组
    // 预计入住时间的选择起始时间
    startDate: '',
    endDate: '',

    changeColor: false, // 没选择预计入住时间时：false控制字体颜色为灰色；选择时间后：true为黑色

    length: 0, // 房屋描述显示的输入的字的数量

    // 房源详情显示
    position: '联合里17-22号楼22门303',
    multiIndex: [1, 1, 1],
    houseArea: '25',
    requireRent: 1200,
    sexIndex: 0,
    date: '请选60天内',
    houseDescribe: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    utils.getDate((res) => {
      // console.log(res)
      // console.log(res.startDate)
      // console.log(res.endDate)
      this.setData({
        startDate: res.startDate,
        endDate: res.endDate
      })
    })
    for (let i = 0; i < this.data.invitation.length; i++) {
      this.data.invitation[i].isChecked = false
    }
    this.setData({
      invitation: this.data.invitation
    })

    //创建节点选择器
    var query = wx.createSelectorQuery();
    //选择id
    var that = this;
    query.select('.up-image-cont').boundingClientRect(function (rect) {
      // console.log(rect.width)
      that.setData({
        height: rect.width + 'px'
      })
    }).exec();
  },
  bindMultiPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      multiIndex: e.detail.value
    })
  },

  bindMultiPickerColumnChange: function (e) {
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    this.data.multiIndex[e.detail.column] = e.detail.value;
    this.setData({
      multiIndex: this.data.multiIndex
    })
  },
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      changeColor: true,
      date: e.detail.value
    })
  },
  bindSexChange(e) {
    this.setData({
      sexIndex: e.detail.value
    })
  },
  checkBoxClick(e) {
    let index = e.currentTarget.dataset.id
    console.log(index)
    this.data.invitation[index].isChecked = !this.data.invitation[index].isChecked
    this.setData({
      invitation: this.data.invitation
    })
  },
  radioClick(e) {
    // console.log(e)
    let index = e.detail.value
    console.log(index)
    for (let i = 0; i < this.data.lease.length; i++) {
      if (index == i) {
        this.data.lease[i].isChecked = true
      } else {
        this.data.lease[i].isChecked = false
      }
    }

    this.setData({
      lease: this.data.lease
    })

  },
  //点击触发上传事件
  upLoadImage() {
    utils.uploadImages((res) => {
      this.setData({
        houseImg: res
      })
    })

  },
  upLoadProveImage() {
    utils.uploadImages((res) => {
      this.setData({
        proveImg: res
      })
    })
  },
  // form表单提交事件
  formSubmit: function (e) {
    console.log('form提交的数据', e.detail.value)
  },

  getTextareaLength(e) {
    console.log(e.detail.cursor)
    console.log(e.detail.value)
    this.setData({
      length: e.detail.cursor
    })
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
});