// components/information/information.js
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    isHidden:{
      type:Boolean,
      value:true
  },
  message: {
    type:Object,
    value: {}
  }
  },

  /**
   * 组件的初始数据
   */
  data: {
   
  },
  /**
   * 组件的方法列表
   */
  methods: {
    onLoad: function () {
      console.log(this.properties.message); // Hello from parent
    },
    hidepopups:function(){
      this.setData({
      isHidden: true
      })
    }
  }
})