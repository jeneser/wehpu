var app = getApp();

Page({
  data: {
    studentId: '',
    publisher: '',
    contact: '',
    comment: ''
  },

  onLoad: function() {},

  // 获取焦点
  // inputFocus: function(e) {
  //   if (e.target.id === 'studentId') {
  //     this.setData({
  //       studentIdFocus: true
  //     });
  //   } else if (e.target.id === 'vpnPassWord') {
  //     this.setData({
  //       vpnPassWordFocus: true
  //     });
  //     this.setData({
  //       vpnPassWordErr: true
  //     });
  //   } else if (e.target.id === 'jwcPassWord') {
  //     this.setData({
  //       jwcPassWordFocus: true
  //     });
  //     this.setData({
  //       jwcPassWordErr: true
  //     });
  //   }
  // },

  // 双向绑定
  inputBlur: function(e) {
    var id = e.target.id;

    if (id === 'studentId') {
      this.setData({
        studentId: e.detail.value
      });
    } else if (id === 'publisher') {
      this.setData({
        publisher: e.detail.value
      });
    } else if (id === 'contact') {
      this.setData({
        contact: e.detail.value
      });
    } else if (id === 'comment') {
      this.setData({
        comment: e.detail.value
      });
    }

    console.log(this.data)
  },

  // 提交
  formSubmit: function(e) {
    // 加载中
    // wx.showLoading({
    //   title: '获取中',
    //   mask: true
    // });

    wx.request({
      url: app.api + '/notify',
      data: {
        studentId: this.data.studentId,
        templateId: 'AT1107',
        formId: e.detail.formId,
        data: {
          keyword2: {
            value: this.data.studentId
          },
          keyword3: {
            value: this.data.publisher
          },
          keyword4: {
            value: this.data.contact
          },
          keyword5: {
            value: this.data.comment
          }
        }
      },
      method: 'POST',
      header: {
        'content-type': 'application/json',
        Authorization: 'Bearer ' + app.store.token
      },
      success: res => {
        console.log(res)
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  }
});
