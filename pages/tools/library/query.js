var app = getApp();

Page({
  data: {
    query: '',
    bookList: [],
    bookDetail: [],
    detailStatus: false
  },

  onLoad: function(option) {
    if (option.q) {
      this.setData({
        query: option.q
      });

      this.queryBook();
    }

    console.log(this.data);
  },

  handleInput: function(e) {
    this.setData({
      query: e.detail.value
    });
  },

  // 获取焦点
  inputFocus: function(e) {
    if (e.target.id === 'query') {
      this.setData({
        queryFocus: true
      });
    }
  },

  // 失去焦点
  inputBlur: function(e) {
    if (e.target.id === 'query') {
      this.setData({
        queryFocus: false
      });
    }
  },

  queryBook: function(e) {
    if (e && e.target.id === 'query') {
      this.setData({
        query: e.detail.value
      });
    }
    console.log(this.data);
    // 加载中
    wx.showLoading({
      title: '查询中',
      mask: true
    });

    wx.request({
      url: app.api + '/library/books',
      method: 'GET',
      data: {
        q: this.data.query
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        Authorization: 'Bearer ' + app.store.token
      },
      success: requestRes => {
        var _requestRes = requestRes.data;
        // console.log(requestRes);

        if (_requestRes.statusCode === 200) {
          console.log(_requestRes);
          this.setData({
            bookList: _requestRes.data
          });
        } else {
          wx.hideLoading();
          wx.showToast({
            title: '查询失败',
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

  getDetail: function(id) {
    this.setData({
      bookDetail: []
    });
    // 加载中
    wx.showLoading({
      title: '查询中',
      mask: true
    });

    wx.request({
      url: app.api + '/library/books/' + id,
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        Authorization: 'Bearer ' + app.store.token
      },
      success: requestRes => {
        var _requestRes = requestRes.data;
        // console.log(requestRes);

        if (_requestRes.statusCode === 200) {
          console.log(_requestRes);
          this.setData({
            bookDetail: _requestRes.data
          });

          console.log(this.data);
        } else {
          wx.hideLoading();
          wx.showToast({
            title: '查询失败',
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

  showDetail: function(e) {
    var id = e.currentTarget.id;

    console.log(id);

    if (id) {
      this.getDetail(id);
    }

    // 更新视图
    this.setData({
      detailStatus: true
    });
  },

  hideDetail: function(e) {
    if (e.target.id === 'query-detail' || e.target.id === 'close-detail') {
      this.setData({
        detailStatus: false
      });
    }
  }
});
