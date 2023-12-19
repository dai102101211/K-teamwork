// pages/detail/detail.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // user:{
    //       head:"/images/mao.jpg",
    //       myname:"我是猫",
    //       mycredit:888,
    // },
    user:{},
    // my_post:{
    //   time:"22:17",
    //   title:"大四二手出售：这次体验超棒",
    //   content:"这次从学姐手里买的书，简直开阔了我的眼界",
    //   img:[
    //     "/images/gou.jpg",
    //     "/images/zhu.jpg",
    //     "/images/gou.jpg",
    //   ],
    //   tag:["hhhh","23333","你是猪"],
    //   zan:{
    //     num:0,
    //     flag:false,
    //     img:"/icons/zan0.png",
    //   },
    //   cmt:[
    //     {
    //       head:"/images/tuk.jpg",
    //       name:"tuk",
    //       content:"很不错值得点赞",
    //       time:"2023/11/14 13:07",
    //     },
    //     {
    //       head:"/images/gou.jpg",
    //       name:"gou",
    //       content:"很不错值得点赞",
    //       time:"2023/11/14 13:07",
    //     },
    //     {
    //       head:"/images/tuk.jpg",
    //       name:"333",
    //       content:"很不错值得点赞",
    //       time:"2023/11/14 13:07",
    //     },
    //   ],

    // },
    post:{},
    isShowInput: false,   /*默认隐藏输入框 */
    inputMessage:"",      /*每次发布成功后清空输入框 */
    my_user:{},
  },

  //进入发帖人个人主页
  click_home(e)
  {
    console.log("点击发帖人个人主页")
    wx.navigateTo({
      url:'/pages/packages_c/pages/home/home?my_user='+JSON.stringify(e.currentTarget.dataset.user),
    })
  },

  //点击tag进入相应的话题---通过搜索方式
  click_tag(e)
  {
    console.log(e.currentTarget.dataset.text)
    wx.navigateTo({
      url: '/pages/packages_c/pages/search/search?tag='+e.currentTarget.dataset.text,
    })
  },

  //点赞
  // zan(e)
  // {
  //   console.log("点赞")
  //   var temp_img = `my_post.zan.img`
  //   var temp_flag = `my_post.zan.flag`
  //   var temp_num = `my_post.zan.num`
  //   var temp = this.data.my_post.zan
  //   this.setData({
  //     [temp_img]:temp.flag?"/icons/zan0.png":"/icons/zan2.png",
  //     [temp_flag]:!temp.flag
  //   })
  //   if(temp.flag)   //加赞
  //   {
  //     this.setData({
  //       [temp_num]:temp.num+1
  //     })
  //   }
  //   else            //减赞
  //   {
  //     this.setData({
  //       [temp_num]:temp.num-1
  //     })
  //   }
  //   console.log(temp)
  //   //同步后端数据改变：
    
  // },
  zan(e)
  {
    var index = this.data.post.zan.flag.indexOf(app.globalData.openid);
    this.data.post.zan.img = index != -1?"/icons/zan0.png":"/icons/zan2.png";
    var last=false
    if(index == -1)  //加赞
    {
      this.data.post.zan.flag.push(app.globalData.openid);
      this.data.post.zan.num++;
    }
    else         //减赞
    {
      this.data.post.zan.flag.splice(index, 1);
      this.data.post.zan.num--;
      last=true
    }
    this.setData({
      post:this.data.post
    })
    console.log(this.data.post._id)
    //同步后端数据改变：
    wx.cloud.database().collection('community').doc(this.data.post._id).update({
      data:{
        zan:this.data.post.zan,
        last:last
      }
    })
  },
  //评论
  go_cmt(e)
  {
    console.log("写评论")
    this.ShowInput();
  },

  ShowInput()
  {
    this.setData({
      isShowInput: true
    })
  },

  HideInput()
  {
    this.setData({
      isShowInput: false
    })
  },

  write_cmt(event)
  {
    console.log(event.detail.value)
    this.setData({
      inputMessage:event.detail.value
    })
  },

  up_cmt()
  {
    console.log('cmt')
    if(this.data.inputMessage.length<1)
    {
      wx.showToast({
        icon:"none",
        title: '请输入评论٩(๑òωó๑)۶',
      })
      console.log("输入为空")
      return;
    }
    wx.showLoading({
      title: '(=_=)zzz...',
    })
    var user = this.data.user;
    var temp_cmt = {}
    temp_cmt.head = user.head;
    temp_cmt.nickname = user.nickname;
    temp_cmt.content = this.data.inputMessage;
    temp_cmt.time = app.ask_time();
    this.data.post.cmt.push(temp_cmt)
    this.setData({
      post:this.data.post,
      inputMessage:"",
    })
    //向后端发送请求同步数据：
    wx.cloud.database().collection('community').where({
      _id:this.data.post._id
    })
    .update({
      data:{
        cmt:this.data.post.cmt,
        last:false
      }
    }).then(res=>{
      console.log(res);
    })

    wx.hideLoading()
  },
  
  onLoad(options) {
    var that = this;
    console.log(options.id)
    wx.cloud.database().collection('community').where({
      _id:options.id
    })
    .get()
    .then(res=>{
      var post = res.data[0];
      var index = post.zan.flag.indexOf(app.globalData.openid);
      post.zan.img = index == -1?"/icons/zan0.png":"/icons/zan2.png";
      that.setData({
        post:post,
        my_user:app.globalData.me
      })
      wx.cloud.database().collection('user').where({
        _openid:that.data.post._openid
      }).get()
      .then(result=>{
        that.setData({user:result.data[0]})
        console.log(that.data.post.time)
      })
    })
    
  },
})