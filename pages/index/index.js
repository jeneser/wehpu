Page({
  data: {
    // 工具
    tools: [
      {
        id: 'course',
        name: '课表查询',
        url: '/pages/tools/course/course_tody',
        disabled: false
      },
      {
        id: 'classroom',
        name: '空教室',
        url: '/pages/tools/classroom/classroom',
        disabled: false
      },
      {
        id: 'score',
        name: '成绩查询',
        url: '/pages/tools/score/score',
        disabled: false
      },
      {
        id: 'library',
        name: '图书馆',
        url: '/pages/tools/library/library',
        disabled: false
      },
      {
        id: 'card',
        name: '一卡通',
        url: '/pages/tools/card/card',
        disabled: false
      },
      {
        id: 'repair',
        name: '报修',
        url: '/pages/tools/repair/repair',
        disabled: false
      },
      {
        id: 'cet',
        name: '座位预约',
        url: '/pages/tools/seat/seat',
        disabled: false
      },
      { id: 'more', name: '更多', url: '/pages/tools/more/more', disabled: false }
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
  }
});
