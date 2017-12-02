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
          name: '校园卡',
          url: '/pages/tools/card/card'
        },
        {
          id: 'repair',
          name: '报修',
          url: '/pages/tools/repair/repair'
        },
        {
          id: 'cet',
          name: '四六级',
          url: '/pages/tools/cet/cet'
        },
        {
          id: 'physical',
          name: '体测查询',
          url: '/pages/tools/physical/physical'
        }
      ],
      [
        {
          id: 'calendar',
          name: '校历',
          url: '/pages/tools/calendar/calendar'
        }
      ]
    ],
    // 当前课程
    todayCourse: [
      {
        name: '数据库系统原理',
        place: '计算机105',
        section: '1-2'
      },
      {
        name: '操作系统',
        place: '计算机101',
        section: '3-4'
      },
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
      image: '/images/common/fail.png',
      duration: 2000
    });
  }
});
