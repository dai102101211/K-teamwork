// pages/home  page/home page.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
 jump(ev) { 
    let id = ev.currentTarget.id;
    console.log(id);
    let page={'select':'/pages/select/select','sell':'/pages/sell/sell','rent':'/pages/rent/rent','exchange':'/pages/exchange/excange','donation':'/pages/donation/donation','home':'/pages/home  page/home page','community':'/pages/community/community','my':'/pages/my/my'};
  wx.navigateTo
    ({
        url: page[id]
    }) 
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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