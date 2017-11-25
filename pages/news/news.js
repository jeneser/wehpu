var app = getApp();

Page({
  data: {
    // 分类标签
    classify: [
      {
        id: 'news',
        name: '要闻'
      },
      {
        id: 'logistics',
        name: '后勤'
      },
      {
        id: 'lecture',
        name: '讲座'
      },
      {
        id: 'notice',
        name: '公告'
      },
      {
        id: 'library',
        name: '图书馆'
      }
    ],
    // 当前选中
    classifyActived: 'news',
    // 缓存结果状态
    newsList: {
      news: {
        start: 0,
        empty: false,
        list: []
      },
      logistics: {
        start: 0,
        empty: false,
        list: []
      },
      lecture: {
        start: 0,
        empty: false,
        list: []
      },
      notice: {
        start: 0,
        empty: false,
        list: []
      },
      library: {
        start: 0,
        empty: false,
        list: []
      }
    },
    // 每次请求数
    perCount: 5,
    pullDownFlag: true
  },

  onLoad: function() {
    this.getRss(this.data.classifyActived);
  },

  // 上拉加载更多
  onReachBottom: function() {
    setTimeout(() => {
      this.loadMoreRss(this.data.classifyActived);
    }, 1000);
  },

  // 下拉刷新
  onPullDownRefresh: function() {
    var _pullDownFlag = this.data.pullDownFlag;

    if (_pullDownFlag) {
      var _classifyActived = this.data.classifyActived;

      this.data.pullDownFlag = false;

      this.data.newsList[_classifyActived].empty = false;
      this.data.newsList[_classifyActived].start = 0;
      this.data.newsList[_classifyActived].list = [];

      this.getRss(_classifyActived);
    }
  },

  // 获取新闻
  getRss: function(id) {
    var emptyFlag = this.data.newsList[id].empty;
    var _emptyFlag = 'newsList.' + id + '.empty';

    // 加载中
    wx.showLoading({
      title: '加载中',
      mask: true
    });

    if (!emptyFlag) {
      wx.request({
        url: app.api + '/rss/' + id,
        method: 'GET',
        data: {
          start: this.data.newsList[id].start,
          count: this.data.perCount
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded',
          Authorization: 'Bearer ' + app.store.token
        },
        success: res => {
          console.log(res);

          var _requestRes = res.data;
          if (_requestRes.statusCode === 200) {
            var classify = this.data.newsList[id].list;
            var _classify = 'newsList.' + id + '.list';
            // 更新结果数组
            classify.push.apply(classify, _requestRes.data);

            this.setData({
              [_classify]: classify
            });
          } else if (_requestRes.statusCode === 404) {
            emptyFlag = true;

            this.setData({
              [_emptyFlag]: emptyFlag
            });
            wx.showToast({
              title: '无更多新闻',
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
    }

    wx.hideLoading();
  },

  // 加载更多
  loadMoreRss: function(id) {
    this.data.newsList[id].start += this.data.perCount;
    this.getRss(id);
  },

  // 切换分类
  changeClassify: function(e) {
    var id = e.currentTarget.id;

    if (this.data.classifyActived === id) {
      return;
    } else {
      // 更新视图
      this.setData({
        classifyActived: id
      });
    }

    // 屏蔽多余请求
    if (this.data.newsList[id].list.length) {
      return;
    } else {
      this.getRss(id);
    }
  }
});
