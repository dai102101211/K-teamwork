// pages/my/my.js
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    img_0: 'https://img-community.csdnimg.cn/images/89a40522b90b44fea4e2d195991d9a83.png',
    img_1: 'https://img-community.csdnimg.cn/images/603c608f75874100b2c5cfc097497417.png',
    img_2: 'https://img-community.csdnimg.cn/images/8751b9143d234ae4b6cefba0ffeb8034.png',
    //  排行榜onload()给出
    rankinglist: [],
    // 用户的订单数，完成数onload()给出
    user: {},
    isShowMessC:false,
    isShowMessMy:false,
    isShowM:[false,false,false,false],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // this.setData({
    //   user: app.globalData.me
    // })
    
    var that = this;
    const db = wx.cloud.database();
    const _ = db.command;
    var that = this;
    db.collection('user').where({
      _openid: app.globalData.openid
    })
      .watch({
        // 数据库变化会执行
        onChange: function (snapshot) {
          console.log('snapshot:',snapshot);
          app.globalData.me = snapshot.docs[0];
          that.setData({
            user: app.globalData.me
          })
          db.collection('user').where({
            complete:_.gt(0)
          }).orderBy('rate', 'desc').orderBy('complete', 'desc').limit(20).get()
          .then(res=>{
            console.log(res);
            var tmp = res.data;
            for(var i = 0;i < tmp.length;++i){
              tmp[i].rate = (tmp[i].rate*100) + '%';
            }
            that.setData({
              rankinglist:tmp
            })
          })
          // wx.cloud.callFunction({
          //   name:'get_sell_list',
          //   // name:'',
          // }).then(res=>{
          //   console.log(res.result.list)
          //   res.result.list.reverse()
          // })
          // wx.cloud.callFunction({
          //   name:'get_donation_list',
          //   // name:'',
          // }).then(res=>{
          //   console.log(res.result.list)
          //   res.result.list.reverse()
          // })
          // wx.cloud.callFunction({
          //   name:'get_exchange_list',
          //   // name:'',
          // }).then(res=>{
          //   console.log(res.result.list)
          //   res.result.list.reverse()
          // })
          // wx.cloud.callFunction({
          //   name:'get_lease_list',
          //   // name:'',
          // }).then(res=>{
          //   console.log(res.result.list)
          //   res.result.list.reverse()
          // })
        },
        // 错误
        onError: function (err) {
          console.log(err);
        }
      })
     //实时显示消息红点
    db.collection('community').where({
      _openid:app.globalData.openid
    })
    .watch({
      onChange:function(snapshot){
        console.log('community:',snapshot)
        console.log(this)
        console.log(snapshot.docs.length)
        //有消息传来显示小红点
        if(snapshot.docs.length!=0)
        {
          for(var i=0;i<snapshot.docs.length;i++)
          {
            if(snapshot.docs[i].last==false)
            {
              app.globalData.MessC=true;
            }
          }
        }
        that.setData({
          isShowMessC:app.globalData.MessC
        })
      },
      onError:function(err) {
        console.log('community',err);
      }
    })
    db.collection('order').where({
      $or: [
        { from: app.globalData.openid },
        { to: app.globalData.openid }
      ]
    })
    .watch({
      onChange:function(snapshot){
        console.log('order:',snapshot)
        //有消息传来显示小红点
        // app.globalData.MessMy = true;
        if(snapshot.docs.length>0)
        {
          var good_id=[]
          for(var i=0;i<snapshot.docs.length;i++)
            if(snapshot.docs[i].from==app.globalData.openid)
            {
              if(snapshot.docs[i].from_last==false)
              {
                good_id.push(snapshot.docs[i].good_id)
              }
            }
            else if(snapshot.docs[i].to==app.globalData.openid)
            {
              if(snapshot.docs[i].to_last==false)
              {
                good_id.push(snapshot.docs[i].good_id)
              }
            }
        }
        db.collection('goods').where({
          _id:_.in(good_id)
        }).get()
        .then(res => {
          console.log(res.data)
          if(res.data.length>0)
          {
            for(var i=0;i<res.data.length;i++)
            {
              if(res.data[i].type==2)
              {
                that.data.isShowM[2]=true;
              }
              else if(res.data[i].type==1)
              {
                that.data.isShowM[0]=true;
              }
              else if(res.data[i].type==3)
              {
                that.data.isShowM[3]=true;
              }
              else if(res.data[i].type==4)
              {
                that.data.isShowM[1]=true;
              }
            }
            console.log(that.data.isShowM)
            that.setData({
              isShowM:that.data.isShowM
            })
          }
        })
        const trueCount = that.data.isShowM.reduce((count, value) => count + (value ? 1 : 0), 0);
        console.log('truecount:',trueCount)
        if(trueCount==0)
          app.globalData.MessMy=false
        else 
        app.globalData.MessMy = true
        that.setData({
          isShowMessMy:app.globalData.MessMy
        })
      },
      onError:function(err) {
        console.log('order',err);
      }
    }) 
  },
  onShow() {
    this.onLoad();
  },
  jump(ev) {
    let id = ev.currentTarget.id;
    console.log(id);
    let page = { 'home': '/pages/home  page/home page', 'community': '/pages/recommend/recommend' };
    wx.redirectTo({
      url: page[id],
    })
  },
  sell: function () {
    var user = this.data.user
    wx.navigateTo({
      url: '/pages/packages_my/pages/sell/sell?my_user=' + JSON.stringify(user)
    })
  },
  donation: function () {
    var user = this.data.user
    wx.navigateTo({
      url: '/pages/packages_my/pages/donation/donation?my_user=' + JSON.stringify(user)
    })
  },
  exchange: function () {
    var user = this.data.user
    wx.navigateTo({
      url: '/pages/packages_my/pages/exchange/exchange?my_user=' + JSON.stringify(user)
    })
  },
  lease: function () {
    var user = this.data.user
    wx.navigateTo({
      url: '/pages/packages_my/pages/lease/lease?my_user=' + JSON.stringify(user)
    })
  },
  Pop_ups: function () {
    var user = this.data.user
    wx.navigateTo({
      url: '/pages/packages_my/pages/Pop-ups/Pop-ups?my_user=' + JSON.stringify(user)
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