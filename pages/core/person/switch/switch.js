// pages/core/person/switch/switch.js
var app = getApp();
Page({
    musicSwitchChange: function (e) { 
    console.log('switch 发生 change 事件，携带值为', e.detail.value)
    if (e.detail.value == false) {
      var musicSwitch = 'hide'
      console.log('musicSwitch 发生 change 事件，musicSwitchGlobal为', musicSwitch)
      this.setData({
        musicIsChecked:false
      })
      console.log("此时开关状态为", this.data.musicIsChecked)
    } else{
      var musicSwitch = 'show'
      console.log('musicSwitch 发生 change 事件，musicSwitchGlobal为', musicSwitch)
      this.setData({
        musicIsChecked:true
      })
      console.log("此时开关状态为", this.data.musicIsChecked)
    }
    var musicIsChecked = this.data.musicIsChecked
    var musicSwitchGlobal = musicSwitch
    wx. setStorage({
      key: 'music_flag',
      data: musicIsChecked
    })
    wx.setStorage({
      key: 'musicSwitchGlobal',
      data: musicSwitchGlobal
    })

  },
 


  /**
   * 页面的初始数据
   */
  data: {
    musicIsChecked:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    wx.getStorage({
      key: 'music_flag',
      success: function(res) {
        console.log(res.data)
        var flags=res.data
        that.setData({
          musicIsChecked: flags
        })
      },
      fail: function(res) {},
      // complete: function(res) {},
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})
