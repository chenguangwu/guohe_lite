// pages/core/sport/sport.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info:'',
    tabs: ["早操", "俱乐部"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    dataList:[],
    isLoad:true,
    showModal: true,
    inputVal:'',
    isNoPassword:true,
  },
  showInfo(){
    console.log(this.data.info)
    wx.showModal({
      title: '小提示',
      showCancel:false,
      content: this.data.info,
      success: function (res) {
        
      }
    })
  },
  inputChange(e){
    this.setData({
      inputVal: e.detail.value
    });
  },
  hideModal: function () {
    this.setData({
      showModal: false
    });
  },
  /**
   * 对话框取消按钮点击事件
   */
  onCancel: function () {
    this.hideModal();
  },
  /**
   * 对话框确认按钮点击事件
   */
  showDialogBtn: function () {
    this.setData({
      showModal: true
    })
  },
  onConfirm: function () {
    this.hideModal();
    console.log(this.data.inputVal)
    wx.setStorageSync('sport', this.data.inputVal)
    var that=this
    wx.getStorage({
      key: 'sport',
      success: function (res) {
        that.setData({
          isNoPassword: false
        })
        wx.getStorage({
          key: 'account',
          success: function (res) {
            var sport = wx.getStorageSync("sport")
            console.log(sport)
            wx.request({
              url: 'https://guohe3.com/vpnRun',
              method: 'POST',
              data: {
                username: res.data.username,
                password: sport
              },
              header: {
                'content-type': 'application/x-www-form-urlencoded' 
              },
              success: function (res) {
                if (res.data.code != 200) {
                  wx.showToast({
                    title: '密码错误',
                    icon: 'loading'
                  })
                  wx.removeStorageSync('sport')
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
      }
    })
  },

  tabClick: function (e) {
    var that = this
    wx.getStorage({
      key: 'account',
      success: function (res) {
        var sport = wx.getStorageSync("sport")
        console.log(sport)
        if (e.currentTarget.id == 1) {
          wx.request({
            url: 'https://guohe3.com/vpnSport',
            method: 'POST',
            data: {
              username: res.data.username,
              password: sport
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
                console.log(res.data.info)
                that.setData({
                  info: res.data.info[0].name + "\\n" + res.data.info[0].sum + "\\n" + res.data.info[0].year + res.data.info[0].total,
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

        } else {
          
          wx.request({
            url: 'https://guohe3.com/vpnRun',
            method: 'POST',
            data: {
              username: res.data.username,
              password: sport
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded' // 
            },
            success: function (res) {
              if (res.data.code != 200) {
                wx.showToast({
                  title: '密码错误',
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
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id,
      isLoad:true,
    });
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    wx.getStorage({
      key: 'sport',
      success: function(res) {
        that.setData({
          isNoPassword:false
        })
        wx.getStorage({
          key: 'account',
          success: function (res) {
            var sport = wx.getStorageSync("sport")
            console.log(sport)
            wx.request({
              url: 'https://guohe3.com/vpnRun',
              method: 'POST',
              data: {
                username: res.data.username,
                password: sport
              },
              header: {
                'content-type': 'application/x-www-form-urlencoded' // 
              },
              success: function (res) {
                if (res.data.code != 200) {
                  wx.showToast({
                    title: '密码错误',
                    icon: 'loading'
                  })
                } else {
                  console.log(res.data.info[0])
                  that.setData({
                    info: res.data.info[0].name + ' \r\n ' + res.data.info[0].year +' \r\n '+res.data.info[0].total,
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
    wx.showNavigationBarLoading() //在标题栏中显示加载
    this.setData({
      isLoad: true,
    });
    var that = this
    wx.getStorage({
      key: 'account',
      success: function (res) {
        var sport = wx.getStorageSync("sport")
        console.log(sport)
        if (that.data.activeIndex == 1) {
          wx.request({
            url: 'https://guohe3.com/vpnSport',
            method: 'POST',
            data: {
              username: res.data.username,
              password: sport
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
                wx.hideNavigationBarLoading() 
                that.setData({
                  info: res.data.info[0].name + ' \r\n ' + res.data.info[0].year + ' \r\n ' + res.data.info[0].total,
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

        } else {

          wx.request({
            url: 'https://guohe3.com/vpnRun',
            method: 'POST',
            data: {
              username: res.data.username,
              password: sport
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded' // 
            },
            success: function (res) {
              if (res.data.code != 200) {
                wx.showToast({
                  title: '密码错误',
                  icon: 'loading'
                })
              } else {
                wx.hideNavigationBarLoading() 
                that.setData({
                  isLoad: false,
                  dataList: res.data.info[1],
                })
                wx.stopPullDownRefresh()
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