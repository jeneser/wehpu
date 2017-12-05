var app = getApp();

Page({
  data: {
    week: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
    _week: ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'],
    weeklyArray: [
      '1周',
      '2周',
      '3周',
      '4周',
      '5周',
      '6周',
      '7周',
      '8周',
      '9周',
      '10周',
      '11周',
      '12周',
      '13周',
      '14周',
      '15周',
      '16周',
      '17周',
      '18周',
      '19周',
      '20周',
      '21周',
      '22周',
      '23周',
      '24周',
      '25周',
      '26周',
      '27周',
      '28周',
      '29周',
      '30周'
    ],
    today: 0,
    currentWeekly: 0,
    bind: false,
    // 工具
    tools: [
      [
        {
          id: 'course',
          name: '课表查询',
          url: '/pages/tools/course/course'
        },
        {
          id: 'classroom',
          name: '空教室',
          url: '/pages/tools/classroom/classroom'
        },
        {
          id: 'score',
          name: '成绩查询',
          url: '/pages/tools/score/score'
        },
        {
          id: 'library',
          name: '图书馆',
          url: '/pages/tools/library/library'
        },
        {
          id: 'card',
          name: '校园卡',
          url: '/pages/tools/card/card'
        },
        {
          id: 'repair',
          name: '报修',
          url: '/pages/tools/repair/repair'
        },
        {
          id: 'cet',
          name: '四六级',
          url: '/pages/tools/cet/cet'
        },
        {
          id: 'physical',
          name: '体测查询',
          url: '/pages/tools/physical/physical'
        }
      ],
      [
        {
          id: 'calendar',
          name: '校历',
          url: '/pages/tools/calendar/calendar'
        }
      ]
    ],
    // 课程数据
    mon: [],
    tue: [],
    wed: [],
    thu: [],
    fri: [],
    sat: [],
    sun: [],
    oth: [],
    // 当前课程
    todayCourse: [],
    courseStatus: false
  },

  onLoad: function() {
    // 获取用户基本信息
    this.getUserInfo();
    // 设置日期
    this.setDate();
    this.getCourse();
    this.getTodayCourse();
  },

  onPullDownRefresh: function() {
    this.setDate();
    this.getCourse();
    this.getTodayCourse();
    wx.stopPullDownRefresh();
  },

  getUserInfo: function() {
    var store = app.store;

    if (JSON.stringify(store) !== '{}') {
      this.setData({
        bind: store.bind
      });
    }
  },

  // 点击禁用项目
  tapDisabledItem: function() {
    wx.showToast({
      title: '未绑定',
      image: '/images/common/fail.png',
      duration: 2000
    });
  },

  // 获取课程
  getCourse: function() {
    // 加载中
    wx.showLoading({
      title: '获取课表中',
      mask: true
    });
    // 从缓存中获取
    if (app.store.courses) {
      this.updateView(app.store.courses);
      console.log(this.data);
    } else {
      //发起网络请求
      wx.request({
        url: app.api + '/course',
        method: 'GET',
        header: {
          'content-type': 'application/x-www-form-urlencoded',
          Authorization: 'Bearer ' + app.store.token
        },
        success: requestRes => {
          var _requestRes = requestRes.data;
          // console.log(requestRes);

          if (
            _requestRes.statusCode === 200 ||
            _requestRes.statusCode === 201
          ) {
            var _courses = {
              mon: _requestRes.data.mon,
              tue: _requestRes.data.tue,
              wed: _requestRes.data.wed,
              thu: _requestRes.data.thu,
              fri: _requestRes.data.fri,
              sat: _requestRes.data.sat,
              sun: _requestRes.data.sun,
              oth: _requestRes.data.oth
            };

            this.updateView(_courses);
            this.setStore('courses', _courses);
            // console.log(_courses);
          } else {
            wx.showToast({
              title: '获取课表失败',
              image: '/images/common/fail.png',
              duration: 2000
            });
          }
        },
        fail: () => {
          wx.showToast({
            title: '未知错误',
            image: '/images/common/fail.png',
            duration: 2000
          });
        },
        complete: () => {
          wx.hideLoading();
        }
      });
    }
  },

  getTodayCourse: function() {
    this.setData({
      todayCourse: this.data[this.data._week[this.data.today]]
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
      today: today,
      currentWeekly: currentWeekly
    });
  },

  // 更新课表视图
  updateView: function(data) {
    this.setData({
      courseStatus: true
    });
    this.setData(data);
    this.checkCourse();

    console.log(this.data);
    wx.hideLoading();
  },

  // 判断是否为当前周次课程
  checkCourse: function() {
    var _currentWeekly = this.data.currentWeekly + 1;
    var param = {};

    this.data._week.forEach(_weekEle => {
      // 展开周次
      this.data[_weekEle].forEach((element, index) => {
        var _weekly = element.weekly;

        // 判断区间
        if (
          _weekly !== '' &&
          Object.prototype.toString.call(_weekly) === '[object Array]'
        ) {
          // 区分并判断持续周数为1，2，n的情况
          var current =
            _weekly.find(_weeklyEle => {
              return _weeklyEle.length !== 1
                ? (_currentWeekly > _weeklyEle[0] ||
                    _currentWeekly === _weeklyEle[0]) &&
                    (_currentWeekly < _weeklyEle[1] ||
                      _currentWeekly === _weeklyEle[1])
                : _currentWeekly === _weeklyEle[0];
            }) !== undefined
              ? true
              : false;

          // 更新数据和视图
          param[_weekEle + '[' + index + '].current'] = current;
          this.setData(param);
        }
      });
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
