var app = getApp();

Page({
  data: {
    exist: false,
    succeed: false,
    studentName: '',
    studentId: '',
    publisher: '',
    contact: '',
    comment: '',
    help: {
      helpStatus: false,
      faqList: [
        {
          question: '1.什么是饭卡回家?',
          answer:
            '饭卡回家计划旨在帮助同学们第一时间找回饭卡。如果你捡到了一张饭卡，可以填写本表单，然后发送通知，如果失主使用过wehpu，将会第一时间收到您下发的通知。在此，我们感谢每一位做好事的雷锋同学'
        },
        {
          question: '2.遇到问题?',
          answer: '请避开网络高峰期。若有疑问请联系客服人员或提交反馈给我们'
        }
      ]
    }
  },

  onLoad: function() {
    this.showHelp();
  },

  // 双向绑定
  inputBlur: function(e) {
    var id = e.target.id;

    if (id === 'studentId') {
      this.setData({
        studentId: e.detail.value
      });
    } else if (id === 'publisher') {
      this.setData({
        publisher: e.detail.value
      });
    } else if (id === 'contact') {
      this.setData({
        contact: e.detail.value
      });
    } else if (id === 'comment') {
      this.setData({
        comment: e.detail.value
      });
    } else if (id === 'studentName') {
      this.setData({
        studentName: e.detail.value
      });
    }
  },

  checkUser: function() {
    if (this.data.exist || !this.data.studentId) {
      return;
    }
    // 加载中
    wx.showLoading({
      title: '检查用户中',
      mask: true
    });

    wx.request({
      url: app.api + '/user/' + this.data.studentId,
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        Authorization: 'Bearer ' + app.store.token
      },
      success: requestRes => {
        var _requestRes = requestRes.data;
        // console.log(requestRes);

        if (_requestRes.statusCode === 200) {
          // console.log(_requestRes);
          this.setData({
            exist: true
          });
        } else {
          wx.showToast({
            title: '用户不存在',
            image: '/images/common/fail.png',
            duration: 2000
          });
        }
      },
      fail: () => {
        wx.hideLoading();
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
  },

  // 提交
  formSubmit: function(e) {
    this.checkUser();

    if (!this.data.exist) {
      return;
    }

    // 加载中
    wx.showLoading({
      title: '发送中',
      mask: true
    });

    wx.request({
      url: app.api + '/notify',
      data: {
        studentId: this.data.studentId,
        templateId: 'AT1107',
        page: 'pages/index/index',
        formId: e.detail.formId,
        data: {
          keyword1: {
            value: this.data.studentName,
            color: '#000000'
          },
          keyword2: {
            value: this.data.studentId,
            color: '#000000'
          },
          keyword3: {
            value: this.data.publisher,
            color: '#000000'
          },
          keyword4: {
            value: this.data.contact,
            color: '#000000'
          },
          keyword5: {
            value: this.data.comment,
            color: '#000000'
          }
        }
      },
      method: 'POST',
      header: {
        'content-type': 'application/json',
        Authorization: 'Bearer ' + app.store.token
      },
      success: requestRes => {
        var _requestRes = requestRes.data;
        if (_requestRes.statusCode === 200) {
          this.setData({
            succeed: true
          });
        } else {
          wx.showToast({
            title: '发送失败',
            image: '/images/common/fail.png',
            duration: 2000
          });
        }
      },
      fail: function() {
        wx.showToast({
          title: '发送失败',
          image: '/images/common/fail.png',
          duration: 2000
        });
      },
      complete: () => {
        wx.hideLoading();
      }
    });
  },

  // 帮助
  showHelp: function() {
    this.setData({
      'help.helpStatus': true
    });
  },
  hideHelp: function(e) {
    if (e.target.id === 'help' || e.target.id === 'close-help') {
      this.setData({
        'help.helpStatus': false
      });
    }
  }
});
