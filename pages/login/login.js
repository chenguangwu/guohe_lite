Page({
  data: {
    inputPassword: false,
    isLoading: false,
    password: '',
    username: ''
  },
  onLoad: function () {
    wx.getStorage({
      key: 'account',
      success: function (res) {
        if(res.data){
          console.log('用户已登录')
          wx.navigateTo({
            url: '/pages/index/index',
          })
        }
        
        
      
      }
    })
  },
  pwdFocus() {
    this.setData({
      inputPassword: true
    })
  },
  formSubmit: function (e) {
    this.setData({
      isLoading: true
    })
    //console.log(e.detail.value)
    //获得表单数据
    var objData = e.detail.value;
    if (objData.username && objData.password) {
      wx.request({
        url: 'https://guohe3.com/api/studentInfo',
        method	:'POST',
        data: {
          username: objData.username ,
          password: objData.password
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        success: function (res) {
          //console.log(res.data)
          if(res.data.code==200){
            //登录成功
            wx.showToast({
              title: '登录成功',
            })
            var result=res.data.info
            result.password= objData.password
            console.log(result)
            wx.setStorage({
              key: "account",
              data: result
            })
            wx.reLaunch({
              url: '../score/score',
            })
           
          }else{

             //登录失败
             console.log('登录失败')
             wx.showToast({
               title: '登录失败',
               icon:'loading',
               duration: 2000
             })
          }
        }
      })
    } else {
      wx.showToast({
        title: '学号或密码不能为空',
        icon: 'success',
        duration: 2000
      })
    }





    setTimeout(() => {
      this.setData({
        isLoading: false
      })
    }, 1000)

  }

})
