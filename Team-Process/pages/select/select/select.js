// pages/select/select.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    search :[{'name':'充电宝','img':'/image/思维导图.jpg','term':'待出租','way':'2r/day'},{'name':'naa','img':'/image/样式.jpg','term':'待出售','way':'59r'},{'name':'naa','img':'/image/样式.jpg','term':'待出售','way':'59r'},{'name':'naa','img':'/image/样式.jpg','term':'待出售','way':'59r'},{'name':'充电宝','img':'/image/思维导图.jpg','term':'待出租','way':'2r/day'}],
    height:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let screenHeight = wx.getSystemInfoSync().windowHeight;
    this.setData({
      height: screenHeight - 380,
    })
  },
  select()
  {
    wx.navigateTo({
      url: '/pages/display/display',
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})