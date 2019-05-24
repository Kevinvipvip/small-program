// components/tab-switch.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    //tab选项显示的数组
    tabArray: {
      type: Array
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    flagId: 1,
    showTabDown: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 点击每个选项触发的事件
    itemClick(e) {
      let id = e.currentTarget.dataset.id
      console.log(id)
      this.setData({
        showTabDown: true,
        flagId: id
      })
    }
  }
})