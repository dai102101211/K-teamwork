// pages/information/information.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    seller: '/image/头像.jpg',
    sname: 'ddr',
    sceit: 1000,
    thing:[],
    // thing: [
    //   { 'name': 'aa', 'type': '待出售', 'way': '3r', 'image': ['/image/思维导图.jpg'], 'detail': '' },
    //   { 'name': 'aa', 'type': '待出售', 'way': '3r', 'image': ['/image/思维导图.jpg'], 'detail': '' },
    //   { 'name': 'aa', 'type': '待出售', 'way': '3r', 'image': ['/image/思维导图.jpg'], 'detail': '' },
    //   { 'name': 'aa', 'type': '待出售', 'way': '3r', 'image': ['/image/思维导图.jpg'], 'detail': '' },
    //   { 'name': 'aa', 'type': '待出售', 'way': '3r', 'image': ['/image/思维导图.jpg'], 'detail': '' },
    //   { 'name': 'aa', 'type': '待出售', 'way': '3r', 'image': ['/image/思维导图.jpg'], 'detail': '' },
    //   { 'name': 'aa', 'type': '待出售', 'way': '3r', 'image': ['/image/思维导图.jpg'], 'detail': '' },
    //   { 'name': 'aa', 'type': '待出售', 'way': '3r', 'image': ['/image/思维导图.jpg'], 'detail': '' },
    //   { 'name': 'aa', 'type': '待出售', 'way': '3r', 'image': ['/image/思维导图.jpg'], 'detail': '' }
    // ],
    height: 0,
    over: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 加载用户数据
    wx.cloud.database().collection('user').where({
      _openid: options.openid
    }).get()
      .then(res => {
        console.log(res);
        this.setData({
          seller: res.data[0].head,
          sname: res.data[0].nickname,
        });
        wx.cloud.database().collection('goods').where({
          _openid: options._openid,
          deal:false
        }).get()
          .then(result => {
            console.log(result);
            var tmp = [];
            var way = '';
            var type = '';
            
            for (var i = 0; i < result.data.length; i++) {

              if (result.data[i].type == '1') {
                type = "待出售";
                way = result.data[i].special.money
              }
              else if (result.data[i].type == '2') {
                type = "待交换";
                way = result.data[i].special.item
              }
              else if (result.data[i].type == '3') {
                type = "待出租";
                way = result.data[i].special.money + 'r /' + result.data[i].special.rent_time
              }
              var item = {
                'name':result.data[i].name,
                'type':type,
                'way':way,
                'image':result.data[i].img,
                'detail':result.data[i].detail
              };
              tmp.push(item);
            }
            this.setData({thing:tmp});
          })
      })
    let screenHeight = wx.getSystemInfoSync().windowHeight;
    this.setData({
      height: screenHeight - 200,
    })
  },
  jmp(e) {
    const index = e.currentTarget.dataset.index
    console.log(`点击了第 ${index} 项`)
    wx.navigateTo({
      url: '/pages/packages_home/pages/display/display?information=' + JSON.stringify(this.data.thing[index]) + '&image=' + JSON.stringify(this.data.thing[index].image) + '&in=' + false,
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