Page({
  data: {
    useridFocus: false
  },
  // 获取焦点
  inputFocus: function (e) {
    if (e.target.id == 'userid') {
      this.setData({
        'useridFocus': true
      });
    }
  },
  // 失去焦点
  inputBlur: function (e) {
    if (e.target.id == 'userid') {
      this.setData({
        'useridFocus': false
      });
    }
  },
  // 下一步
  navigateNext: function() {
    wx.navigateTo({
      url: 'binding?id=1'
    })
  },
  // 取消认证
  navigateCancel: function() {
    wx.navigateBack();
  }
})
