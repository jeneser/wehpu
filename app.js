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
  api: 'http://66.112.214.183:4000',

  onLaunch: function() {
    // 尝试读取storage，并更新store
    try {
      var storageInfo = wx.getStorageInfoSync();
      console.log(storageInfo);
      if (storageInfo && storageInfo.keys.length) {
        if (wx.getStorageSync('version') === this.version) {
          // 遍历本地缓存
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
      console.warn('读取缓存失败');
    }

    console.log(this.store.version);

    // 获取网络状态
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
            image: '/images/fail.png',
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
          image: '/images/fail.png',
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

    // 获取第三方服务器用户信息
    // 检查Token是否有效
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
          var requestRes = requestRes.data;
          var userInfo = requestRes.data;
          console.log(requestRes);

          if (requestRes.statusCode === 200) {
            // 存储用户基本信息
            this.setStore('studentId', userInfo.studentId);
            this.setStore('name', userInfo.name);
          } else if (requestRes.statusCode === 403) {
            // token失效，重新登录
            this.login();
          } else {
            wx.showToast({
              title: '未知错误',
              image: '/images/fail.png',
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
        } else {
          console.log('获取用户登录态失败！' + res.errMsg);
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
              var loginState = loginState.data;

              // 200 已存在并返回成功
              // 201 不存在新建并返回成功
              if (
                loginState.statusCode === 200 ||
                loginState.statusCode === 201
              ) {
                // 保存数据
                this.setStore('version', this.version);
                this.setStore('token', loginState.data.token);
                this.setStore('bind', loginState.data.bind);

                // 保存用户基本信息
                this.setStore('nickName', userInfo.userInfo.nickName);
                this.setStore('avatarUrl', userInfo.userInfo.avatarUrl);

                console.log(this.store);
              }
            },
            fail: () => {
              wx.showToast({
                title: '服务器繁忙',
                icon: '/images/fail.png',
                duration: 2000
              });
            }
          });
        } else {
          console.log('获取用户信息失败！' + res.errMsg);
        }
      },
      fail: err => {
        wx.showModal({
          title: '授权失败',
          content: '拒绝授权将无法关联校内资源，请点击确定并允许wehpu访问用户信息。',
          showCancel: false,
          success: res => {
            if (res.confirm) {
              console.log('用户点击确定');
              wx.openSetting({
                success: res => {
                  if (res.authSetting['scope.userInfo']) {
                    this.login();
                  }
                  console.log(res.authSetting);
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
