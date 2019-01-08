var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    info: {}
  },
  changeAccount() {
    wx.showModal({
      title: '提示',
      content: '确认切换账户吗？（将会清除缓存）',
      success: function(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.clearStorageSync()
          wx.navigateTo({
            url: '/pages/login/login',
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })

  },
  onLoad: function() {
    var that = this
    wx.getStorage({
      key: 'account',
      success: function(res) {

        that.setData({
          info: res.data
        })
      },
    })
    // //调用应用实例的方法获取全局数据  
    // app.getUserInfo(function (userInfo) {
    //   console.log(userInfo)
    //   //更新数据  
    //   that.setData({
    //     userInfo: userInfo
    //   })

    // })
  }
})