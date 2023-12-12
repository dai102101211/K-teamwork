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
    //浏览区帖子信息
    // post_list: [
    //   {
    //     my_user: {
    //       user: {
    //         head: "/images/tuk.jpg",
    //         myname: "tuk",
    //         mycredit: 1000,
    //       },
    //       post: [
    //         {
    //           time: "2023/11/06 17:25",
    //           title: "大四二手出售：这次体验超棒",
    //           content: "这次从学姐手里买的便利贴，简直开阔了我的眼界",
    //           img: [
    //             "/images/gou.jpg",
    //             "/images/zhu.jpg",
    //             "/images/gou.jpg",
    //           ],
    //           tag: ["12345", "tuk", "鹅鹅鹅", "1111111111", "abcdefg"],
    //           zan: {
    //             num: 10,
    //             flag: false,
    //             img: "/icons/zan0.png",
    //           },
    //           cmt: [
    //             {
    //               head: "/images/橘子.jpg",
    //               name: "橘子",
    //               content: "点赞",
    //               time: "2023/11/14 13:24",
    //             }
    //           ],
    //         },
    //         {
    //           time: "2023/11/06 19:55",
    //           title: "大四二手出售：这次体验超棒",
    //           content: "这次从学姐手里买的空气，简直开阔了我的眼界",
    //           img: [
    //             "/images/zhu.jpg",
    //           ],
    //           tag: ["空气"],
    //           zan: {
    //             num: 0,
    //             flag: false,
    //             img: "/icons/zan0.png",
    //           },
    //           cmt: [
    //             {
    //               head: "/images/橘子.jpg",
    //               name: "橘子",
    //               content: "不错不错",
    //               time: "2023/11/20 13:24",
    //             }
    //           ],
    //         },
    //       ]

    //     },
    //     post: {
    //       time: "2023/11/06 17:25",
    //       title: "大四二手出售：这次体验超棒",
    //       content: "这次从学姐手里买的便利贴，简直开阔了我的眼界",
    //       img: [
    //         "/images/gou.jpg",
    //         "/images/zhu.jpg",
    //         "/images/gou.jpg",
    //       ],
    //       tag: ["12345", "tuk", "鹅鹅鹅", "1111111111", "abcdefg"],
    //       zan: {
    //         num: 2000,
    //         flag: false,
    //         img: "/icons/zan0.png",
    //       },
    //       cmt: [
    //         {
    //           head: "/images/橘子.jpg",
    //           name: "橘子",
    //           content: "点赞",
    //           time: "2023/11/14 13:24",
    //         }
    //       ],
    //     }
    //   },

    //   {
    //     my_user: {
    //       user: {
    //         head: "/images/糖果.jpg",
    //         myname: "糖果",
    //         mycredit: 233,
    //       },
    //       post: [
    //         {
    //           time: "2023/11/06 17:27",
    //           title: "大四二手出售：这次体验超棒",
    //           content: "这次从学姐手里买的糖果，简直开阔了我的眼界",
    //           img: [
    //             "/images/zhu.jpg",
    //           ],
    //           tag: ["22222222", "tuk", "鹅鹅鹅", "1111111111"],
    //           zan: {
    //             num: 888,
    //             flag: false,
    //             img: "/icons/zan0.png",
    //           },
    //           cmt: [
    //             {
    //               head: "/images/tuk.jpg",
    //               name: "tuk",
    //               content: "不给糖就捣蛋",
    //               time: "2023/11/14 13:44",
    //             },
    //             {
    //               head: "/images/橘子.jpg",
    //               name: "橘",
    //               content: "不给橘子就捣蛋",
    //               time: "2023/11/14 13:45",
    //             }

    //           ],
    //         }
    //       ]
    //     },
    //     post: {
    //       time: "2023/11/06 17:27",
    //       title: "大四二手出售：这次体验超棒",
    //       content: "这次从学姐手里买的糖果，简直开阔了我的眼界",
    //       img: [
    //         "/images/zhu.jpg",
    //       ],
    //       tag: ["22222222", "tuk", "鹅鹅鹅", "1111111111"],
    //       zan: {
    //         num: 888,
    //         flag: false,
    //         img: "/icons/zan0.png",
    //       },
    //       cmt: [
    //         {
    //           head: "/images/tuk.jpg",
    //           name: "tuk",
    //           content: "不给糖就捣蛋",
    //           time: "2023/11/14 13:44",
    //         },
    //         {
    //           head: "/images/橘子.jpg",
    //           name: "橘",
    //           content: "不给橘子就捣蛋",
    //           time: "2023/11/14 13:45",
    //         }

    //       ],
    //     }
    //   },

    //   {
    //     my_user: {
    //       user: {
    //         head: "/images/帽子.jpg",
    //         myname: "帽子",
    //         mycredit: 417,
    //       },
    //       post: [
    //         {
    //           time: "2023/11/06 17:28",
    //           title: "大四二手出售：这次体验超棒",
    //           content: "这次从学姐手里买的帽子，简直开阔了我的眼界",
    //           img: [
    //             "/images/dog.jpg",
    //           ],
    //           tag: [],
    //           zan: {
    //             num: 0,
    //             flag: false,
    //             img: "/icons/zan0.png",
    //           },
    //           cmt: [],
    //         }
    //       ]
    //     },
    //     post: {
    //       time: "2023/11/07 17:28",
    //       title: "大四二手出售：这次体验超棒",
    //       content: "这次从学姐手里买的帽子，简直开阔了我的眼界",
    //       img: [
    //         "/images/dog.jpg",
    //       ],
    //       tag: [],
    //       zan: {
    //         num: 1,
    //         flag: false,
    //         img: "/icons/zan0.png",
    //       },
    //       cmt: [],
    //     }
    //   },

    //   {
    //     my_user: {
    //       user: {
    //         head: "/images/橘子.jpg",
    //         myname: "TUK",
    //         mycredit: 417,
    //       },
    //       post: [
    //         {
    //           time: "2023/11/08 17:29",
    //           title: "大四二手出售：这次体验超棒",
    //           content: "这次从学姐手里买的橘子，简直开阔了我的眼界",
    //           tag: ["4", "tuk", "鹅鹅鹅", "1111111111"],
    //           zan: {
    //             num: 0,
    //             flag: false,
    //             img: "/icons/zan0.png",
    //           },
    //           cmt: [],
    //         }
    //       ]
    //     },

    //     post: {
    //       time: "2023/11/08 17:29",
    //       title: "大四二手出售：这次体验超棒",
    //       content: "这次从学姐手里买的橘子，简直开阔了我的眼界",
    //       tag: ["4", "tuk", "鹅鹅鹅", "1111111111"],
    //       zan: {
    //         num: 0,
    //         flag: false,
    //         img: "/icons/zan0.png",
    //       },
    //       cmt: [],
    //     }
    //   },

    // ],
    //
    post_list:[],
    my_user: {},
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
      url: '/pages/packages_c/pages/home/home?openid' + U._openid,
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
        zan:this.data.post_list[id].zan
      }
    })
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
        my_user:app.globalData.me
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
