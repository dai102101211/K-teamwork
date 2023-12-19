// pages/recommend/recommend.js
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
      //当前导航索引
      currentIndexNav:1,
      //底部导航索引
      bt_index:0,
      //搜索关键词
      key_word:'',
      inputMessage:'',
      history:[],
      my_user:{},
      search_respond: false,    //后端提供数据后帖子才能显示
      isShowMessMy:false,
      post_list:[]
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
      else if(this.data.currentIndexNav==2)
      wx.redirectTo({
        url: '/pages/packages_c/pages/my_card/my_card',
      })
    },
  
  //分区2-搜索区

  //获取表单数据
  go_search(e)
  {
    if(!e.detail.value||e.detail.value.trim()==='') return;     //控制搜索字不为空或空串
    var str = e.detail.value.trim()
    this.setData({
      key_word:str,
    })
  
    this.search()

    
  },
  
  //点击搜索记录可再次搜索
  search_again(e)
  {
    console.log(e.currentTarget.dataset.text)
    this.setData({
      key_word:e.currentTarget.dataset.text,
      inputMessage:e.currentTarget.dataset.text,
    })
    this.search()
  },

  search()
  {
    wx.showLoading({
      title: '(=_=)zzz...',
    })

    //向后端发送搜索关键字请求获取post_list:
    // wx.cloud.database().collection('community').where(
    //   wx.cloud.database().command.or([
    //     {
    //       'title':wx.cloud.database().RegExp({
    //         regexp: this.data.key_word,
    //         options:'i'
    //       })
    //     },
    //     {
    //       'tag':wx.cloud.database().RegExp({
    //         regexp: this.data.key_word,
    //         options:'i'
    //       })
    //     }
    //   ])
    // ).orderBy('time','desc').limit(20).get()
    // .then(res=>{
    //   console.log(res)
    //   var list = [];
    //   for(var i = 0;i < res.data.length;i++){
    //     list.push(res.data[i])
    //   }
    //   this.setData({
    //     post_list:list
    //   })
    // })
    wx.cloud.callFunction({
      name:'search_post',
      data:{
        tag:this.data.key_word
      }
    }).then(res=>{
      console.log(res);
      var tmp = res.result.list;
      if(tmp.length==0)
      {
        wx.showModal({
          title: '提示',
          content: '搜索为空٩(๑òωó๑)۶',
          success(res) {
            if (res.confirm) {
              console.log('用户点击确定')
          }
        }
        })
      }
      for(var i = 0;i < tmp.length;++i){
        tmp[i].head = tmp[i].u[0].head;
        tmp[i].nickname = tmp[i].u[0].nickname;
        delete tmp[i].u;
        var index = tmp[i].zan.flag.indexOf(app.globalData.openid);
        tmp[i].zan.img = index == -1?"/icons/zan0.png":"/icons/zan2.png";
      }
      this.setData({post_list:tmp})
    })

    //更新搜索记录，并将search_respond设为true：
    this.data.history.unshift(this.data.key_word)
    this.data.history=this.data.history.filter((item, index) => {
      return this.data.history.indexOf(item) === index;
    });//重复的搜索只保留最新的一个
    this.setData({
      search_respond:true,
      history:this.data.history
    })
    wx.setStorageSync('history', this.data.history)
    //console.log(app.globalData.my_user.search_history)
    //搜索成功后隐藏loading框
    setTimeout(function () {
      wx.hideLoading()
    }, 200)    
  },
  
  //删除搜索记录
  delete_sr()
  {
    this.setData({
      history:[]
    })
    //向后端发送请求同步数据：
    wx.setStorageSync('history', this.data.history);
  },

  //进入发帖人个人主页
  click_home(e)
  {
    var U=e.currentTarget.dataset.my_user
    console.log("点击发帖人个人主页")
    console.log(U)
    wx.navigateTo({
      url:'/pages/packages_c/pages/home/home?openid='+ U._openid,
    })
  },

  //进入帖子详情
    
  click_detail(e)
  {
    console.log("点击帖子详情")
    console.log("传递数据：\n")
    var index = e.currentTarget.dataset.index;
    console.log(index)
    console.log(this.data.post_list[index])
    wx.navigateTo({
      url:'/pages/packages_c/pages/detail/detail?id='+ this.data.post_list[index]._id,
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
    }
    this.setData({
      post_list:this.data.post_list
    })
    //同步后端数据改变：
    wx.cloud.database().collection('community').doc(this.data.post_list[id]._id).update({
      data:{
        zan:this.data.post_list[id].zan,
        last:false
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
  
  
    onLoad:function(options){
      console.log(options)
      if(wx.getStorageSync('history')){
        this.setData({history : wx.getStorageSync('history')})
      }
      this.setData({
        my_user:app.globalData.me
      })
      
      var that = this
      if(options.tag)   //点击tag而来
      {
        this.setData({
          key_word:options.tag,
          inputMessage:options.tag,
        })
        this.search()
      }
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
    
})