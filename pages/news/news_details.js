var app = getApp();

Page({
  data: {
    classify: '',
    id: '',
    news: {},
    loading: true,
    pullDownFlag: true
  },

  onLoad: function(options) {
    this.data.classify = options.classify;
    this.data.id = options.id;

    this.getNews(this.data.classify, this.data.id);
  },

  // 下拉刷新
  onPullDownRefresh: function() {
    var _pullDownFlag = this.data.pullDownFlag;

    if (_pullDownFlag && !this.data.news.title) {
      this.data.pullDownFlag = false;

      this.getNews(this.data.classify, this.data.id);
    }
  },

  getNews: function(classify, id) {
    // 加载中
    wx.showLoading({
      title: '加载中',
      mask: true
    });

    if (classify && id) {
      wx.request({
        url: app.api + '/rss/' + classify + '/' + id,
        method: 'GET',
        header: {
          'content-type': 'application/x-www-form-urlencoded',
          Authorization: 'Bearer ' + app.store.token
        },
        success: res => {
          // console.log(res);
          this.setData({
            loading: false
          });

          var _requestRes = res.data;
          if (_requestRes.statusCode === 200) {
            this.setData({
              news: _requestRes.data
            });

            // 更新导航标题
            wx.setNavigationBarTitle({
              title: this.data.news.title
            });
          } else if (_requestRes.statusCode === 404) {
            this.setData({
              loading: false
            });
          } else {
            wx.showToast({
              title: '新闻走丢了',
              image: '/images/common/fail.png',
              duration: 2000
            });
          }
        },
        fail: () => {
          wx.showToast({
            title: '新闻走丢了',
            image: '/images/common/fail.png',
            duration: 2000
          });
        },
        complete: () => {
          wx.hideLoading();
          wx.stopPullDownRefresh();
          this.data.pullDownFlag = true;
        }
      });
    } else {
      this.setData({
        loading: false
      });
      wx.showToast({
        title: '新闻走丢了',
        image: '/images/common/fail.png',
        duration: 2000
      });
    }
  }
});
