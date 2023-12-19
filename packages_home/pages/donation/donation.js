// pages/donation/donation.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectedValue: '',
    name:'',
    message:'无',
    contact:'无',
    model:false,
    imageUrls:[],
    imgs: [],
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
  else if(id=='message')
  {this.data.message=ev.detail.value;}
  else if(id=='relax')
  {this.data.contact=ev.detail.value;}
},

change() {
  var that = this
  var model=true;
  wx.chooseImage({
    count: that.data.count, // 默认3
    sizeType: ["original", "compressed"], // 可以指定是原图还是压缩图，默认二者都有
    sourceType: ["album", "camera"], // 可以指定来源是相册还是相机，默认二者都有
    success: function (res) {
      that.data.imgs.push(res.tempFilePaths[0]);

      that.setData({
        imgs: that.data.imgs,
        model:model
      });
      that.uploadDetailImage();
    }
  })
},
uploadDetailImage(){
  var that = this;
  for(var i = 0;i < this.data.imgs.length;i++){
    var path = this.data.imgs[i];
    wx.cloud.uploadFile({
      cloudPath: 'goods/'+ path.split('/').pop(),
      filePath: path,
      success(res){
        console.log("fileID=" + res.fileID);
        that.data.imageUrls.push(res.fileID);
        console.log(that.data.imageUrls)
        wx.showToast({
          title: '图片上传成功',
          icon: 'none',
          duration: 2000, // 保留的时间，单位为毫秒
          success: function () {
            // 弹窗显示成功后的回调函数
          }
        })
      }
    })
  }
},
bindUpload: function (e) {
  let index = e.currentTarget.dataset.index
  wx.previewImage({ 
    current: this.data.imgs[index], /*当前显示图片的http链接 */
    urls: this.data.imgs // 需要预览的图片http链接列表 
})
},
 /*确定信息，并传入后端 */
 ok()
 {
  wx.cloud.database().collection('goods').add({
    data:{
      name: this.data.name,
      detail: this.data.message,
      contact: this.data.contact,
      img:this.data.imageUrls,
      type:4,
      deal:false
    }
  }).then(res=>{
    console.log(res);    
  });
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