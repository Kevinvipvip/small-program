// pages/test/test.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		longitude:0,
		latitude:0,
		markers: [{
			longitude: 0,
			latitude: 0,
			width: 30,
			height: 30,
			iconPath: '/images/position-icon.png'
		}]
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		let that = this
		wx.getLocation({
			type: 'wgs84',
			success(res) {
				const latitude = res.latitude
				const longitude = res.longitude
				const speed = res.speed
				const accuracy = res.accuracy
				that.data.markers[0].latitude = res.latitude
				that.data.markers[0].longitude = res.longitude

				that.setData({
					longitude: res.longitude,
					latitude: res.latitude,
					markers: that.data.markers
				})
			}
		})
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {

	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () {

	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function () {

	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function () {

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
})