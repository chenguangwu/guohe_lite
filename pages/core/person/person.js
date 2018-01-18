var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {}
  },
  changeAccount(){
    wx.showModal({
      title: '提示',
      content: '确认切换账户（清除缓存）',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.navigateTo({
            url: '/pages/login/login',
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
    
  },
  onLoad: function () {
    var that = this
    //调用应用实例的方法获取全局数据  
    app.getUserInfo(function (userInfo) {
      //更新数据  
      that.setData({
        userInfo: userInfo
      })
      console.log(userInfo)
    })
  }
}) 