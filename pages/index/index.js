//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    tools: [
      { id: 'kbcx', name: '课表查询', url: '/pages/tools/course/course_tody', disabled: false},
      { id: 'kjs', name: '空教室', url: '', disabled: false},
      { id: 'cjcx', name: '成绩查询', url: '', disabled: false},
      { id: 'jyxx', name: '图书馆', url: '', disabled: false},
      { id: 'ykt', name: '一卡通', url: '', disabled: false},
      { id: 'bx', name: '报修', url: '', disabled: false},
      { id: 'slj', name: '四六级', url: '', disabled: false},
      { id: 'other', name: '更多', url: '', disabled: false}
    ],
  },
  // onLoad: function() {
  //   wx.navigateTo({
  //     url: '/pages/more/binding'
  //   });
  // }
})
