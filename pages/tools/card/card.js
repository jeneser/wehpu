Page({
  data: {
    helpStatus: false
  },
  // 帮助
  showHelp: function () {
    this.setData({
      'helpStatus': true
    });
  },
  hideHelp: function (e) {
    if (e.target.id === "help" || e.target.id === "close-help") {
      this.setData({
        'helpStatus': false
      });
    }
  },
})
