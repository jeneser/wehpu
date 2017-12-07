var app = getApp();

Page({
  data: {
    title: '本学期成绩',
    scoreList: [],
    detailStatus: false,
    scoreDetail: {},
    help: {
      helpStatus: false,
      faqList: [
        {
          question: '1.为什么无法查询成绩?',
          answer:
            '由于在一段时间内有大规模流量同时访问教务处,以致其无法提供正常的服务。wehpu后端采用集群以及负载均衡技术以应对大规模流量,同时wehpu会自动判断当前教务处网站状态,并采取一定的保护措施,请勿频繁刷新。如果成绩不能及时更新,请稍后刷新重试！'
        }
      ]
    }
  },

  onLoad: function() {
    this.getScore();
  },

  onPullDownRefresh: function() {
    this.getScore();
    wx.stopPullDownRefresh();
  },

  // 获取成绩
  getScore: function() {
    // 加载中
    wx.showLoading({
      title: '获取中',
      mask: true
    });

    //发起网络请求
    wx.request({
      url: app.api + '/score',
      method: 'GET',
      header: {
        Authorization: 'Bearer ' + app.store.token
      },
      success: requestRes => {
        var _requestRes = requestRes.data;
        // console.log(_requestRes);

        wx.hideLoading();
        if (_requestRes.statusCode === 200) {
          // 更新视图
          this.setData({
            scoreList: _requestRes.data
          });
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

  // 详情
  showDetail: function(e) {
    var data = e.currentTarget.dataset.score;

    // 更新视图
    this.setData({
      detailStatus: true,
      scoreDetail: data
    });
  },

  hideDetail: function(e) {
    if (e.target.id === 'score-detail' || e.target.id === 'close-detail') {
      this.setData({
        detailStatus: false
      });
    }
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
