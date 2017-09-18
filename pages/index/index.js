//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    tools: [
      { id: 'course', name: '课表查询', url: '/pages/tools/course/course_tody', disabled: false},
      { id: 'classroom', name: '空教室', url: '/pages/tools/classroom/classroom', disabled: false},
      { id: 'score', name: '成绩查询', url: '/pages/tools/score/score', disabled: false},
      { id: 'library', name: '图书馆', url: '/pages/tools/library/library', disabled: false},
      { id: 'card', name: '一卡通', url: '/pages/tools/card/card', disabled: false},
      { id: 'repair', name: '报修', url: '/pages/tools/repair/repair', disabled: false},
      { id: 'cet', name: '四六级', url: '/pages/tools/cet/cet', disabled: false},
      { id: 'more', name: '更多', url: '/pages/tools/more/more', disabled: false}
    ],
  },
  // onLoad: function() {
  //   wx.navigateTo({
  //     url: '/pages/more/binding'
  //   });
  // }
})
