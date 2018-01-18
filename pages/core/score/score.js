// pages/school/library/library.js

Page({
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    if (e.detail.value=='0'){
      this.setData({
        change_scores: this.data.scores,
        currentSemester: "所有学期"
      })
      this.setData({
        flag_choose: 'hide'
      })
    }else{
     
      var temp = this.data.scores
      var result = new Array()
      for (var i = 0; i < temp.length; i++) {
        if (temp[i].start_semester == this.data.grade_years[e.detail.value]) {
          result.push(temp[i])
        }
      }
      this.setData({
        change_scores: result,
        currentSemester: this.data.grade_years[e.detail.value],
        flag_choose : 'show'
      })
      var after_choose_scores = this.data.change_scores
    
      var name_list = new Array()
      var score_list = new Array()
      for (var i = 1; i < after_choose_scores.length; i++) {
        if (after_choose_scores[i].score%1===0){
        name_list.push(after_choose_scores[i].course_name.substring(0, 4))
        score_list.push(after_choose_scores[i].score)
        }
      }
      var wxCharts = require('../../../utils/wxcharts-min.js');
      new wxCharts({
        canvasId: 'score',
        type: 'column',
        categories: name_list,
        series: [{
          name: '科目',
          data: score_list,
        }
        ],
        yAxis: {
          titie: "分数",
          min:0
        },
        width: 300,
        height: 200
      });
    }
    this.setData({
      index: e.detail.value
    })
  },
  switchSemester: function (e) {
    this.setData({
      flag: false,
    })
    
  

  },
  /**
   * 页面的初始数据
   */
  data: {
    index:0,
    grade_years:[],
    scores: {},
    flag: true,
    flag_choose:'hide',
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
   
    //获取缓存
    wx.getStorage({
      key: 'account',
      success: function (res) {

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
            var info = res.data.info
            var year_list = new Array()
            var point_list = new Array()
            for (var i = 1; i < info.length; i++) {
              year_list.push(info[i].year)
              point_list.push(info[i].point)
            }
            
            var wxCharts = require('../../../utils/wxcharts-min.js');
            new wxCharts({
              canvasId: 'point',
              type: 'line',
              categories: year_list,
              series: [{
                name: '绩点变化',
                data: point_list,
                
              }],
              yAxis: {
                title: 'GPA'
              },
              width: 300,
              height: 200,

            });
            var years = [];
            for (var i = 0; i < res.data.info.length; i++) {
              years[i] = res.data.info[i].year
            }
            
            
            that.setData({
              gradePoint: res.data.info,
              grade_years: years,
              loadStyle: 'hide',
              tableStyle: 'show'
            })

          },
          fail: function () {
            wx.showToast({
              title: '网络获取失败',
              icon: 'loading',
              duration: 2000
            })
          }
        })
        //获取成绩
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

            that.setData({
              scores: res.data.info,
              change_scores: res.data.info,
            })
          },
          fail: function () {
            wx.showToast({
              title: '网络获取失败',
              icon: 'loading',
              duration: 2000
            })
          }
        })
      },fail(){
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