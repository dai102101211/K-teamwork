// pages/sell/sell.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageUrls:[],
    name:'',
    money:0,
    message:'无',
    contact:'无',
    imgs: [],
    count: 3,
    model:false,
  },
/*传入图片*/
change(){
var model=!this.data.model;
var that = this
wx.chooseImage({
  count: that.data.count, // 默认3
  sizeType: ["original", "compressed"], // 可以指定是原图还是压缩图，默认二者都有
  sourceType: ["album", "camera"], // 可以指定来源是相册还是相机，默认二者都有
  success: function (res) {
    // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
    console.log(1111)
    var tempFilePaths = res.tempFilePaths
    console.log(tempFilePaths,2222)
    for(var i=0;i<tempFilePaths.length;i++)
    {
      that.data.imgs.push(tempFilePaths[i]);
    }
    var imgs=that.data.imgs
    console.log(imgs,3333)
    that.setData({
      model:model,
      imgs: that.data.imgs
    })
  }
})
},
bindUpload: function (e) {
  let index = e.currentTarget.dataset.index
  wx.previewImage({ 
    current: this.data.imgs[index], /*当前显示图片的http链接 */
    urls: this.data.imgs // 需要预览的图片http链接列表 
})
  
    /*
  var that = this
  wx.chooseImage({
    count: that.data.count, // 默认3
    sizeType: ["original", "compressed"], // 可以指定是原图还是压缩图，默认二者都有
    sourceType: ["album", "camera"], // 可以指定来源是相册还是相机，默认二者都有
    success: function (res) {
      // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
      console.log(1111)
      var tempFilePaths = res.tempFilePaths
      console.log(tempFilePaths,2222)
      for(var i=0;i<tempFilePaths.length;i++)
      {
        that.data.imgs.push(tempFilePaths[i]);
      }
      var imgs=that.data.imgs
      console.log(imgs,3333)
      that.setData({
        imgs: that.data.imgs
      })
    
      for (var i = 0; i < tempFilePaths.length; i++) {
        wx.uploadFile({
          url: 'https://example.com/upload',
          filePath: tempFilePaths[i],
          name: "file",
          header: {
            "content-type": "multipart/form-data"
          },
          success: function (res) {
            if (res.statusCode == 200) {
              wx.showToast({
                title: "上传成功",
                icon: "none",
                duration: 1500
              })
              that.data.imgs.push(JSON.parse(res.data).data)
              that.setData({
                imgs: that.data.imgs
              })
            }
          },
          fail: function (err) {
            wx.showToast({
              title: "上传失败",
              icon: "none",
              duration: 2000
            })
          },
          complete: function (result) {
            console.log(result.errMsg)
          }
        })
      }

    }
  })
            */
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
