Page({

  /**
   * 页面的初始数据
   */
  data: {
    prize: {},
    student: {},
    rankAcademy: [],
    totalJoiners: 0,
    isOpen: false,
    randomNum: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var randomNum = Math.floor(Math.random() * (8 - 1 + 1) + 1);//八张图片 1-8的随机数
    this.setData({
      randomNum : randomNum
    })
    var that=this
    wx.request({
      url: 'https://jihangyu.cn/prize/getCurrentData',
      method: "GET",
      success: function (res) {
        if (res.data.data.student) {
          that.setData({
            student :res.data.data.student,
            isOpen : true
          })
       
        }
        that.setData({
          prize: res.data.data.prize,
          totalJoiners: res.data.data.totalJoiners,
          rankAcademy: res.data.data.rankAcademy
          
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