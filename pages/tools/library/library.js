var app = getApp();

Page({
  data: {
    query: '',
    queryFocus: false
  },

  onLoad: function() {
    // this.getBorrowing();
  },

  handleInput: function(e) {
    this.setData({
      query: e.detail.value
    })
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
      })
    }
    console.log(this.data)

    if(e.detail.value || this.data.query) {
      wx.navigateTo({
        url: 'query?q=' + this.data.query
      });
    }
  },

  // getBorrowing: function() {
  //   // 加载中
  //   wx.showLoading({
  //     title: '获取课表中',
  //     mask: true
  //   });

  //   wx.request({
  //     url: app.api + '/library/books',
  //     method: 'GET',
  //     query: {
  //       q: query
  //     },
  //     header: {
  //       'content-type': 'application/x-www-form-urlencoded',
  //       Authorization: 'Bearer ' + app.store.token
  //     },
  //     success: requestRes => {
  //       var _requestRes = requestRes.data;
  //       // console.log(requestRes);

  //       if (_requestRes.statusCode === 200) {
  //         console.log(_requestRes);
  //       } else {
  //         wx.hideLoading();
  //         wx.showToast({
  //           title: '获取课表失败',
  //           icon: '/images/common/fail.png',
  //           duration: 2000
  //         });
  //       }
  //     },
  //     fail: () => {
  //       wx.hideLoading();
  //       wx.showToast({
  //         title: '未知错误',
  //         icon: '/images/common/fail.png',
  //         duration: 2000
  //       });
  //     }
  //   });
  // }
});
