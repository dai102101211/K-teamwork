const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    imgs: [],
    model: true,
    way: '',
    detail: '',
    information: false,
    order: [],
    openid:'',
    id:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var information = JSON.parse(options.information)
    console.log(information)
    // var image = JSON.parse(options.image)
    var ge = JSON.parse(options.in)
    this.data.openid = information.openid;
    this.data.id = information._id;
    if (information.type == '待交换'||information.type == '待赠送')
      this.data.model = false
    console.log(this.way)
    this.setData({
      name: information.name,
      way: information.way,
      detail: information.detail,
      model: this.data.model,
      information: ge
    })
    var that = this;
    wx.cloud.database().collection('goods').where({
      _id:this.data.id
    }).get()
    .then(res=>{
      console.log(res);
      var fileList = res.data[0].img;
      wx.cloud.getTempFileURL({
        fileList: fileList,
        success: result => {
          console.log(result.fileList);
          var image = [];
          for (var i = 0; i < result.fileList.length; i++) {
            image.push(result.fileList[i].tempFileURL);
          }
          that.setData({
            imgs: image,
          })
        }
      })
    })
  },
  chat(){
    wx.navigateTo({
      url: '/pages/packages_my/pages/chatroom/chatroom?openid='+this.data.openid,
    })
  },

  information() {
    wx.navigateTo({
      url: '/pages/packages_home/pages/information/information?openid='+this.data.openid,
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
    showIndex: null
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

  },

  gotijiao: function () {
    console.log(this.data.id);
    console.log(this.data.order);
    console.log(this.data.openid);
    console.log(app.globalData.openid);
    console.log(this.way);
    if(this.data.order[1].length!=11)
    wx.showToast({
      title: '联系方式长度错误',
      icon: 'none',
      duration: 2000, // 保留的时间，单位为毫秒
      success: function () {
        // 弹窗显示成功后的回调函数
      }
    })
    else{
      const db = wx.cloud.database();
    const _ = db.command;
    var that = this;
    // 添加订单
    db.collection('order').add({
      data:{
        good_id:that.data.id,
        name:that.data.order[0],
        contact:that.data.order[1],
        address:that.data.order[2],
        time:that.data.order[3],
        from:that.data.openid,
        from_last:false,				// ----------------------------新
        to:app.globalData.openid,
        to_last:true,					// ----------------------------新
        start:new Date(),
        status:1
      }
    }).then(res=>{
      console.log(res)
    })
    //修改物品状态为交易中
    db.collection('goods').where({
      _id:that.data.id
    }).update({
      data:{
        deal:true
      }
    }).then(res=>{
      console.log(res)
    })
    // 双方订单数加一
    db.collection('user').where({
      _openid: _.or([
        that.data.openid,
        app.globalData.openid
      ])
    }).update({
      data:{
        order:_.inc(1)
      }
    })

    wx.redirectTo({
      url: '/pages/packages_home/pages/tijiao/tijiao'
    })
    }
    
  },
  // 打开弹窗
  openpop(e) {
    var index = e.currentTarget.dataset.index;

    this.setData({
      showIndex: index
    })
  },
  //关闭弹窗
  closepop() {
    this.setData({
      showIndex: null
    })
  },

  // 输入框
  input(event) {
    var id = event.currentTarget.dataset.index;
    this.data.order[id] = event.detail.value; 
  }

})