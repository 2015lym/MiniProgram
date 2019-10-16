// pages/elevator-detail/elevator-detail.js


Page({

  /**
   * 页面的初始数据
   */
  data: {
    feedbackText: '',
    numberText: '0/100',
    careElevatorText: '关注电梯'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options.isCare);
    if (options.isCare == 1) {
      this.setData({
        careElevatorText: '已关注'
      });
    } else {
      this.setData({
        careElevatorText: '关注电梯'
      });
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function(e) {
    var cxt_arc = wx.createCanvasContext('firstCanvas'); //创建并返回绘图上下文context对象。
    cxt_arc.setLineWidth(6);
    cxt_arc.setStrokeStyle('#d2d2d2');
    cxt_arc.setLineCap('round')
    cxt_arc.beginPath(); //开始一个新的路径
    cxt_arc.arc(75, 115, 69, 0, 2 * Math.PI, false); //设置一个原点(106,106)，半径为100的圆的路径到当前路径
    cxt_arc.stroke();
    cxt_arc.setLineWidth(6);
    cxt_arc.setStrokeStyle('#3ea6ff');
    cxt_arc.setLineCap('round')
    cxt_arc.beginPath(); //开始一个新的路径
    cxt_arc.arc(75, 115, 69, -Math.PI * 1 / 2, Math.PI, false);
    cxt_arc.stroke(); //对当前路径进行描边

    cxt_arc.draw();
  },

  canvasIdErrorCallback: function(e) {
    console.error(e.detail.errMsg)
  },

  // 关注电梯
  careElevator: function() {
    if (this.data.careElevatorText == '关注电梯') {
      this.setData({
        careElevatorText: '已关注'
      });
    } else {
      this.setData({
        careElevatorText: '关注电梯'
      });
    }
  },
  // 新增评分
  addScore: function () {
    wx.navigateTo({
      url: '../add-score/add-score'
    })
  },
  // 电梯信息
  elevatorInfo: function() {
    wx.navigateTo({
      url: '../elevator-info/elevator-info'
    })
  },

  // 运行里程
  runMileage: function () {
    wx.navigateTo({
      url: '../echarts-detail/run-mileage/run-mileage'
    })
  },
  // 运行次数
  runNumber: function () {
    wx.navigateTo({
      url: '../echarts-detail/run-number/run-number'
    })
  },
  // 开关门次数
  openCloseNumber: function () {
    wx.navigateTo({
      url: '../echarts-detail/run-close-number/run-close-number'
    })
  },
  // 故障次数
  errorNumber: function () {
    wx.navigateTo({
      url: '../echarts-detail/error-number/error-number'
    })
  },
  // 更多评分
  moreScore: function () {
    wx.navigateTo({
      url: '../more-score/more-score'
    })
  },
  // 查看保险
  checkInsurance: function() {
    wx.navigateTo({
      url: '../insurance/insurance'
    })
  },
  // 查看维保
  checkMaintain: function () {
    wx.navigateTo({
      url: '../elevator-maintain/elevator-maintain'
    })
  }
  
})