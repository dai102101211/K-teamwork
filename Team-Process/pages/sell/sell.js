// pages/sell/sell.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageUrls:["/image/矩形 58.png","/image/图像 1.png"]
  },
/*传入图片*/
choosemage: function() {
  const _this = this;
  wx.chooseImage({
    success: function(res) {
      const tempFilePaths = res.tempFilePaths;
      const newImageList = _this.data.imageList.concat(tempFilePaths);
      _this.setData({
        imageList: newImageList
      });
    }
  });
},

  /*确定信息，并传入后端 */
ok()
{
  wx.request({
    url:"", 
    method: 'POST',
    data: {
      RobotTou:this.data.
    },
    header: {
      'content-type': 'application/json' // 默认值
    },
    success: (res) => {
      if(res.statusCode == 200) {
        console.log('用户信息已成功保存到后端');
        console.log(res)//请求成功后的res
        
      } else {
        console.error('保存到后端失败:', res);
      }
    },
    fail: (error) => {
      console.error('请求失败:', error);
    }
  })
  wx.navigateTo({
    url: '/pages/home  page/home page',
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