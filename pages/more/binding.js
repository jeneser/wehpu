var app = getApp();

Page({
  data: {
    studentId: '',
    vpnPassWord: '',
    jwcPassWord: '',
    studentIdFocus: false,
    vpnPassWordFocus: false,
    jwcPassWordFocus: false,
    loading: false,
    step: 1,
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

  onLoad: function() {
    if (app.store.bind === true) {
      this.setData({
        step: 3
      });
    } else {
      this.setData({
        step: 1
      });
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
      console.log(this.data.studentId);
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

  // 双向绑定
  keyInput: function(e) {
    var id = e.target.id;

    if (id === 'studentId') {
      this.setData({
        studentId: e.detail.value
      });
    } else if (id === 'vpnPassWord') {
      this.setData({
        vpnPassWord: e.detail.value
      });
    } else if (id === 'jwcPassWord') {
      this.setData({
        jwcPassWord: e.detail.value
      });
    }
  },

  // 下一步
  navigateNext: function() {
    var studentId = this.data.studentId;

    if (!studentId || studentId.length < 12) {
      wx.showToast({
        title: '请正确填写学号',
        image: '/images/fail.png',
        duration: 2000
      });
    } else {
      this.setData({
        step: 2
      });
    }
  },

  // 取消认证
  navigateCancel: function() {
    wx.navigateBack();
  },

  // 扫码获取学号
  scanStudentId: function() {
    wx.showModal({
      title: '提示',
      content: '请将一卡通背面的条形码放入框内，即可自动扫描。',
      showCancel: false,
      success: operation => {
        if (operation.confirm) {
          console.log('用户点击确定');
          wx.scanCode({
            onlyFromCamera: true,
            success: scanRes => {
              console.log(scanRes);
              this.setData({
                studentId: scanRes.result
              });
            }
          });
        }
      }
    });
  },

  // 上一步
  navigatePre: function() {
    this.setData({
      step: 1
    });
  },

  // 认证并绑定
  bind: function() {
    var studentId = this.data.studentId;
    var vpnPassWord = this.data.vpnPassWord;
    var jwcPassWord = this.data.jwcPassWord;

    if (!vpnPassWord || !jwcPassWord) {
      wx.showToast({
        title: '请正确填写密码',
        image: '/images/fail.png',
        duration: 2000
      });
    } else {
      // wx.showLoading({
      //   title: '认证中',
      //   mask: true
      // })
      // 发起网络请求
      wx.request({
        url: app.api + '/users/binding',
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded',
          'Authorization': 'Bearer ' + app.store.token
        },
        data: {
          studentId: studentId,
          vpnPassWord: vpnPassWord,
          jwcPassWord: jwcPassWord
        },
        success: bindingState => {
          console.log(bindingState);
          // this.setData({
          //   step: 3
          // });
        }
      });
    }
  },

  // 解除绑定
  unbind: function() {
    wx.showModal({
      title: '提示',
      content: '确定要解除绑定吗?',
      success: operation => {
        if (operation.confirm) {
          console.log('用户点击确定');
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
  }
});
