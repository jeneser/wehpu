var app = getApp();

Page({
  data: {
    // 借阅图书
    borrowingList: [],
    // 查询关键字
    query: '',
    // 暂存图书馆登陆密码
    libPassWord: '',
    // 聚焦
    queryFocus: false,
    libPassWordFocus: false,
    modelStatus: true,
    // 帮助
    help: {
      helpStatus: false,
      faqList: [
        {
          question: '1.不清楚登陆密码?',
          answer: '初次登陆，请到校图书馆主页进行设置。'
        },
        {
          question: '2.忘记密码?',
          answer: '需凭本人有效证件到南校区图书馆三楼数据中心进行查询'
        },
        {
          question: '3.无法认证?',
          answer: '请避开网络高峰期。若有疑问请联系客服人员或提交反馈给我们。'
        }
      ]
    }
  },

  onLoad: function() {
    this.checkUserInfo();
    if (app.store.libPassWord) {
      this.getBorrowing();
    }
  },

  onPullDownRefresh: function() {
    if (app.store.libPassWord) {
      this.getBorrowing();
    }
    wx.stopPullDownRefresh();
  },

  // 输入
  handleInput: function(e) {
    if (e.target.id === 'query') {
      this.setData({
        query: e.detail.value
      });
    } else if (e.target.id === 'libPassWord') {
      this.setData({
        libPassWord: e.detail.value
      });
    }
  },

  // 获取焦点
  inputFocus: function(e) {
    if (e.target.id === 'query') {
      this.setData({
        queryFocus: true
      });
    } else if (e.target.id === 'libPassWord') {
      this.setData({
        libPassWordFocus: true
      });
    }
  },

  // 失去焦点
  inputBlur: function(e) {
    if (e.target.id === 'query') {
      this.setData({
        queryFocus: false
      });
    } else if (e.target.id === 'libPassWord') {
      this.setData({
        libPassWordFocus: false
      });
    }
  },

  // 检查是否绑定密码
  checkUserInfo: function() {
    if (app.store.libPassWord) {
      // 更新视图
      this.setData({
        modelStatus: false
      });

      return true;
    } else {
      return false;
    }
  },

  // 查询图书
  queryBook: function(e) {
    if (e && e.target.id === 'query') {
      this.setData({
        query: e.detail.value
      });
    }

    if (e.detail.value || this.data.query) {
      wx.navigateTo({
        url: 'query?q=' + this.data.query
      });
    }
  },

  // 获取借阅信息
  getBorrowing: function() {
    // 加载中
    wx.showLoading({
      title: '获取中',
      mask: true
    });

    wx.request({
      url: app.api + '/library/borrowing',
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
            borrowingList: _requestRes.data
          });
        } else {
          wx.hideLoading();
          wx.showToast({
            title: '获取失败',
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

  // 更新用户信息
  submit: function() {
    var libPassWord = this.data.libPassWord;
    if (!libPassWord) {
      return;
    }
    // 加载中
    wx.showLoading({
      title: '获取中',
      mask: true
    });

    wx.request({
      url: app.api + '/user',
      method: 'PUT',
      data: {
        key: 'libPassWord',
        value: libPassWord
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        Authorization: 'Bearer ' + app.store.token
      },
      success: requestRes => {
        var _requestRes = requestRes.data;
        // console.log(requestRes);

        if (_requestRes.statusCode === 201) {
          // console.log(_requestRes);
          // 更新视图
          this.setData({
            modelStatus: false
          });
          this.setStore('libPassWord', true);
          wx.showToast({
            title: '已绑定',
            icon: 'success',
            duration: 2000
          });

          // 查询借阅情况
          this.getBorrowing();
        } else {
          wx.showToast({
            title: '更新失败',
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

  // 续借
  renew: function() {
    wx.showModal({
      title: '提示',
      showCancel: false,
      content: '续借功能即将到来，请耐心等待',
      success: res => {}
    });
  },

  // 模态窗
  showDetail: function() {},

  showModel: function(e) {
    var id = e.currentTarget.id;

    // 更新视图
    this.setData({
      modelStatus: true
    });
  },

  hideModel: function(e) {
    if (e.target.id === 'model' || e.target.id === 'close') {
      this.setData({
        modelStatus: false
      });
    }
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
