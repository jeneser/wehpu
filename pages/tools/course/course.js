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
    // 今日周几
    today: 0,
    // 当前周
    currentWeekly: 0,
    // 课程数据
    mon: [],
    tue: [],
    wed: [],
    thu: [],
    fri: [],
    sat: [],
    sun: [],
    oth: [],
    // 课表数据状态
    courseStatus: false,
    // 课表详情Flag
    detailStatus: false,
    // 课表详情数据
    courseDetail: []
  },

  onLoad: function() {
    // 设置日期
    this.setDate();
    // 获取课表
    this.getCourse();
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
      // console.log(this.data);
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
            wx.hideLoading();
            wx.showToast({
              title: '获取课表失败',
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
    }
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

  // 更新课表视图
  updateView: function(data) {
    this.setData({
      courseStatus: true
    });
    this.setData(data);
    this.checkCourse();
    wx.hideLoading();
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
  },

  // 更改picker
  bindPickerChange: function(e) {
    // console.log('bindPickerChange' + this.data.currentWeekly);
    this.setData({
      currentWeekly: parseInt(e.detail.value)
    });
    this.checkCourse();
  },

  // 课表详情
  showDetail: function(e) {
    var data = e.currentTarget.dataset.course;
    // 格式化周次
    data.weekly = data.weekly.join(' ').replace(/,/g, '-');

    // 更新视图
    this.setData({
      detailStatus: true,
      courseDetail: new Array(data)
    });
  },

  hideDetail: function(e) {
    if (e.target.id === 'course-detail' || e.target.id === 'close-detail') {
      this.setData({
        detailStatus: false
      });
    }
  },

  // 当前周
  setCurrent: function() {
    this.setDate();
    this.checkCourse();
  },

  // 其他课程
  seeOther: function() {
    this.setData({
      detailStatus: true,
      courseDetail: this.data.oth
    });
  }
});
