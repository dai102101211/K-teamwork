// pages/recommend/recommend.js
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
    post_list:[],
    my_user: {},
    isShowMessMy:false,
  },

  //分区1-首部导航

  //点击导航
  activeNav(e) {
    console.log("点击导航");
    this.setData({
      currentIndexNav: e.target.dataset.index
    })
    console.log(e.target.dataset.index)
    if (this.data.currentIndexNav == 1)        //搜索
      wx.redirectTo({
        url: '/pages/packages_c/pages/search/search',
      })
    else if (this.data.currentIndexNav == 2)   //我的帖子
      wx.redirectTo({
        url: '/pages/packages_c/pages/my_card/my_card',
      })
  },


  //分区2-浏览区

  //进入发帖人个人主页
  click_home(e) {
    var U = e.currentTarget.dataset.my_user
    console.log("点击发帖人个人主页")
    console.log(U)
    wx.navigateTo({
      url: '/pages/packages_c/pages/home/home?openid=' + U,
    })
  },

  //进入帖子详情
  click_detail(e) {
    console.log(e)
    var I = e.currentTarget.dataset.item
    console.log("点击帖子详情")
    console.log("传递数据：\n")
    console.log(I)
    wx.navigateTo({
      url: '/pages/packages_c/pages/detail/detail?&id=' + I._id,
    })
  },

  //点赞
  zan(e)
  {
    console.log("点赞");
    console.log(e)
    var id = e.currentTarget.dataset.index
    console.log(this.data.post_list[id])
    var index = this.data.post_list[id].zan.flag.indexOf(app.globalData.openid);
    var last=false;
    this.data.post_list[id].zan.img = index != -1?"/icons/zan0.png":"/icons/zan2.png";
    if(index == -1)  //加赞
    {
      this.data.post_list[id].zan.flag.push(app.globalData.openid);
      this.data.post_list[id].zan.num++;
    }
    else         //减赞
    {
      this.data.post_list[id].zan.flag.splice(index, 1);
      this.data.post_list[id].zan.num--;
      last=true;
    }
    this.setData({
      post_list:this.data.post_list
    })
    //同步后端数据改变：
    wx.cloud.database().collection('community').doc(this.data.post_list[id]._id).update({
      data:{
        zan:this.data.post_list[id].zan,
        last:last
      }
    })
    console.log(11111)
  },

  //评论
  comment(e) {
    console.log("点击外评论");
    this.click_detail(e);
  },

  //分区3-底部导航

  //底部导航
  skip(e) {
    console.log(e.currentTarget.dataset.id)
    this.setData({
      bt_index: e.currentTarget.dataset.id
    })
    if (e.currentTarget.dataset.id == 0) {
      console.log("点击首页")
      wx.redirectTo({
        url: '/pages/home  page/home page',
      })
    }
    if (e.currentTarget.dataset.id == 1) {
      console.log("点击发帖")
      wx.navigateTo({
        url: '/pages/packages_c/pages/upload/upload',
      })
    }
    if (e.currentTarget.dataset.id == 2) {
      console.log("点击我的")
      wx.redirectTo({
        url: '/pages/my/my',
      })
    }
  },

  //获取帖子信息
  get_scan_list() {
    //向后端发送请求获取帖子
  },

  onLoad: function (options) {
    //获取帖子数据
    var that = this;
    wx.cloud.callFunction({
      name:'recommend_post'
    }).then(res=>{
      console.log(res.result.list);
      var tmp = res.result.list;
      for(var i = 0;i < tmp.length;++i){
        tmp[i].head = tmp[i].u[0].head;
        tmp[i].nickname = tmp[i].u[0].nickname;
        delete tmp[i].u;
        var index = tmp[i].zan.flag.indexOf(app.globalData.openid);
        tmp[i].zan.img = index == -1?"/icons/zan0.png":"/icons/zan2.png";
      }
      that.setData({
        post_list:tmp,
        my_user:app.globalData.me,
      })
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
    })
  },
  onShow:function(options) {
    
    // wx.cloud.database().collection('community').orderBy('post.time', 'desc').get()
    //   .then(res => {
    //     console.log(res.data);
    //     var list = [];
    //     for(var i = 0;i < res.data.length;i++){
    //       list.push(
    //         res.data[i]
    //       )
    //     }
    //     this.setData({
    //       my_user: app.globalData.my_user,
    //       post_list: list
    //     })
    //     console.log(this.data.post_list)
    //   })
  }
})
