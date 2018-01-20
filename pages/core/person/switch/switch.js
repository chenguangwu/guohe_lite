// pages/core/person/switch/switch.js
var app = getApp();
Page({
  musicSwitchChange: function (e) {
    if (e.detail.value == false) {

      this.setData({
        musicIsChecked: false
      })

    } else {

      this.setData({
        musicIsChecked: true
      })

    }
    var musicIsChecked = this.data.musicIsChecked
    wx.setStorage({
      key: 'music_flag',
      data: musicIsChecked,
    })
    //wx.setStorageSync("music_flag", musicIsChecked)
    

  },
  newsSwitchChange: function (e) {
    if (e.detail.value == false) {

      this.setData({
        newsIsChecked: false
      })

    } else {

      this.setData({
        newsIsChecked: true
      })

    }
    var newsIsChecked = this.data.newsIsChecked
    wx.setStorage({
      key: 'news_flag',
      data: newsIsChecked,
    })
   // wx.setStorageSync("news_flag", newsIsChecked)


  },



  /**
   * 页面的初始数据
   */
  data: {
    musicIsChecked: true,
    newsIsChecked:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
    // var music_flag = wx.getStorageSync('music_flag')
    // var news_flag = wx.getStorageSync('news_flag')
    var that=this
    wx.getStorage({
      key: 'music_flag',
      success: function(res) {
        that.setData({
          musicIsChecked: res.data
        })
      },
    })
    wx.getStorage({
      key: 'news_flag',
      success: function (res) {
        console.log(res.data)
        that.setData({
          newsIsChecked: res.data
        })
      },
    })
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
