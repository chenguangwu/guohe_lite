var app = getApp();
var util = require('../../../utils/util.js');
Page({
  data: {
    load:'show',
    content:'hide',
    array: ['第1周', '第2周', '第3周', '第4周', '第5周', '第6周', '第7周', '第8周',
      '第9周', '第10周', '第11周', '第12周', '第13周', '第14周', '第15周', '第16周', '第17周', '第18周','第19周', '第20周',],
    semesterArray:[
      '2017-2018-1',
      '2017-2018-2'
    ],
    Sindex:1,//第几个学年
    index: '',//第几周
    winHeight: "",//窗口高度
    currentTab: '', //预设当前项的值 周几
    scrollLeft: 0, //tab标题的滚动条位置,
    kbData: [],//一周的课表数据
    todayData: [],//当天的课表数据,
    semester:'2017-2018-2',//学年,
    xiaoli:{}
  },
  //切换学年
  bindSemesterChange: function (e) {
    var semsester_value = this.data.semesterArray[e.detail.value]
    this.setData({
      Sindex: e.detail.value,
      semester: semsester_value
    })
    util.showData(semsester_value, e.detail.value, this)
  },
  //切换周数
  bindPickerChange: function (e) {
    this.setData({
      index: e.detail.value
    })
    var semester_value=this.data.semester
    
    util.showData(semester_value, e.detail.value,this)
  },
  //切换天数
  switchTab: function (e) {
    console.log(1)
    var kb_data = this.data.kbData
    this.setData({
      currentTab: e.detail.current,
    });
    var today_data = kb_data[this.data.currentTab]
    
    var today_data_list = new Array()
    for (var i = 0; i < today_data.length; i++) {
      var temp = {}
      if (today_data[i]) {
        var info_list = today_data[i].split("@")
        temp.index = (i * 2 + 1) + '-' + (i * 2 + 2)
        temp.cnum = info_list[0]
        if (info_list[1].length >= 20) {
          temp.cname = info_list[1].split(' ', 1).join(' ')
        } else {
          temp.cname = info_list[1]
        }
        temp.tname = info_list[2]
        temp.address = info_list.length >= 4 ? info_list[3] : '未指定'

      }
      
      if (JSON.stringify(temp) != "{}") {
        today_data_list.push(temp)
      }
      
    }
    //更新显示今天的数据
    console.log(today_data_list)
    this.setData({
      todayData: today_data_list
    })



    this.checkCor();
  },
  // 点击标题切换当前页时改变样式
  swichNav: function (e) {
    var cur = e.target.dataset.current;
    if (this.data.currentTaB == cur) { return false; }
    else {
      this.setData({
        currentTab: cur
      })
    }
  },
  //判断当前滚动超过一屏时，设置tab标题滚动条。
  checkCor: function () {
    if (this.data.currentTab > 4) {
      this.setData({
        scrollLeft: 300
      })
    } else {
      this.setData({
        scrollLeft: 0
      })
    }
  },
  onLoad: function () {
    console.log(2)
    var that=this
    //校历
    wx.request({
      url: 'https://guohe3.com/api/xiaoli',
      method: 'get',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
        if (res.data.code == 200) {
          var currentTab=0;
          var info = res.data.info
          if (info.currentTab == '星期二') {
            currentTab = 1
          }
          else if (info.currentTab == '星期三') {
            currentTab = 2
          }
          else if (info.currentTab == '星期四') {
            currentTab = 3
          }
          else if (info.currentTab == '星期五') {
            currentTab = 4
          }
          else if (info.currentTab == '星期六') {
            currentTab = 5
          }
          else if (info.currentTab == '星期日') {
            currentTab = 6
          }else{
            currentTab = 0
          }
          var index = info.index
          that.setData({
            index:index-1,
            currentTab: currentTab
          })
          var semester = that.data.semester
          var week = index-1
          
         
          util.showData(semester, week, that)
         
         
        }
      }
    })

    
    //  高度自适应
    wx.getSystemInfo({
      success: function (res) {
        var clientHeight = res.windowHeight,
          clientWidth = res.windowWidth,
          rpxR = 750 / clientWidth;
        var calc = clientHeight * rpxR - 180;
       
        that.setData({
          winHeight: calc
        });
      }
    });
  },
  footerTap: app.footerTap
})