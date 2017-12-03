var app = getApp();

Page({
  data: {
    calendarImage:
      'http://wehpu-engine.oss-cn-shanghai.aliyuncs.com/calendar/prefix-calendar-2017-2018-1-1.png?x-oss-process=style/calendar',
    currentWeekly: '',
    totalWeekly: '',
    currentTerm: ''
  },

  onLoad: function() {
    this.getCalendar();
    this.getCurrentWeekly();
  },

  // 当前第几周
  getCurrentWeekly: function() {
    var currentWeekly = Math.ceil(
      (Date.now() - Date.parse(app.schoolYear)) / 604800000
    );

    this.setData({
      currentWeekly: currentWeekly
    });
  },

  // 获取校历
  getCalendar: function() {
    // 加载中
    wx.showLoading({
      title: '获取中',
      mask: true
    });

    wx.request({
      url: app.api + '/calendar',
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        Authorization: 'Bearer ' + app.store.token
      },
      success: requestRes => {
        var _requestRes = requestRes.data;

        // console.log(_requestRes);
        if (_requestRes.statusCode === 200) {
          this.setData({
            totalWeekly: _requestRes.data.totalWeekly,
            currentTerm: _requestRes.data.currentTerm
          });
        } else {
          wx.showToast({
            title: '获取失败',
            image: '/images/common/fail.png',
            duration: 2000
          });
        }
      },
      fail: () => {
        wx.showToast({
          title: '获取失败',
          image: '/images/common/fail.png',
          duration: 2000
        });
      },
      complete: () => {
        wx.hideLoading();
      }
    });
  },

  // 预览图片
  previewImage: function() {
    var url = [this.data.calendarImage];

    wx.previewImage({
      urls: url
    });
  }
});
