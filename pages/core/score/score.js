// pages/school/library/library.js
Page({
  menuClick: function (event) {
    var num = event.currentTarget.dataset.num
    if(num=='all'){
      this.setData({
        change_scores: this.data.scores,
        currentSemester: num

      })
    }else{
      var temp = this.data.scores
      var result = new Array()
      for (var i = 0; i < temp.length; i++) {
        if (temp[i].start_semester == num) {
          result.push(temp[i])
        }
      }
      this.setData({
        change_scores: result,
        currentSemester: num

      })
    }
    this.setData({ flag: true })

  },
  switchSemester: function (e) {
    this.setData({
      flag: false,
    })
    
   
    // console.log('退出登录')
    // wx.removeStorage({
    //   key: 'account',
    //   success: function (res) {
    //     wx.navigateTo({
    //       url: '/pages/login/login',
    //     })
    //   }
    // })

  },
  /**
   * 页面的初始数据
   */
  data: {
    scores: {},
    flag: true,
    change_scores: {},
    loadStyle: 'show',
    tableStyle: 'hide',
    gradePoint: {},
    currentSemester:'选择学期'
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.getStorage({
      key: 'account',
      success: function (res) {
        console.log(res.data)
        var result = res.data
        wx.request({
          url: 'https://guohe3.com/api/gradePoint',
          method: 'POST',
          data: {
            username: result.username,
            password: result.password
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded' // 默认值
          },
          success: function (res) {
            console.log(res.data)

            that.setData({
              gradePoint: res.data.info,
              loadStyle: 'hide',
              tableStyle: 'show'
            })

          },
          fail: function () {
            wx.showToast('获取失败')
          }
        })
        wx.request({
          url: 'https://guohe3.com/api/score',
          method: 'POST',
          data: {
            username: result.username,
            password: result.password
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded' // 默认值
          },
          success: function (res) {
            console.log(res.data)
            that.setData({
              scores: res.data.info,
              change_scores: res.data.info,
            })

          },
          fail: function () {
            wx.showToast('获取失败')
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