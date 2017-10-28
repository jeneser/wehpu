var app = getApp();

Page({
  data: {
    mode: 'wechatpay',
    donorList: [
      {
        donor: '可爱的二哈',
        money: '10'
      },
      {
        donor: '可爱的二哈',
        money: '20'
      },
      {
        donor: '可爱的二哈',
        money: '2'
      }
    ]
  },
  // 切换方式
  switchMode: function(e) {
    if (e.target.id) {
      this.setData({
        mode: e.target.id
      });
    }
  },
  // 保存二维码
  saveQr: function() {
    var path = '/images/more/' + this.data.mode + '_qrcode.png';

    console.log(path);
    wx.saveImageToPhotosAlbum({
      filePath: path,
      success: () => {
        wx.showToast({
          title: '已保存到本地',
          icon: 'success',
          duration: 2000
        });
      },
      fail: () => {
        wx.showToast({
          title: '自动保存失败',
          image: '/images/common/fail.png',
          duration: 2000
        });
      }
    });
  }
});
