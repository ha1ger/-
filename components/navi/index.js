// components/navi/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: String,
    first: Boolean,
    latest: Boolean
  },

  /**
   * 组件的初始数据
   */
  data: {
    imgUrl:{
      whiteLeft: 'images/triangle.dis@left.png',
      whiteRight: 'images/triangle.dis@right.png',
      blackLeft: 'images/triangle@left.png',
      blackRight: 'images/triangle@right.png'
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLeft:function(e){
      if(!this.properties.latest){
        this.triggerEvent('next')
      }
    },
    onRight:function(e){
      if(!this.properties.first){
        this.triggerEvent('pre')
      }
    }
  }
})
