Page({
  data: {
    help: {
      helpStatus: false,
      faqList: [
        {
          question: '1.为什么余额不准确?',
          answer: '为了同学们的资金财产安全,学校将一卡通系统并入了内网,并且没有提供统一的外网访问方式。我们将会考虑使用其他方案。'
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
