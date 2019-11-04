// pages/elevator-detail/elevator-detail.js

const Request = require("../../utils/request.js");

const {
  $Toast
} = require('../../dist/base/index');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isSweepCode: false,
    liftNum: '',
    feedbackText: '',
    numberText: '0/100',
    elevatorData: {},
    scoreList: []
  },

  onLoad: function(options) {
    if (options.q) {
      var url = decodeURIComponent(options.q);
      var index = url.indexOf("=") + 1;
      var num = decodeURI(url.slice(index))
      this.setData({
        liftNum: num,
        isSweepCode: true
      })
    } else {
      this.setData({
        liftNum: options.liftNum,
        isSweepCode: false
      })
    }

    if (!this.data.liftNum) {
      $Toast({
        content: '缺少电梯id',
        type: 'error'
      });
      return;
    }
  },

  onShow: function() {
    Request.post('WeChatMiniApps/GetNearlyDays', {
      liftNum: this.data.liftNum,
      isSweepCode: this.data.isSweepCode
    }).then(res => {
      if (res.data.Success == true) {
        this.setData({
          elevatorData: JSON.parse(res.data.Data)
        });
        if (this.data.elevatorData.MaintenanceDays == null) {
          this.setData({
            'elevatorData.MaintenanceDays': 0
          });
        }
        this.getScoreList(this.data.elevatorData.Id);
        this.createCavans();
      } else {

      }
    }).catch(err => {});
  },

  getScoreList(liftId) {
    Request.post('WeChatMiniApps/GetLiftScoreList', {
      liftId: liftId
    }).then(res => {
      if (res.data.Success == true) {
        this.setData({
          scoreList: JSON.parse(res.data.Data)
        });
      } else {

      }
    }).catch(err => { });
  },

  // 创建cavans
  createCavans: function() {
    var cxt_arc = wx.createCanvasContext('firstCanvas'); //创建并返回绘图上下文context对象。
    cxt_arc.setLineWidth(6);
    cxt_arc.setStrokeStyle('#d2d2d2');
    cxt_arc.setLineCap('round')
    cxt_arc.beginPath(); //开始一个新的路径
    cxt_arc.arc(75, 115, 69, 0, 2 * Math.PI, false); //设置一个原点(106,106)，半径为100的圆的路径到当前路径
    cxt_arc.stroke();
    cxt_arc.setLineWidth(6);
    var score = this.data.elevatorData.ComprehensiveScore;
    if (score >= 85) {
      cxt_arc.setStrokeStyle('#19be6b');
    } else if (score >= 70) {
      cxt_arc.setStrokeStyle('#2c8bef');
    } else if (score >= 60) {
      cxt_arc.setStrokeStyle('#f90');
    } else {
      cxt_arc.setStrokeStyle('#EC3F14');
    }
    cxt_arc.setLineCap('round')
    cxt_arc.beginPath(); //开始一个新的路径
    cxt_arc.arc(75, 115, 69, -Math.PI / 2, score / 50 * Math.PI - Math.PI / 2, false);
    cxt_arc.stroke(); //对当前路径进行描边
    cxt_arc.draw();
  },
  canvasIdErrorCallback: function(e) {
    console.error(e.detail.errMsg)
  },

  // 关注电梯
  careElevator: function() {
    if (this.data.elevatorData.IsFollow) {
      Request.post('WeChatMiniApps/UnsubscribeLift', {
        LiftId: this.data.elevatorData.Id,
        SaveMiniAppsUser: wx.getStorageSync('userInfo')
      }).then(res => {
        if (res.data.Success == true) {
          this.setData({
            'elevatorData.IsFollow': false
          });
        }
      }).catch(err => {});
    } else {
      if (!wx.getStorageSync('userInfo').Phone) {
        $Toast({
          content: '请先到个人中心绑定手机号',
          type: 'error'
        });
        return;
      }
      Request.post('WeChatMiniApps/FollowLift', {
        LiftId: this.data.elevatorData.Id
      }).then(res => {
        if (res.data.Success == true) {
          this.setData({
            'elevatorData.IsFollow': true
          });
        }
      }).catch(err => {});
    }
  },
  // 新增评分
  addScore: function() {
    wx.navigateTo({
      url: '../add-score/add-score?liftId=' + this.data.elevatorData.Id
    })
  },
  // 电梯信息
  elevatorInfo: function() {
    wx.navigateTo({
      url: '../elevator-info/elevator-info?liftId=' + this.data.elevatorData.Id
    })
  },

  // 运行里程
  runMileage: function() {
    wx.navigateTo({
      url: '../echarts-detail/run-mileage/run-mileage?data=' + JSON.stringify(this.data.elevatorData)
    })
  },
  // 运行次数
  runNumber: function() {
    wx.navigateTo({
      url: '../echarts-detail/run-number/run-number?data=' + JSON.stringify(this.data.elevatorData)
    })
  },
  // 开关门次数
  openCloseNumber: function() {
    wx.navigateTo({
      url: '../echarts-detail/run-close-number/run-close-number?data=' + JSON.stringify(this.data.elevatorData)
    })
  },
  // 故障次数
  errorNumber: function() {
    wx.navigateTo({
      url: '../echarts-detail/error-number/error-number?data=' + JSON.stringify(this.data.elevatorData)
    })
  },
  // 更多评分
  moreScore: function() {
    wx.navigateTo({
      url: '../more-score/more-score?data=' + JSON.stringify(this.data.scoreList)
    })
  },
  // 查看保险
  checkInsurance: function() {
    wx.navigateTo({
      url: '../insurance/insurance?data=' + JSON.stringify(this.data.elevatorData)
    })
  },
  // 查看维保
  checkMaintain: function() {
    wx.navigateTo({
      url: '../elevator-maintain/elevator-maintain?data=' + JSON.stringify(this.data.elevatorData)
    })
  }

})