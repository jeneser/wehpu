var app = getApp();

Page({
  data: {
    userInfo: {
      href: '/pages/more/user/user',
      avatar: '/images/ic_avatar.png',
      nickName: 'wehpu',
      bind: false
    }
  },
  onLoad: function() {
    // 获取用户基本信息
    this.getUserInfo();
  },
  getUserInfo: function() {
    var store = app.store;

    if (JSON.stringify(store) !== '{}') {
      var userInfo = {
        href: '/pages/more/user/user',
        avatar: store.avatarUrl,
        nickName: store.nickName,
        bind: store.bind
      };

      // 更新数据
      this.setData({
        userInfo: userInfo
      });
    }
  }
});
