var app = getApp();

Page({
  data: {
    week: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
    weeklyArray: [
      '1周',
      '2周',
      '3周',
      '4周',
      '5周',
      '6周',
      '7周',
      '8周',
      '9周',
      '10周',
      '11周',
      '12周',
      '13周',
      '14周',
      '15周',
      '16周',
      '17周',
      '18周',
      '19周',
      '20周',
      '21周',
      '22周',
      '23周',
      '24周',
      '25周',
      '26周',
      '27周',
      '28周',
      '29周',
      '30周'
    ],
    // 今日周几
    today: 0,
    // 当前周
    currentWeekly: 0,
    // 课表详情Flag
    detailStatus: false,
    // 周一课程
    mon: [
      {
        name: '操作系统',
        place: '计算机110',
        time: '1-2',
        weekly: [1, 12],
        teacher: '张磊',
        color: 1
      },
      {
        name: '电子商务/电子政务',
        place: '计算机202',
        time: '3-4',
        weekly: [1, 6],
        teacher: '赵宗渠',
        color: 2
      },
      {
        name: '矿山信息化',
        place: '计算机110',
        time: '3-4',
        weekly: [11, 12],
        teacher: '赵文涛',
        color: 3
      },
      {
        name: '矿山信息化',
        place: '计算机110',
        time: '3-4',
        weekly: [14, 15],
        teacher: '赵文涛',
        color: 3
      },
      {
        name: '无线网络技术',
        place: '计算机107',
        time: '5-6',
        weekly: [1, 6],
        teacher: '贾慧娟',
        color: 4
      }
    ],
    tue: [
      {
        name: '数据库系统原理',
        place: '计算机110',
        time: '1-2',
        weekly: [8, 12],
        teacher: '刘小燕',
        color: 1
      },
      {
        name: '数据库系统原理',
        place: '计算机110',
        time: '1-2',
        weekly: [14, 16],
        teacher: '刘小燕',
        color: 1
      },
      {
        name: 'PKI原理与技术',
        place: '计算机102',
        time: '3-4',
        weekly: [1, 8],
        teacher: '张静',
        color: 2
      },
      {
        name: '路由与交换技术',
        place: '计算机106',
        time: '9-10',
        weekly: [1, 9],
        teacher: '陈彦良',
        color: 3
      }
    ],
    wed: [
      {
        name: '数据库系统原理',
        place: '计算机110',
        time: '1-2',
        weekly: [8, 12],
        teacher: '刘小燕',
        color: 1
      },
      {
        name: '数据库系统原理',
        place: '计算机110',
        time: '1-2',
        weekly: [14, 16],
        teacher: '刘小燕',
        color: 1
      },
      {
        name: '无线网络技术',
        place: '计算机107',
        time: '3-4',
        weekly: [1, 6],
        teacher: '贾慧娟',
        color: 4
      },
      {
        name: '电子商务/电子政务',
        place: '计算机202',
        time: '5-6',
        weekly: [1, 6],
        teacher: '赵宗渠',
        color: 2
      },
      {
        name: '矿山信息化',
        place: '计算机110',
        time: '5-6',
        weekly: [11, 12],
        teacher: '赵文涛',
        color: 3
      },
      {
        name: '矿山信息化',
        place: '计算机110',
        time: '5-6',
        weekly: [14, 15],
        teacher: '赵文涛',
        color: 3
      }
    ],
    thu: [],
    fri: [],
    sat: [],
    sun: []
  },
  onLoad: function() {
    this.setDate();
    this.checkCourse();
  },
  // 设置日期
  setDate: function() {
    var date = new Date();
    // 周几
    var today = date.getDay();
    var today = today === 0 ? 6 : today - 1;
    // 当前第几周
    var currentWeekly =
      Math.ceil((Date.now() - Date.parse(app.schoolYear)) / 604800000) - 1;

    this.setData({
      today: today,
      currentWeekly: currentWeekly
    });
  },
  // 判断是否为当前周次课程
  checkCourse: function() {
    this.data.mon.forEach((element, index) => {
      var _currentWeekly = this.data.currentWeekly;
      var _weekly = element.weekly;

      var current =
        (_currentWeekly > _weekly[0] || _currentWeekly === _weekly[0]) &&
        (_currentWeekly < _weekly[1] || _currentWeekly === _weekly[1]);

      var param = {};
      param['mon[' + index + '].current'] = current;
      this.setData(param);
    });

    console.log(this.data.mon);
  },

  bindPickerChange: function(e) {
    this.setData({
      currentWeekly: e.detail.value
    });
    this.checkCourse();
  },
  // 帮助
  showDetail: function() {
    this.setData({
      detailStatus: true
    });
  },
  hideDetail: function(e) {
    if (e.target.id === 'course-detail' || e.target.id === 'close-detail') {
      this.setData({
        detailStatus: false
      });
    }
  }
});
