Page({

  /**
   * 页面的初始数据
   */
  data: {
    radioItems: [
      { name: '四级', value: '1' },
      { name: '六级', value: '2', checked: true }
    ],
    load:false,
    ks_xm:'',
    ks_sfz:'',
    choose:2
  },
  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value);

    var radioItems = this.data.radioItems;
    for (var i = 0, len = radioItems.length; i < len; ++i) {
      radioItems[i].checked = radioItems[i].value == e.detail.value;
    }

    this.setData({
      radioItems: radioItems,
      choose: e.detail.value
    });
  },
  idcardInput(e) {
    this.setData({
      ks_sfz: e.detail.value
    })
  },
  nameInput(e) {
    this.setData({
      ks_xm: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  find(){

    this.setData({
      load:true
    })
    var that=this
    var type = this.data.choose
    var ks_xm = this.data.ks_xm
    var ks_sfz = this.data.ks_sfz
    try{
      wx.request({
        url: 'https://guohe3.com/cet',
        method: 'POST',
        data: {
          ks_xm: ks_xm,
          ks_sfz: ks_sfz,
          type: type
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          console.log(res.data)
          that.setData({
            load: false
          })
          if (res.data.code = 200) {
            wx.showModal({
              title: '准考证号',
              content: res.data.info.zkzh,
              cancelText: ''
            })
          }
          else {
            // that.setData({
            //   load: false
            // })
            wx.showToast({
              title: '查询服务器异常',
              ico: 'none'
            })
          }
        },
        fail() {
          that.setData({
            load: false
          })
          wx.showModal({
            title: '查询服务器异常',
            content: '',
            cancelText: ''
          })
        }
      })
    }catch(e){
      console.log(1)
      wx.showModal({
        title: '查询服务器异常',
        content: '',
        cancelText: ''
      })
    }
  
  },
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