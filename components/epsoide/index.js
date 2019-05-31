// components/epsoide/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    index: {
      type: String
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    year: 0,
    month: "",
    monthArray: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月',]
  },

  /**
   * 组件的方法列表
   */
  methods: {
  },
  
  attached:function(){
    var myDate = new Date()
    let year = myDate.getFullYear()
    let month = myDate.getMonth()
    this.setData({
      year: year,
      month: this.data.monthArray[month]
    })
  }
})
