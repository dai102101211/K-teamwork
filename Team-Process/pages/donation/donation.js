// pages/donation/donation.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    multiArray: [['星期一', '星期二', '星期三','星期四','星期五'], ['9：00~12：00', '15：00~17：30']],
    multiIndex: [0, 0],
    selectedValue: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },
/*输入信息*/
input(ev)
{
  var id=ev.currentTarget.id;
  if(id=='name')
  {this.data.name=ev.detail.value;}
  else if(id=='money')
  {this.data.money=ev.detail.value;}
  else if(id=='message')
  {this.data.message=ev.detail.value;}
  else if(id=='contact')
  {this.data.contact=ev.detail.value;}
},

  onMultiPickerChange: function (event) {
    const multiIndex = event.detail.value;
    const multiArray = this.data.multiArray;
    const selectedValue = multiArray[0][multiIndex[0]] + ' ' + multiArray[1][multiIndex[1]];

    this.setData({
      multiIndex: multiIndex,
      selectedValue: selectedValue,
    });
  },
  
 /*确定信息，并传入后端 */
 ok()
 {
   var name=this.data.name;
   var money=this.data.money;
   var message=this.data.message;
   var contact=this.data.contact;
   console.log(name,1111);
   console.log(money,222);
   console.log(message,333);
   console.log(contact,444);
   wx.request({
     url:"", 
     method: 'POST',
     data: {
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
