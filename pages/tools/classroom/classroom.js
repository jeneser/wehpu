var app = getApp();

Page({
  data: {
    // 周几
    today: '',
    // 第几周
    currentWeekly: '',
    // 教学楼
    location: [
      '1号教学楼',
      '2号教学楼',
      '3号教学楼',
      '计算机综合楼',
      '电气综合楼',
      '机械综合楼',
      '能源综合楼',
      '资环综合楼',
      '测绘综合楼',
      '理化综合楼',
      '设计专教',
      '土木综合楼',
      '经管综合楼',
      '音乐系',
      '材料综合楼',
      '体育系',
      '文科综合楼'
    ],
    locationRef: [
      {
        name: '1号教学楼',
        id: '1'
      },
      {
        name: '2号教学楼',
        id: '2'
      },
      {
        name: '3号教学楼',
        id: '3'
      },
      {
        name: '计算机综合楼',
        id: '18'
      },
      {
        name: '电气综合楼',
        id: '4'
      },
      {
        name: '机械综合楼',
        id: '5'
      },
      {
        name: '能源综合楼',
        id: '6'
      },
      {
        name: '资环综合楼',
        id: '7'
      },
      {
        name: '测绘综合楼',
        id: '8'
      },
      {
        name: '理化综合楼',
        id: '9'
      },
      {
        name: '设计专教',
        id: '11'
      },
      {
        name: '土木综合楼',
        id: '12'
      },
      {
        name: '经管综合楼',
        id: '13'
      },
      {
        name: '音乐系',
        id: '14'
      },
      {
        name: '材料综合楼',
        id: '15'
      },
      {
        name: '体育系',
        id: '16'
      },
      {
        name: '文科综合楼',
        id: '17'
      }
    ],
    locationIndex: 0,
    // 周次
    weekly: [
      [
        '第1周',
        '第2周',
        '第3周',
        '第4周',
        '第5周',
        '第6周',
        '第7周',
        '第8周',
        '第9周',
        '第10周',
        '第11周',
        '第12周',
        '第13周',
        '第14周',
        '第15周',
        '第16周',
        '第17周',
        '第18周',
        '第19周',
        '第20周',
        '第21周',
        '第22周',
        '第23周',
        '第24周',
        '第25周',
        '第26周',
        '第27周',
        '第28周',
        '第29周',
        '第30周'
      ],
      ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日']
    ],
    weeklyIndex: [0, 0],
    lesson: ['第一大节', '第二大节', '第三大节', '第四大节', '第五大节'],
    lessonRef: ['1,2', '3,4', '5,6', '7,8', '9,10'],
    lessonIndex: 0,
    // 结果
    result: []
  },

  onLoad: function() {
    // 设置日期
    this.setDate();
    // 设置常用地点
    this.setUsed();
  },

  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value);
    this.setData({
      locationIndex: e.detail.value
    });
  },
  bindLessonChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value);
    this.setData({
      lessonIndex: e.detail.value
    });
  },
  bindWeeklyChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value);
    this.setData({
      weeklyIndex: e.detail.value
    });
  },

  // 设置日期
  setDate: function() {
    var date = new Date();
    // 周几
    var today = date.getDay();
    var today = today === 0 ? 6 : today - 1;
    // 当前第几周
    var currentWeekly =
      Math.ceil((Date.now() - Date.parse(app.schoolYear)) / 604800000) - 1;

    this.setData({
      weeklyIndex: [currentWeekly, today]
    });
  },

  // 设置常用地点
  setUsed: function() {
    if (app.store.usedBuilding) {
      var usedBuilding = app.store.usedBuilding;
      this.setData({
        locationIndex: usedBuilding
      });
    }
  },

  // 选择地址
  chooseLocation: function() {
    wx.chooseLocation({
      success: function(res) {
        console.log(res.name);
      }
    });
  },

  // 查询
  handleSubmit: function() {
    // 加载中
    wx.showLoading({
      title: '获取中',
      mask: true
    });

    //发起网络请求
    wx.request({
      url: app.api + '/classroom',
      data: {
        building: this.data.locationRef[this.data.locationIndex].id,
        weekly: this.data.weeklyIndex[0] + 1 + '',
        section: this.data.lessonRef[this.data.lessonIndex],
        week: this.data.weeklyIndex[1] + 1 + ''
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        Authorization: 'Bearer ' + app.store.token
      },
      success: requestRes => {
        var _requestRes = requestRes.data;
        // console.log(_requestRes);

        wx.hideLoading();
        if (_requestRes.statusCode === 200) {
          // 更新视图
          wx.setNavigationBarTitle({
            title: this.data.location[this.data.locationIndex] + '空闲教室'
          });
          this.setData({
            result: _requestRes.data
          });
          // 暂存本次查询地点
          this.setStore('usedBuilding', this.data.locationIndex);
        } else if (_requestRes.statusCode === 404) {
          wx.showToast({
            title: '无结果',
            icon: '/images/common/fail.png',
            duration: 2000
          });
        } else {
          wx.showToast({
            title: '未知错误',
            icon: '/images/common/fail.png',
            duration: 2000
          });
        }
      },
      fail: () => {
        wx.hideLoading();
        wx.showToast({
          title: '未知错误',
          icon: '/images/common/fail.png',
          duration: 2000
        });
      }
    });
  },

  // 更新store和storage
  setStore: function(key, value) {
    if (!key) {
      return;
    }
    app.store[key] = value;
    wx.setStorage({
      key: key,
      data: value
    });
  }
});
