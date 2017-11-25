var app = getApp();

Page({
  data: {
    types: [
      { id: 'help', name: 'help', value: '咨询求助', checked: 'true' },
      { id: 'bug', name: 'bug', value: 'bug问题' },
      { id: 'suggest', name: 'suggest', value: '意见建议' }
    ],
    currentType: 'help',
    systemInfo: {
      // 手机型号
      model: '',
      // 客户端平台
      platform: '',
      // 微信版本号
      wxVersion: '',
      // wehpu版本号
      wehpuVersion: ''
    },
    content: '',
    tempImageList: [],
    imageList: [],
    // 限制图片尺寸 2 Mb = 2097152 b
    limitSize: 2097152,
    // issue url
    orderUrl: '',
    loading: false
  },

  onLoad: function() {
    this.getSystemInfo();
  },

  getSystemInfo: function() {
    try {
      var res = wx.getSystemInfoSync();

      this.setSystemInfo('model', res.model);
      this.setSystemInfo('platform', res.platform);
      this.setSystemInfo('wxVersion', res.version);
      this.setSystemInfo('wehpuVersion', app.version);
    } catch (e) {
      wx.showToast({
        title: '未知错误',
        image: '/images/common/fail.png',
        duration: 2000
      });
    }
  },

  // 提交
  handleSubmit: function() {
    var systemInfo = this.data.systemInfo;
    var data = this.data;

    // 禁用按钮
    this.setData({
      loading: true
    });

    if (this.checkField()) {
      Promise
        // 上传图片
        .resolve(this.uploadImages())
        // 提交反馈
        .then(() => {
          // 加载中
          wx.showLoading({
            title: '正在提交',
            mask: true
          });

          wx.request({
            url: app.api + '/feedback',
            data: {
              nick: app.store.nickName,
              content: data.content,
              labels: data.currentType,
              images: data.imageList.join(','),
              // 系统信息
              model: systemInfo.model,
              platform: systemInfo.platform,
              wxVersion: systemInfo.wxVersion,
              wehpuVersion: systemInfo.wehpuVersion
            },
            method: 'POST',
            header: {
              'content-type': 'application/json',
              Authorization: 'Bearer ' + app.store.token
            },
            success: requestRes => {
              console.log(requestRes);
              var _requestRes = requestRes.data;

              if (_requestRes.statusCode === 201) {
                wx.showToast({
                  title: '反馈成功',
                  icon: 'success',
                  duration: 2000
                });

                this.setData({
                  orderUrl: _requestRes.data.url
                });
              } else {
                wx.showToast({
                  title: '请稍后重试',
                  image: '/images/common/fail.png',
                  duration: 2000
                });
              }
            },
            fail: () => {
              wx.showToast({
                title: '提交失败',
                image: '/images/common/fail.png',
                duration: 2000
              });
            },
            complete: () => {
              wx.hideLoading();
              this.setData({
                loading: false
              });
            }
          });
        })
        .catch(err => {
          wx.showToast({
            title: '未知错误',
            image: '/images/common/fail.png',
            duration: 2000
          });
          this.setData({
            loading: false
          });
        });
    } else {
      wx.showToast({
        title: '信息填写有误',
        image: '/images/common/fail.png',
        duration: 2000
      });
      this.setData({
        loading: false
      });
    }
  },

  // 检查字段
  checkField: function() {
    return this.data.content.length >= 5;
  },

  // 处理反馈内容
  handleInput: function(e) {
    this.setData({
      content: e.detail.value
    });
    console.log(this.data.content);
  },

  // 选择图片
  chooseImage: function() {
    wx.chooseImage({
      sourceType: ['album', 'camera'],
      sizeType: ['original', 'compressed'],
      count: 3,
      success: res => {
        res.tempFiles.forEach(tempFile => {
          if (+tempFile.size < this.data.limitSize) {
            this.data.tempImageList.push(tempFile.path);
            this.setData({
              tempImageList: this.data.tempImageList
            });

            console.log(this.data);
          } else {
            wx.showToast({
              title: '图片尺寸过大',
              image: '/images/common/fail.png',
              duration: 2000
            });
          }
        });
      }
    });
  },
  // 预览图片
  previewImage: function(e) {
    var current = e.target.dataset.src;

    wx.previewImage({
      current: current,
      urls: this.data.tempImageList
    });
  },

  // 上传图片
  uploadImages: function() {
    // 加载中
    wx.showLoading({
      title: '图片上传中',
      mask: true
    });

    return new Promise((resolve, reject) => {
      var count = 0;
      var tempImageList = this.data.tempImageList;
      if (tempImageList.length) {
        tempImageList.forEach(tempFile => {
          console.log(tempFile);

          wx.uploadFile({
            url: app.api + '/upload',
            filePath: tempFile,
            name: 'file',
            formData: {
              folder: 'feedback',
              prefix: 'prefix-feedback-'
            },
            header: {
              Authorization: 'Bearer ' + app.store.token
            },
            success: requestRes => {
              var _requestRes = JSON.parse(requestRes.data);

              console.log(_requestRes);

              if (_requestRes.statusCode === 201) {
                this.data.imageList.push(_requestRes.data.url[0]);
              } else {
                wx.showToast({
                  title: '上传失败',
                  image: '/images/common/fail.png',
                  duration: 2000
                });
              }
            },
            fail: () => {
              wx.showToast({
                title: '上传失败',
                image: '/images/common/fail.png',
                duration: 2000
              });
            },
            complete: () => {
              count += 1;

              if (count === tempImageList.length) {
                wx.hideLoading();
                console.log(this.data.imageList);
                resolve();
              }
            }
          });
        });
      } else {
        wx.hideLoading();
        resolve();
      }
    });
  },

  // 切换返回类型
  radioChange: function(e) {
    this.data.currentType = e.detail.value;
  },

  // 设置系统信息
  setSystemInfo: function(key, val) {
    this.data.systemInfo[key] = val;
  },

  handleCopy: function() {
    wx.setClipboardData({
      data: this.data.orderUrl,
      success: res => {
        wx.showToast({
          title: '链接已复制',
          icon: 'success',
          duration: 2000
        });
      }
    });
  }
});
