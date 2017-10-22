var app = getApp();

Page({
  data: {
    bind: false,
    // 工具
    tools: [
      [
        {
          id: 'course',
          name: '课表查询',
          url: '/pages/tools/course/course'
        },
        {
          id: 'classroom',
          name: '空教室',
          url: '/pages/tools/classroom/classroom'
        },
        {
          id: 'score',
          name: '成绩查询',
          url: '/pages/tools/score/score'
        },
        {
          id: 'library',
          name: '图书馆',
          url: '/pages/tools/library/library'
        },
        {
          id: 'card',
          name: '一卡通',
          url: '/pages/tools/card/card'
        },
        {
          id: 'repair',
          name: '报修',
          url: '/pages/tools/repair/repair'
        },
        {
          id: 'cet',
          name: '座位预约',
          url: '/pages/tools/seat/seat'
        },
        {
          id: 'cet',
          name: '体测查询',
          url: '/pages/tools/seat/seat'
        }
      ],
      [
        {
          id: 'card',
          name: '一卡通',
          url: '/pages/tools/card/card'
        },
        {
          id: 'repair',
          name: '报修',
          url: '/pages/tools/repair/repair'
        }
      ]
    ],
    // 当前课程
    currentCourse: [
      {
        name: '数据库系统原理',
        room: '202',
        place: '计算机综合楼',
        count: '2',
        teacher: '刘老师',
        time: '8:00-10:00',
        state: 1
      },
      {
        name: '数据库系统原理',
        room: '202',
        place: '计算机综合楼',
        count: '2',
        teacher: '刘老师',
        time: '8:00-10:00',
        state: 0
      }
    ]
  },
  onLoad: function() {
    // 获取用户基本信息
    this.getUserInfo();
  },
  getUserInfo: function() {
    var store = app.store;

    if (JSON.stringify(store) !== '{}') {
      this.setData({
        bind: store.bind
      });
    }
  },
  // 点击禁用项目
  tapDisabledItem: function() {
    wx.showToast({
      title: '未绑定',
      image: '/images/fail.png',
      duration: 2000
    });
  }
});
