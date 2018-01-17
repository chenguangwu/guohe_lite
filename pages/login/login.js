Page({
  data: {
    inputPassword: false,
    isLoading: false,
    password: '',
    username: ''
  },
  onLoad: function () {
    wx.getStorage({
      key: '2017-2018-1',
      success: function (res) {
        if(res.data){
          console.log('清理缓存')
         wx.clearStorage()
        }
      }
    })
    wx.getStorage({
      key: '2017-2018-2',
      success: function (res) {
        if (res.data) {
          console.log('清理缓存')
        /wx.clearStorage()
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
    console.log(e.detail.value)
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
        
          
          var toastr = require('../../utils/toastr-wxapp.js');
          toastr.ok({
            title: '登录成功',
            duration: 1000,
          });
          if(res.data.code==200){
    
            var result=res.data.info
            result.password= objData.password//?
            console.log(result)
            wx.setStorage({
              key: "account",
              data: result
            })
            wx.reLaunch({
              url: '/pages/index/index',
            })
           
          }else{

             //登录失败
            toastr.error({
              title: '用户名或你妈错误',
              duration: 1000,
            });
            
             
             
          }
        }
      })
    } else {
      toastr.error({
        title: '学号或密码不能为空',
        duration: 1000,
      });
    }





    setTimeout(() => {
      this.setData({
        isLoading: false
      })
    }, 1000)

  }

})
