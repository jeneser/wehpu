Page({
  data: {
    score: {
      title: '历年成绩',
      userName: '王亚哲',
      studentId: '311509040120',
      scoreList: [
        // {
        //   courseName: '计算机网络',
        //   mark: 90
        // },
        // {
        //   courseName: '线性代数a',
        //   mark: 90
        // },
        // {
        //   courseName: '计算机网络课程设计计算机网络课程设计',
        //   mark: 90
        // },
        // {
        //   courseName: '网络编程技术',
        //   mark: 90
        // },
        // {
        //   courseName: '中国近现代史纲要',
        //   mark: 'A'
        // },
        // {
        //   courseName: '二年级足球2',
        //   mark: 90
        // },
        // {
        //   courseName: '旅游景观鉴赏',
        //   mark: 90
        // }
      ],
      updateTime: '9/18 21:14 更新'
    },
    help: {
      helpStatus: false,
      faqList: [
        {
          question: '1.什么是历年成绩?',
          answer: '历年成绩即是个人方案成绩。该成绩列表来源于教务系统下的方案成绩查询。如有疑问,请反馈给我们。'
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
