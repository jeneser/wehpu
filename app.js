App({
  // 辅助工具
  util: require('./utils/util'),
  // 版本号
  version: '1.0.0',
  // 缓存数据
  store: {},
  // 用户信息
  user: {},

  onLaunch: function() {
    // 尝试读取所有缓存
    try {
      var data = wx.getStorageInfoSync();
      if (data && data.keys.length) {
        data.keys.forEach(key => {
          var value = wx.getStorageSync(key);
          if (value) {
            this.store[key] = value;
          }
        });
        // 清除旧版本代码缓存的数据
        if (this.store.version !== this.version) {
          this.store = {};
          wx.clearStorage();
        } else {
          // 处理用户信息
          this.user.wxUser = this.store.userInfo.wxUser || {};
          this.processData(this.store.userInfo);
        }
      }
    } catch (e) {
      console.warn('读取缓存失败！');
    }
    
  },

  // 获取微信用户信息
  // getUserInfo: function() {
  //   wx.getUserInfo({
  //     success: function(res) {
  //       console.log(res);
  //     },
  //     fail: function(res) {
  //       wx.showModal({
  //         title: '授权失败',
  //         content: '拒绝授权将会影响您的正常使用，请重新打开wehpu进行授权。',
  //         showCancel: false,
  //         success: function(res) {
  //           if (res.confirm) {
  //             console.log('用户点击确定')
  //           } else if (res.cancel) {
  //             console.log('用户点击取消')
  //           }
  //         }
  //       })
  //     }
  //   });
  // }

});
