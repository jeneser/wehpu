Page({
  data: {
    studentId: '',
    studentIdFocus: false,
    vpnPassWordFocus: false,
    jwcPassWordFocus: false,
    loading: false,
    help: {
      helpStatus: false,
      faqList: [
        {
          question: '1.校外访问VPN密码是什么?',
          answer: '初始密码或者已更改的密码。初始密码一般为身份证号后6位。'
        },
        {
          question: '2.教务处密码是什么?',
          answer: '初始密码或者已更改的密码。初始密码为学号/一卡通号。'
        },
        {
          question: '3.忘记密码?',
          answer: '请联系学校教务处管理员。'
        }
      ]
    }
  },
  // 获取焦点
  inputFocus: function(e) {
    if (e.target.id === 'studentId') {
      this.setData({
        studentIdFocus: true
      });
    } else if (e.target.id === 'vpnPassWord') {
      this.setData({
        vpnPassWordFocus: true
      });
    } else if (e.target.id === 'jwcPassWord') {
      this.setData({
        jwcPassWordFocus: true
      });
    }
  },
  // 失去焦点
  inputBlur: function(e) {
    if (e.target.id === 'studentId') {
      this.setData({
        studentIdFocus: false
      });
    } else if (e.target.id === 'vpnPassWord') {
      this.setData({
        vpnPassWordFocus: false
      });
    } else if (e.target.id === 'jwcPassWord') {
      this.setData({
        jwcPassWordFocus: false
      });
    }
  },
  // 下一步
  navigateNext: function() {
    wx.navigateTo({
      url: 'binding?id=1'
    });
  },
  // 取消认证
  navigateCancel: function() {
    wx.navigateBack();
  },
  // 扫码
  scanStudentId: function() {
    wx.scanCode({
      onlyFromCamera: true,
      success: res => {
        console.log(res);
        this.setData({
          studentId: res.result
        });
      }
    });
  },
  showTip: function() {
    wx.showModal({
      title: '提示',
      content: '请将学生卡/一卡通背面的条形码放入方框内。',
      success: res => {
        if (res.confirm) {
          console.log('用户点击确定');
          this.scanStudentId();
        } else if (res.cancel) {
          console.log('用户点击取消');
        }
      }
    });
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
  },
  // 解除绑定
  unbind: function() {
    wx.showModal({
      title: '提示',
      content: '确定要解除绑定吗?',
      success: function(res) {
        if (res.confirm) {
          console.log('用户点击确定');
        } else if (res.cancel) {
          console.log('用户点击取消');
        }
      }
    });
  }
});
