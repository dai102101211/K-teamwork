// pages/my_card/my_card.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //当前导航索引
    currentIndexNav:2,
    //底部导航索引
    bt_index:0,
    //我的帖子信息
    //
    post:[],
    isShowMessMy:false,
  },

//分区1-首部导航

  //点击导航
  activeNav(e)
  {
    console.log("点击导航");
    this.setData({
      currentIndexNav:e.target.dataset.index
    })
    console.log(e.target.dataset.index)
    if(this.data.currentIndexNav==0)
    wx.redirectTo({
      url: '/pages/recommend/recommend',
    })
    else if(this.data.currentIndexNav==1)
    wx.redirectTo({
      url: '/pages/packages_c/pages/search/search',
    })
  },


//分区2-浏览区

  //进入帖子详情
  click_detail(e)
  {
    console.log("点击帖子详情")
    console.log("传递数据：\n")
    var id = e.currentTarget.dataset.index;
    console.log(this.data.post[id])
        //------------------------new
        var that = this;
        wx.cloud.database().collection('community').where({
          _id:that.data.post[id]._id
        }).update({
          data:{
            last:true
          }
        })
        //--------------------------new
    wx.navigateTo({
      url:'/pages/packages_c/pages/detail/detail?id='+this.data.post[id]._id,
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
    }
    this.setData({
      post:this.data.post
    })
    //同步后端数据改变：
    wx.cloud.database().collection('community').doc(this.data.post[id]._id).update({
      data:{
        zan:this.data.post[id].zan
      }
    })
  },

  //评论
  comment(e)
  {
    console.log("点击外评论");
    this.click_detail(e);
  },

//分区3-底部导航

  //底部导航
  skip(e)
  {
    console.log( e.currentTarget.dataset.id)
    this.setData({
      bt_index:e.currentTarget.dataset.id
    })
    if(e.currentTarget.dataset.id==0)
    {
      console.log("点击首页")
      wx.redirectTo({
        url: '/pages/home  page/home page',
      })
    }
    if(e.currentTarget.dataset.id==1)
    {
      console.log("点击发帖")
      wx.navigateTo({
        url: '/pages/packages_c/pages/upload/upload',
      })
    }
    if(e.currentTarget.dataset.id==2)
    {
      console.log("点击我的")
      wx.redirectTo({
        url: '/pages/my/my',
      })
    }
  },


  cancel(event) {
    var item = event.currentTarget.dataset.item;
    var index = event.currentTarget.dataset.index;
    wx.cloud.database().collection('community').where({
      _id:item._id
    }).remove()
    .then(res=>{
      console.log(res);
    })
   this.data.post.splice(index, 1);
    this.setData({
      post:this.data.post
    })
    wx.setStorageSync('my_post', this.data.post);
  },

  onLoad:function(options){
    wx.cloud.database().collection('community').where({
      _openid:app.globalData.openid
    }).get()
    .then(res=>{
      console.log(res);
      var tmp = res.data;
      for(var i = 0;i < tmp.length;i++){
        // tmp[i].time = res.data[i].time.toLocaleDateString() + ' ' + res.data[i].time.toTimeString().substring(0, 5);
        var index = res.data[i].zan.flag.indexOf(app.globalData.openid);
        tmp[i].zan.img = index == -1?"/icons/zan0.png":"/icons/zan2.png";
      }
      this.setData({post:tmp});
    })
  var that=this
    console.log("my_card receive options:\n")
    console.log("get my user:\n")
    console.log(this.data.my_user)

    //红点显示
    wx.cloud.database().collection('order').where({
      $or: [
        { from: app.globalData.openid },
        { to: app.globalData.openid }
      ]
    })
    .watch({
      onChange:function(snapshot){
        console.log('order:',snapshot)
        if(snapshot.docs.length>0)
        {
          for(var i=0;i<snapshot.docs.length;i++)
          {
            if(snapshot.docs[i].from==app.globalData.openid)
            {
              if(snapshot.docs[i].from_last==false)
              {
                app.globalData.MessMy=true;
              }
            } 
            else if(snapshot.docs[i].to==app.globalData.openid)
              {
                if(snapshot.docs[i].to_last==false)
                {
                  app.globalData.MessMy=true;
                }
              }
          }
        }
        that.setData({
          isShowMessMy:app.globalData.MessMy
        })
      },
      onError:function(err) {
        console.log('order',err);
      }
    })
  },
  // cancel(e){
  //   var item = e.currentTarget.dataset.item;
  //   var index= e.currentTarget.dataset.index;
  //   var post=this.data.post;
  //   console.log(index);
  //   console.log(item);
  //   console.log(post);
  //   post.splice(index-1, 1);
  //       this.setData({
  //         post:post
  //       })
  // },
  onShow:function() {
    wx.cloud.database().collection('community').where({
      _openid:app.globalData.openid
    }).get()
    .then(res=>{
      console.log(res);
      var tmp = res.data;
      for(var i = 0;i < tmp.length;i++){
        // tmp[i].time = res.data[i].time.toLocaleDateString() + ' ' + res.data[i].time.toTimeString().substring(0, 5);
        var index = res.data[i].zan.flag.indexOf(app.globalData.openid);
        tmp[i].zan.img = index == -1?"/icons/zan0.png":"/icons/zan2.png";
      }
      this.setData({post:tmp});
    })

    console.log("my_card receive options:\n")
    console.log("get my user:\n")
    console.log(this.data.my_user)
  }
})
