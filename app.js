App({
  // 辅助工具
  util: require('./utils/util'),
  // 版本号
  version: '1.0.0',
  // 缓存数据
  store: {},
  // 本学期开学时间
  schoolYear: '2017-9-4',
  // API
  api: 'https://wehpu.jeneser.wang/api',

  onLaunch: function() {
    // 尝试读取storage，并更新store
    try {
      var storageInfo = wx.getStorageInfoSync();

      if (storageInfo && storageInfo.keys.length) {
        if (wx.getStorageSync('version') === this.version) {
          // 遍历本地缓存更新store
          storageInfo.keys.forEach(key => {
            var value = wx.getStorageSync(key);
            if (value !== undefined) {
              this.store[key] = value;
            }
          });
        } else {
          // 清除旧版本代码缓存的数据
          this.store = {};
          wx.clearStorage();
        }
      }
    } catch (e) {
      // console.warn('读取缓存失败');
      wx.showToast({
        title: '未知错误',
        image: '/images/common/fail.png',
        duration: 2000
      });
    }

    // 检查app信息
    wx.getNetworkType({
      success: networkStatus => {
        var networkType = networkStatus.networkType;
        if (
          networkType !== '2g' &&
          networkType !== 'none' &&
          networkType !== 'unknown'
        ) {
          this.checkInfo();
        } else {
          wx.showToast({
            title: '无网络连接',
            image: '/images/common/fail.png',
            duration: 2000
          });
        }
      }
    });

    // 监听网络连接
    wx.onNetworkStatusChange(networkStatus => {
      if (networkStatus.isConnected && networkStatus.networkType !== '2g') {
        this.checkInfo();
      } else {
        wx.showToast({
          title: '无网络连接',
          image: '/images/common/fail.png',
          duration: 2000
        });
      }
    });
  },

  // 检查app信息
  checkInfo: function() {
    // 检查是否有token
    if (!this.store.token) {
      // 用户登录
      this.login();
    }
    // 检查绑定信息
    this.checkBind();

    // 获取用户信息，检查Token是否有效
    if (this.store.bind === true && this.store.token) {
      //发起网络请求
      wx.request({
        url: this.api + '/users/userInfo',
        method: 'GET',
        header: {
          'content-type': 'application/x-www-form-urlencoded',
          Authorization: 'Bearer ' + this.store.token
        },
        success: requestRes => {
          var _requestRes = requestRes.data;
          var userInfo = _requestRes.data;
          // console.log(_requestRes);

          if (_requestRes.statusCode === 200) {
            // 存储用户基本信息
            this.setStore('studentId', userInfo.studentId);
            this.setStore('name', userInfo.name);
          } else if (_requestRes.statusCode === 403) {
            // token失效，重新登录
            this.login();
          } else {
            wx.showToast({
              title: '未知错误',
              image: '/images/common/fail.png',
              duration: 2000
            });
          }
        }
      });
    }
  },

  // 检查绑定信息
  checkBind: function() {
    if (this.store.bind === false || this.store.bind === undefined) {
      wx.redirectTo({
        url: '/pages/more/binding'
      });
    }
  },

  // 用户登录
  login: function() {
    wx.login({
      success: loginRes => {
        if (loginRes.code) {
          // 获取微信用户信息
          this.getUserInfo(loginRes.code);
        }
      }
    });
  },

  // 获取微信用户信息
  getUserInfo: function(code) {
    wx.getUserInfo({
      withCredentials: true,
      success: userInfo => {
        if (userInfo.encryptedData && userInfo.iv) {
          //发起网络请求
          wx.request({
            url: this.api + '/users/login',
            method: 'POST',
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            data: {
              code: code,
              encryptedData: userInfo.encryptedData,
              iv: userInfo.iv
            },
            success: loginState => {
              var _loginState = loginState.data;

              // 200/201 已存在返回成功/不存在新建并返回成功
              if (
                _loginState.statusCode === 200 ||
                _loginState.statusCode === 201
              ) {
                // 更新版本存储数据
                this.setStore('version', this.version);
                this.setStore('token', _loginState.data.token);
                this.setStore('bind', _loginState.data.bind);

                // 保存用户基本信息
                this.setStore('nickName', userInfo.userInfo.nickName);
                this.setStore('avatarUrl', userInfo.userInfo.avatarUrl);
                // console.log(this.store);
              } else {
                wx.showToast({
                  title: '登陆失败',
                  icon: '/images/common/fail.png',
                  duration: 2000
                });
              }
            },
            fail: () => {
              wx.showToast({
                title: '未知错误',
                icon: '/images/common/fail.png',
                duration: 2000
              });
            }
          });
        } else {
          wx.showToast({
            title: '未知错误',
            icon: '/images/common/fail.png',
            duration: 2000
          });
        }
      },
      fail: err => {
        wx.showModal({
          title: '授权失败',
          content: '拒绝授权将无法关联校内资源，请点击确定并允许wehpu访问用户信息。',
          showCancel: false,
          success: res => {
            if (res.confirm) {
              // 引导用户授权
              wx.openSetting({
                success: res => {
                  if (res.authSetting['scope.userInfo']) {
                    // 重新登陆
                    this.login();
                  }
                }
              });
            }
          }
        });
      }
    });
  },

  // 更新store和storage
  setStore: function(key, value) {
    if (!key) {
      return;
    }
    this.store[key] = value;
    wx.setStorage({
      key: key,
      data: value
    });
  }
});
