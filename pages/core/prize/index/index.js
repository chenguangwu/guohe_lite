Page({

  /**
   * 页面的初始数据
   */
  data: {
    student:{},
    prize:{},
    message: '参与抽奖',
    isJoin: '0',
    totalJoiners: 0

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    wx.getStorage({
      key: 'account',
      success: function (res) {
        console.log(res.data.username)
        wx.request({
          url: 'https://jihangyu.cn/prize/isJoined',
          method: "POST",
          data: { "username": res.data.username},
          success: function (res) {
            console.log(res.data)
            if (res.data.data=='0'){
              that.setData({
                isJoin: res.data.data,
                message:'参与抽奖'
              })
            }else{
  
              that.setData({
                isJoin: res.data,
                message: '已参加'
              })
            }


          }
        })
      },
      fail: function () {
        console.log("未登录")
        wx.navigateTo({
          url: '/pages/login/login',
        })
      }
    })
  
    wx.request({
      url: 'https://jihangyu.cn/prize/getCurrentData', 
      method:"GET",
      success: function (res) {
        that.setData({
          student : res.data.data.student,
          prize : res.data.data.prize,
          totalJoiners:res.data.data.totalJoiners
        })
  
     
      }
    })
  },
  join(){
    var that=this
    if (this.data.isJoin=='0') {
      var registerUrl = 'https://jihangyu.cn/prize/joinPrize'
      wx.getStorage({
        key: 'account',
        success: function (res) {
          wx.request({
            url: registerUrl, //仅为示例，并非真实的接口地址
            data: {
              'username': res.data.username
            },
            header: {
              "content-type": "application/x-www-form-urlencoded"
            },
            method: 'post',
            success: function (res) {
              if (res.data.code == 200) {
                wx.showToast({
                  title: '参加成功',
                  icon: 'success'
                })
                that.setData({
                  isJoin: '1',
                  message: "已参加",
                  totalJoiners: parseInt(that.data.totalJoiners) + 1
                })
              } else {
                wx.showToast({
                  title: res.data.msg,
                  icon: 'none'
                })
              }

              console.log(res.data)
            }
          })
        },
        fail: function () {
          console.log("未登录")
          wx.navigateTo({
            url: '/pages/login/login',
          })
        }
      })
  
    }else{
      wx.showModal({
        title: '友情提示',
        content: '已参加',
      })
    }
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