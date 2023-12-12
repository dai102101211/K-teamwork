// pages/my/my.js
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    img_0: 'https://img-community.csdnimg.cn/images/89a40522b90b44fea4e2d195991d9a83.png',
    img_1: 'https://img-community.csdnimg.cn/images/603c608f75874100b2c5cfc097497417.png',
    img_2: 'https://img-community.csdnimg.cn/images/8751b9143d234ae4b6cefba0ffeb8034.png',
    //  排行榜onload()给出
    rankinglist: [],
    // 用户的订单数，完成数onload()给出
    user: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      user: app.globalData.me
    })
    
    var that = this;
    wx.cloud.database().collection('user').where({
      complete:wx.cloud.database().command.gt(0)
    }).orderBy('rate', 'desc').orderBy('complete', 'desc').limit(20).get()
    .then(res=>{
      var tmp = res.data;
      for(var i = 0;i < tmp.length;++i){
        tmp[i].rate = tmp[i].rate.toString + '%';
      }
      that.setData({
        rankinglist:tmp
      })
    })
  },

  jump(ev) {
    let id = ev.currentTarget.id;
    console.log(id);
    let page = { 'home': '/pages/home  page/home page', 'community': '/pages/recommend/recommend' };
    wx.redirectTo({
      url: page[id],
    })
  },
  sell: function () {
    var user = this.data.user
    wx.navigateTo({
      url: '/pages/packages_my/pages/sell/sell?my_user=' + JSON.stringify(user)
    })
  },
  donation: function () {
    var user = this.data.user
    wx.navigateTo({
      url: '/pages/packages_my/pages/donation/donation?my_user=' + JSON.stringify(user)
    })
  },
  exchange: function () {
    var user = this.data.user
    wx.navigateTo({
      url: '/pages/packages_my/pages/exchange/exchange?my_user=' + JSON.stringify(user)
    })
  },
  lease: function () {
    var user = this.data.user
    wx.navigateTo({
      url: '/pages/packages_my/pages/lease/lease?my_user=' + JSON.stringify(user)
    })
  },
  Pop_ups: function () {
    var user = this.data.user
    wx.navigateTo({
      url: '/pages/packages_my/pages/Pop-ups/Pop-ups?my_user=' + JSON.stringify(user)
    })
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