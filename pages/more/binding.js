Page({
  data: {
    useridFocus: false,
    vpnPassWordFocus: false,
    jwcPassWordFocus: false,
    helpStatus: false
  },
  // 获取焦点
  inputFocus: function (e) {
    if (e.target.id === 'userId') {
      this.setData({
        'userIdFocus': true
      });
    } else if (e.target.id === 'vpnPassWord') {
      this.setData({
        'vpnPassWordFocus': true
      });
    } else if (e.target.id === 'jwcPassWord') {
      this.setData({
        'jwcPassWordFocus': true
      });
    }
  },
  // 失去焦点
  inputBlur: function (e) {
    if (e.target.id === 'userId') {
      this.setData({
        'userIdFocus': false
      });
    } else if (e.target.id === 'vpnPassWord') {
      this.setData({
        'vpnPassWordFocus': false
      });
    } else if (e.target.id === 'jwcPassWord') {
      this.setData({
        'jwcPassWordFocus': false
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
  },
  // 帮助
  showHelp: function() {
    this.setData({
      'helpStatus': true
    });
  },
  hideHelp: function(e) {
    if (e.target.id === "help" || e.target.id === "close-help") {
      this.setData({
        'helpStatus': false
      });
    }
  },
  // 解除绑定
  unbind: function() {
    wx.showModal({
      title: '提示',
      content: '确定要解除绑定吗?',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  }
})
