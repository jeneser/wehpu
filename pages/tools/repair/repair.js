Page({
  data: {
    location: [
      '南校区学生公寓兰园5#学生公寓楼',
      '南校区学生公寓兰园5#学生公寓楼',
      '南校区学生公寓兰园5#学生公寓楼',
      '南校区学生公寓兰园5#学生公寓楼',
      '南校区学生公寓兰园5#学生公寓楼'
    ],
    locationIndex: 0,
    project: [
      ['管网维修', '土建维修', '给排水维修', '电器维修', '木工维修'],
      ['自来水外网管类', '自来水外网管类', '自来水外网管类', '自来水外网管类']
    ],
    projectIndex: [0, 0],
    imageList: []
  },
  bindProjectChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value);
    this.setData({
      projectIndex: e.detail.value
    });
  },
  // 选择地址
  chooseLocation: function() {
    wx.chooseLocation({
      success: function(res) {
        console.log(res.name);
      }
    });
  },

  // 图片上传
  chooseImage: function() {
    var that = this;
    wx.chooseImage({
      sourceType: ['album', 'camera'],
      sizeType: ['original', 'compressed'],
      count: 3,
      success: function(res) {
        console.log(res);
        that.setData({
          imageList: res.tempFilePaths
        });
      }
    });
  },
  // 预览图片
  previewImage: function(e) {
    var current = e.target.dataset.src;

    wx.previewImage({
      current: current,
      urls: this.data.imageList
    });
  }
});
