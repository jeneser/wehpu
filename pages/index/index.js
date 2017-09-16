//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    tools: [
      { id: 'kbcx', name: '课表查询', disabled: false},
      { id: 'kjs', name: '空教室', disabled: false},
      { id: 'cjcx', name: '成绩查询', disabled: false},
      { id: 'jyxx', name: '图书馆', disabled: false},
      { id: 'ykt', name: '一卡通', disabled: false},
      { id: 'bx', name: '报修', disabled: false},
      { id: 'slj', name: '四六级', disabled: false},
      { id: 'other', name: '更多', disabled: false}
    ],
  },
  onLoad: function() {
    wx.navigateTo({
      url: '/pages/more/binding'
    });
  }
})
