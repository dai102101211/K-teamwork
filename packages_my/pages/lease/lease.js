// pages/lease/lease.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hide: true,
    User:{},
    user:{},
    order:[]
  },

  goleasewill:function(){
    wx.redirectTo({
      url: '/pages/packages_my/pages/leasewill/leasewill'
    })
   },

   gochatroom:function(e){
    const index = e.currentTarget.dataset.index;
    console.log(index);
    var openid = '';
    if( this.data.order[index].u_from[0]._openid == app.globalData.me._openid){
      openid = this.data.order[index].u_to[0]._openid;
    }
    else{
      openid = this.data.order[index].u_from[0]._openid;
    }
    wx.navigateTo({
      url: '/pages/packages_my/pages/chatroom/chatroom?openid=' + openid
    })
   },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 两个方法均可
    this.setData({
      user: app.globalData.me
    })
    var that = this;
    wx.cloud.database().collection('user').where({
      _openid:app.globalData.openid
    })
    .watch({
      // 数据库变化会执行
      onChange:function(snapshot){
        console.log(snapshot);
        app.globalData.me = snapshot.docs[0];
        that.setData({
          user:app.globalData.me
        })
        wx.cloud.callFunction({
          name:'get_lease_list'
        }).then(res=>{
          console.log(res.result.list)
          res.result.list.reverse()
          that.setData({
            order:res.result.list
          })
        })
      },
      // 错误
      onError:function(err) {
        console.log(err);
      }
    })

    // wx.cloud.database().collection('order').where({
    //   _openid:app.globalData.openid
    // })
    // .watch({
    //   // 数据库变化会执行
    //   onChange:function(snapshot){
    //     console.log(snapshot);
    //     var order= snapshot.docs;
    //     that.setData({
    //       order:order
    //     })
    //   },
    //   // 错误
    //   onError:function(err) {
    //     console.log(err);
    //   }
    // })
  },
  progress:function(e)
  {
    const id = e.currentTarget.dataset.id;
    const index = e.currentTarget.dataset.index;
    const item = e.currentTarget.dataset.item;
    console.log(item)
    console.log(index)
    console.log(id)
    var order=this.data.order;
    const db = wx.cloud.database();
      const _ = db.command;
      db.collection('order').where({
        _id: order[index]._id
      })
      .watch({
        // 数据库变化会执行
        onChange:function(snapshot){
          console.log(snapshot);
          wx.cloud.callFunction({
            name:'get_lease_list'
          }).then(res=>{
            console.log(res.result.list)
            res.result.list.reverse()
            that.setData({
              order:res.result.list
            })
          })
        },
        // 错误
        onError:function(err) {
          console.log(err);
        }
      })
    console.log(order)
    console.log(id)
    var status=order[index].status;
    order[index].status=id
    console.log(order[index].status)
    this.setData({
      order:order
    })
    var that = this;
    if (status != id) {
      var from=true;
      var to=true;
      if(id!=7)
      {
        if(item.from==app.globalData.openid)
        {
          to=false;
          console.log("aa")
        }
        else if(item.to==app.globalData.openid)
        {
          from=false;
          console.log("bb")
        }
      }
      console.log(from)
      console.log(to)     
      // 同步订单状态到数据库
      db.collection('order').where({
        _id: that.data.order[index]._id
      }).update({
        data: {
          status: that.data.order[index].status,
          from_last:from,
          to_last:to
        }
      }).then(res => {
        console.log(res)
      })
      status=order[index].status
      if (status == 7) {
        // 双方完成数加一
        // db.collection('order').where({
        //   _id: that.data.order[index]._id
        // }).update({
        //   data: {
        //     // deal: false
        //     from_last:true,
        //     to_last:true
        //   }
        // }).then(res => {
        //   console.log(res)
        // })
        var user_from = that.data.order[index].u_from;
        var user_to = that.data.order[index].u_to;
        var from_rate = (user_from[0].complete + 1)/ user_from[0].order;
        var to_rate = (user_to[0].complete + 1)/ user_to[0].order;
        from_rate=Math.round(from_rate*100)/100;
        to_rate=Math.round(to_rate*100)/100;
        console.log(from_rate);
        console.log(to_rate);
        db.collection('user').where({
          _openid:that.data.order[index].u_from[0]._openid,
        }).update({
          data: {
            complete: _.inc(1),
            rate:from_rate
          }
        })
        .then(res => {
          console.log(res);
        })
        db.collection('user').where({
          _openid:that.data.order[index].u_to[0]._openid,
        }).update({
          data: {
            complete: _.inc(1),
            rate:to_rate
          }
        })
        .then(res => {
          console.log(res);
        })
      }
    }
  },
  showHidden:function(e){
    const index = e.currentTarget.dataset.index;
    const item = e.currentTarget.dataset.item;
    console.log(index);
    console.log(item)
    this.data.User=item;
    console.log( this.data.User)
    this.setData({
      hide: false,  // 点击按钮切换显示状态
      User:this.data.User
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