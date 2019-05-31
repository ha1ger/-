// components/classic/music/index.js

import { classicBeh } from '../classic-beh.js'
const music = wx.getBackgroundAudioManager()
Component({
  /**
   * 组件的属性列表
   */
  behaviors: [classicBeh],
  properties: {
    src: String,
    title: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    playerUrl:{
      yes: 'images/player@playing.png',
      no: 'images/player@waitting.png'
    },
    playing: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    playingChange:function(){
      if(!this.data.playing){
        this.setData({
          playing: !this.data.playing
        })
        music.src = this.properties.src
        music.title = this.properties.title
        music.play()
      }
      else{
        this.setData({
          playing: !this.data.playing
        })
        music.pause()
      }
    }
  },
  lifetimes:{
    attached(){
      this.setData({
        playing: music.src==this.properties.src ? true : false
      })
    }
  }
})
