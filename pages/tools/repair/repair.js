var app = getApp();

Page({
  data: {
    // 报修区域
    area: [
      '梅园1#学生公寓楼',
      '梅园2#学生公寓楼',
      '梅园3#学生公寓楼',
      '松园1#学生公寓楼',
      '松园2#学生公寓楼',
      '松园3#学生公寓楼',
      '松园4#学生公寓楼',
      '松园5#学生公寓楼',
      '松园6#学生公寓楼',
      '松园7#学生公寓楼',
      '松园8#学生公寓楼',
      '竹园1#学生公寓楼',
      '竹园2#学生公寓楼',
      '竹园3#学生公寓楼',
      '竹园4#学生公寓楼',
      '竹园5#学生公寓楼',
      '竹园6#学生公寓楼',
      '竹园7#学生公寓楼',
      '竹园8#学生公寓楼',
      '兰园1#学生公寓楼',
      '兰园2#学生公寓楼',
      '兰园3#学生公寓楼',
      '兰园4#学生公寓楼',
      '兰园5#学生公寓楼',
      '兰园6#学生公寓楼',
      '2#研究生楼'
    ],
    areaSerial: [
      '030001',
      '030002',
      '030003',
      '030004',
      '030005',
      '030006',
      '030007',
      '030008',
      '030009',
      '0300010',
      '0300011',
      '0300012',
      '0300013',
      '0300014',
      '0300015',
      '0300016',
      '0300017',
      '0300018',
      '0300019',
      '0300020',
      '0300021',
      '0300022',
      '0300023',
      '0300024',
      '0300025',
      '0300026'
    ],
    areaIndex: 0,

    // 维修项目
    project: [
      ['电气维修', '给排水维修', '管网维修', '木工维修', '土建维修'],
      [
        '电表类',
        '电风扇类',
        '公共照明类',
        '供电线路类',
        '开关插座类',
        '室内照明类',
        '其他类'
      ]
    ],
    projectSerial: [
      ['2101', '2106', '2103', '2105', '2102', '2104', '2107'],
      ['2004', '2005', '2006', '2001', '2003', '2002', '2007'],
      ['1802', '1803', '1804', '1801'],
      [
        '2201',
        '2207',
        '2202',
        '2203',
        '2204',
        '2205',
        '2206',
        '2208',
        '2209',
        '2210',
        '2211',
        '2213',
        '2212'
      ],
      ['1901', '1902', '1903', '1908', '1904', '1906', '1907', '1905', '1909']
    ],
    projectIndex: [0, 0],

    // 手机号
    mobile: '',
    // 寝室
    bAddress: '',
    // 内容
    bContent: '',

    tempImageList: [],
    imageList: [],

    succeed: false
  },

  onLoad: function() {
    this.setUsed();
  },

  // 设置常用地点
  setUsed: function() {
    var _store = app.store;
    if (_store.usedArea) {
      this.setData({
        areaIndex: _store.usedArea
      });
    }
    if (_store.usedBAddress) {
      this.setData({
        bAddress: _store.usedBAddress
      });
    }
    if (_store.usedMobile) {
      this.setData({
        mobile: _store.usedMobile
      });
    }
  },

  // 更改区域
  bindAreaChange: function(e) {
    console.log('bindAreaChange', e.detail.value);
    this.setData({
      areaIndex: e.detail.value
    });
  },

  // 更改维修项目
  bindProjectChange: function(e) {
    this.setData({
      projectIndex: e.detail.value
    });
  },

  // 更改维修项目列
  bindprojectColumnChange: function(e) {
    var data = {
      project: this.data.project,
      projectIndex: this.data.projectIndex
    };

    data.projectIndex[e.detail.column] = e.detail.value;
    if (e.detail.column === 0) {
      switch (e.detail.value) {
        case 0:
          data.project[1] = [
            '电表类',
            '电风扇类',
            '公共照明类',
            '供电线路类',
            '开关插座类',
            '室内照明类',
            '其他类'
          ];
          data.projectIndex[1] = 0;
          break;
        case 1:
          data.project[1] = [
            '厕所洁具类',
            '阀门类',
            '感应器类',
            '室内上下水管类',
            '水龙头类',
            '下水疏通类',
            '其他类'
          ];
          data.projectIndex[1] = 0;
          break;
        case 2:
          data.project[1] = [
            '各类阀门类',
            '暖气（漏水，不热）',
            '中央空调（漏水，不热）',
            '自来水外网管类'
          ];
          data.projectIndex[1] = 0;
          break;
        case 3:
          data.project[1] = [
            '壁柜类',
            '吊顶类',
            '防盗门类',
            '家具类',
            '教室桌椅类',
            '门窗类',
            '纱窗类',
            '上下铺类',
            '卫生间镜子类',
            '卫生间晾衣绳类',
            '五金门锁类',
            '桌椅类',
            '其他类'
          ];
          data.projectIndex[1] = 0;
          break;
        case 4:
          data.project[1] = [
            '道路类',
            '落水管类',
            '墙壁瓷砖类',
            '室内卫生间漏水类',
            '屋面渗水类',
            '窨井盖类',
            '窨井疏通类',
            '雨水篦子类',
            '其他类'
          ];
          data.projectIndex[1] = 0;
          break;
      }
    } else {
      return;
    }

    this.setData(data);
    console.log(this.data.projectIndex);
  },

  // 处理反馈内容
  inputBlur: function(e) {
    switch (e.target.id) {
      case 'bAddress':
        this.setData({
          bAddress: e.detail.value
        });
        break;
      case 'mobile':
        this.setData({
          mobile: e.detail.value
        });
        break;
      case 'bContent':
        this.setData({
          bContent: e.detail.value
        });
        break;
    }
  },

  checkField: function() {
    var _data = this.data;
    return (
      !!_data.mobile &&
      !!_data.bAddress &&
      !!_data.bContent &&
      _data.bContent.length >= 6
    );
  },

  // 提交表单
  formSubmit: function() {
    var _data = this.data;
    var _projectIndex = _data.projectIndex;

    var field = {
      // 维修项目序列号
      projectSerial: _data.projectSerial[_projectIndex[0]][_projectIndex[1]],
      // 项目名
      projectName:
        _data.project[0][_projectIndex[0]] +
        '/' +
        _data.project[1][_projectIndex[1]],
      // 手机号
      mobile: _data.mobile,
      // 姓名
      bUserName: app.store.name || 'wehpu',
      // 报修内容
      bContent: _data.bContent,
      // 地址
      bAddress: _data.bAddress,
      // 区域序列号
      areaSerial: _data.areaSerial[_data.areaIndex],
      // 校区 南校区
      areaName: '南校区学生公寓' + _data.area[_data.areaIndex],
      // 图片列表 ,分割
      imgList: ''
    };

    console.log(field);

    if (!this.checkField()) {
      wx.showToast({
        title: '请正确填写表单',
        image: '/images/common/fail.png',
        duration: 2000
      });
      return;
    }

    // 加载中
    wx.showLoading({
      title: '提交中',
      mask: true
    });

    wx.request({
      url: app.api + '/rsp/repair',
      method: 'POST',
      data: field,
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        Authorization: 'Bearer ' + app.store.token
      },
      success: requestRes => {
        var _requestRes = requestRes.data;
        console.log(requestRes);

        if (_requestRes.statusCode === 201) {
          // console.log(_requestRes);
          this.setData({
            succeed: true
          });

          this.setStore('usedArea', _data.areaIndex);
          this.setStore('usedBAddress', _data.bAddress);
          this.setStore('usedMobile', _data.mobile);
        } else {
          wx.showToast({
            title: '报修失败',
            image: '/images/common/fail.png',
            duration: 2000
          });
        }
      },
      fail: () => {
        wx.showToast({
          title: '未知错误',
          image: '/images/common/fail.png',
          duration: 2000
        });
      },
      complete: () => {
        wx.hideLoading();
      }
    });
  },

  // 图片上传
  chooseImage: function() {
    wx.showModal({
      title: '提示',
      showCancel: false,
      content: '添加图片功能即将到来，请耐心等待',
      success: res => {}
    });
    // wx.chooseImage({
    //   sourceType: ['album', 'camera'],
    //   sizeType: ['original', 'compressed'],
    //   count: 1,
    //   success: res => {
    //     console.log(res);
    //     this.setData({
    //       tempImageList: res.tempFilePaths
    //     });
    //   }
    // });
  },
  // 预览图片
  previewImage: function(e) {
    var current = e.target.dataset.src;

    wx.previewImage({
      current: current,
      urls: this.data.tempImageList
    });
  },

  // 更新store和storage
  setStore: function(key, value) {
    if (!key) {
      return;
    }
    app.store[key] = value;
    wx.setStorage({
      key: key,
      data: value
    });
  }
});
