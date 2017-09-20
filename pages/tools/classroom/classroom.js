Page({
  data: {
    location: [
      '一号教学楼',
      '二号教学楼',
      '三号教学楼',
      '计算机综合楼',
      '电气综合楼'
    ],
    locationIndex: 0,
    weekly: [
      [
        '第一周',
        '第二周',
        '第三周',
        '第四周',
        '第五周',
        '第六周'
      ],
      [
        '星期一',
        '星期二',
        '星期三',
        '星期四',
        '星期五',
        '星期六',
        '星期日'
      ]
    ],
    weeklyIndex: [0, 0],
    lesson: [
      '第一大节',
      '第二大节',
      '第三大节',
      '第四大节',
      '第五大节'
    ],
    lessonIndex: 0
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      locationIndex: e.detail.value
    })
  },
  bindLessonChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      lessonIndex: e.detail.value
    })
  },
  bindWeeklyChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      weeklyIndex: e.detail.value
    })
  },

  // 选择地址
  chooseLocation: function() {
    wx.chooseLocation({
      success: function(res) {
        console.log(res.name);
      },
    })
  }
  
})
