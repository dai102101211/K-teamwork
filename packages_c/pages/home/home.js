// pages/home/home.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
   //当前导航索引
   currentIndexNav: 0,
   //底部导航索引
   bt_index: 0,
   post:[],
   user: {},
   isShowMessMy:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log("home receive options:\n")
    console.log(options)
    var that = this;
    wx.cloud.database().collection('user').where({
      _openid:options.openid
    }).get()
    .then(res=>{
      that.setData({user:res.data[0]})
    })
    wx.cloud.database().collection('community').where({
      _openid:options.openid
    }).get()
    .then(result=>{
      console.log(result.data)
      that.setData({post:result.data})
    })
    
  },

  click_detail(e)
  {
    var index = e.currentTarget.dataset.index;
    console.log("点击帖子详情")
    wx.navigateTo({
      url:'/pages/packages_c/pages/detail/detail?id='+ this.data.post[index]._id,
    })
  },

  //点赞
  zan(e)
  {
    console.log("点赞");
    console.log(e)
    var id = e.currentTarget.dataset.index
    console.log(this.data.post[id])
    var index = this.data.post[id].zan.flag.indexOf(app.globalData.openid);
    var last=false;
    this.data.post[id].zan.img = index != -1?"/icons/zan0.png":"/icons/zan2.png";
    if(index == -1)  //加赞
    {
      this.data.post[id].zan.flag.push(app.globalData.openid);
      this.data.post[id].zan.num++;
    }
    else         //减赞
    {
      this.data.post[id].zan.flag.splice(index, 1);
      this.data.post[id].zan.num--;
      last=true;
    }
    this.setData({
      post:this.data.post
    })
    //同步后端数据改变不然单页面的数据改动无法保存下来：
    wx.cloud.database().collection('community').doc(this.data.post[id]._id).update({
      data:{
        zan:this.data.post[id].zan,
        last:last
      }
    })
  },

  //评论
  comment(e)
  {
    console.log("评论");
  },
})