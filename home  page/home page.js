// pages/home  page/home page.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cmt:[]
  },
 jump(ev) { 
    let id = ev.currentTarget.id;
    console.log(id);
    let page={'select':'/pages/packages_home/pages/select/select','sell':'/pages/packages_home/pages/sell/sell','rent':'/pages/packages_home/pages/rent/rent','exchange':'/pages/packages_home/pages/exchange/excange','donation':'/pages/packages_home/pages/donation/donation','home':'/pages/home  page/home page','community':'/pages/recommend/recommend','my':'/pages/my/my'};
    if(id=='community'||id=='my')
    wx.redirectTo({
      url:page[id],
    })
    else
  {wx.navigateTo
    ({
        url: page[id]
    }) 
  }
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const app = getApp();
    this.data.cmt = app.globalData.cmt;
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