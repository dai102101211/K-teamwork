// pages/select/select.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    search :[],
    image:[],
    height:0,
    get:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let screenHeight = wx.getSystemInfoSync().windowHeight;
    this.setData({
      height: screenHeight - 380,
    })
  },
  input(e)
  {
    this.data.get=e.detail.value;
    this.setData({
      get:this.data.get
    })
  },
  search()
  {
  	wx.cloud.database().collection('goods').where({
      name:wx.cloud.database().RegExp({
        regexp: this.data.get,
        options:'i'
      }),
      deal:false
    }).get()
    .then(res=>{
      console.log(res);
      var fileList = [];
      var search=[];
      var n = res.data.length;
      var i=0;
      for(i = 0;i < n;i++)
      {
        var type = "";
        var way = "";
        var name = "";
        if(res.data[i].type=='1')
            {type="待出售";
            way=res.data[i].special.money}
        else if(res.data[i].type=='2')
            {type="待交换";
            way=res.data[i].special.item}
        else if(res.data[i].type=='3')
            {type="待出租";
            way=res.data[i].special.money+'r /'+res.data[i].special.rent_time}
        var S={'id':i,'name':res.data[i].name,'type':type,'way':way,'detail':res.data[i].detail,'contact':res.data[i].contact,'openid':res.data[i]._openid,'_id':res.data[i]._id};
        search.push(S);
        fileList.push(res.data[i].img[0]);
        this.data.image.push(res.data[i].img)
        console.log(this.data.image)
     }
    console.log(fileList);
    for(var i=0;i< fileList.length;i++)
    {
      search[i]['img']=fileList[i];
    }
    // console.log(fileList);
      // 根据图片fileID获取图片临时链接
    //   wx.cloud.getTempFileURL({
    //     fileList: fileList,
    //     success: result => {
    //       console.log(result.fileList);
    //       for(var j = 0;j < result.fileList.length;j++){
    //         search[j]["img"] = result.fileList[j].tempFileURL;
    //       }
          this.setData({
            search:search,
            image:this.data.image
          })
          console.log(this.data.search);
    //     },
    //     fail: console.error
    //   })
    });
  },
  select:function(e)
  {
    var id=e.currentTarget.dataset.id;
    // var search=this.data.search;
    wx.navigateTo({
      url: '/pages/packages_home/pages/display/display?information=' + JSON.stringify(this.data.search[id]) + '&image='+JSON.stringify(this.data.image[id])+'&in='+ true,
    });
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