// pages/core/sport/sport.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: ["早操", "俱乐部"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    dataList:[],
    isLoad:true,
  },


  tabClick: function (e) {

    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id,
      isLoad:true,
    });
    if (e.currentTarget.id==1){
      var that = this
      wx.request({
        url: 'https://guohe3.com/vpnSport',
        method: 'POST',
        data: {
          username: '152210702119',
          password: 'PXC'
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 
        },
        success: function (res) {
          if (res.data.code != 200) {
            wx.showToast({
              title: res.data.msg,
              icon: 'loading'
            })
          } else {
            that.setData({
              isLoad: false,
              dataList: res.data.info[1],
            })

          }

        },
        fail: function () {
          wx.showToast({
            title: '体育系统异常',
            icon: 'loading',
            duration: 2000
          })
        }
      })
    
    }else{
      var that = this
      wx.request({
        url: 'https://guohe3.com/vpnRun',
        method: 'POST',
        data: {
          username: '152210702119',
          password: 'PXC'
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 
        },
        success: function (res) {
          if (res.data.code != 200) {
            wx.showToast({
              title: '体育系统异常',
              icon: 'loading'
            })
          } else {
            that.setData({
              isLoad: false,
              dataList: res.data.info[1],
            })

          }

        },
        fail: function () {
          wx.showToast({
            title: '体育系统异常',
            icon: 'loading',
            duration: 2000
          })
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    wx.request({
      url: 'https://guohe3.com/vpnRun',
      method: 'POST',
      data: {
        username: '152210702119',
        password: 'PXC'
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 
      },
      success: function (res) {
        if (res.data.code != 200) {
          wx.showToast({
            title: '体育系统异常',
            icon: 'loading'
          })
        } else {
          that.setData({
            isLoad:false,
            dataList:res.data.info[1],
          })
          
        }

      },
      fail: function () {
        wx.showToast({
          title: '体育系统异常',
          icon: 'loading',
          duration: 2000
        })
      }
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