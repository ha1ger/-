// components/tag/tag.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    text: String,
    nums: Number,
    first: Boolean,
    second: Boolean
  },

  /**
   * 组件的初始数据
   */
  data: {
    bg:''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onTap (e) {
      this.triggerEvent('tapping',{
        value:this.properties.text
      })
    }
  },
  lifetimes:{
    attached() {
      if(this.properties.first){
        this.setData({
          bg: "#fffbdd"
        })
      }
      else if(this.properties.second){
        this.setData({
          bg: "#eefbff"
        })
      }
    }
  }
})
