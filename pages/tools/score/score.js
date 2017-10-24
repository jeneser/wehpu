Page({
  data: {
    score: {
      title: '本学期成绩',
      userName: '王亚哲',
      studentId: '311509040120',
      scoreList: [
        {
          courseName: '计算机网络',
          mark: 90
        },
        {
          courseName: '线性代数a',
          mark: 90
        },
        {
          courseName: '计算机网络课程设计计算机网络课程设计',
          mark: 90
        },
        {
          courseName: '网络编程技术',
          mark: 90
        },
        {
          courseName: '中国近现代史纲要',
          mark: 'A'
        },
        {
          courseName: '二年级足球2',
          mark: 90
        },
        {
          courseName: '旅游景观鉴赏',
          mark: 90
        }
      ],
      updateTime: '教务处状态ok'
    },
    help: {
      helpStatus: false,
      faqList: [
        {
          question: '1.为什么无法查询成绩?',
          answer:
            '由于在一段时间内有大规模流量同时访问教务处,以致其无法提供正常的服务。wehpu后端采用集群以及负载均衡技术以应对大规模流量,同时wehpu会自动判断当前教务处网站状态,并采取一定的保护措施。如果成绩不能及时更新,请稍后刷新重试！'
        }
      ]
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
