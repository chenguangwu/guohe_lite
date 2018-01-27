// pages/core/library/library.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: ["推荐", "查询"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    inputShowed: false,
    inputVal: "",
    dataList:[],
    isLoad:true
  },


  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });

  },

  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
  },
  search(){
    console.log(this.data.inputVal)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取缓存
    var that=this
    wx.getStorage({
      key: 'account',
      success: function (res) {

        var result = res.data
        wx.request({
          url: 'https://guohe3.com/vpnBookTop100',
          method: 'POST',
          data: {
            username: result.username,
            password: result.password
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
                dataList: res.data.info,
                isLoad:false
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
        
      }, fail() {
        console.log('未登录')
        wx.showModal({
          title: '提示',
          content: '请先用教务系统账号登录',
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