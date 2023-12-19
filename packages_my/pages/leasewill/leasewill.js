// pages/leasewill/leasewill.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user:{},
    rent:[]
  },

  golease:function(){
    wx.redirectTo({
      url: '/pages/packages_my/pages/lease/lease'
    })
   },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 两个方法均可
    // var that = this;
    //   that.setData({
    //       user:JSON.parse(options.my_user),
    //   })
    //   console.log(this.data.user)
    this.setData({
      user: app.globalData.me
    })
    var that = this;
    wx.cloud.database().collection('user').where({
      _openid:app.globalData.openid
    })
    .watch({
      // 数据库变化会执行
      onChange:function(snapshot){
        console.log(snapshot);
        app.globalData.me = snapshot.docs[0];
        that.setData({
          user:app.globalData.me
        })
        console.log(app.globalData.me)
        wx.cloud.database().collection('goods').where({
          _openid:app.globalData.me._openid,
          deal:false,
          type:3
        }).get()
        .then(res=>{
          console.log(res)
          that.setData({
            rent:res.data
          })
        })
      },
      // 错误
      onError:function(err) {
        console.log(err);
      }
    })
  },

  cancel(event) {
    var item = event.currentTarget.dataset.item;
    var index = event.currentTarget.dataset.index;
    var rent = this.data.rent;
    wx.cloud.database().collection('goods').where({
      _id:item._id
    }).remove()
    .then(res=>{
      console.log(res);
    })
    rent.splice(index,1);
      this.setData({
        rent:rent
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