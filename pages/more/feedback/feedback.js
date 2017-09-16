Page({
  data: {
    items: [
      { id: 'help', name: 'help', value: '资讯求助', checked: 'true' },
      { id: 'bug', name: 'bug', value: 'bug问题', },
      { id: 'suggest', name: 'suggest', value: '意见建议' }
    ],
    imageList: []
  },

  // 图片上传
  chooseImage: function () {
    var that = this
    wx.chooseImage({
      sourceType: ['album', 'camera'],
      sizeType: ['original', 'compressed'],
      count: 3,
      success: function (res) {
        console.log(res)
        that.setData({
          imageList: res.tempFilePaths
        })
      }
    })
  },
  // 预览图片
  previewImage: function (e) {
    var current = e.target.dataset.src

    wx.previewImage({
      current: current,
      urls: this.data.imageList
    })
  }
  
})
