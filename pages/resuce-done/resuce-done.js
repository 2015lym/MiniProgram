// pages/resuce-done/resuce-done.js

const Request = require('../../utils/request.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    reasonArr: [{ "tagId": "47", "tagName": "故障原因-安全保护装置原因" }, { "tagId": "48", "tagName": "故障原因-安装调试" }, { "tagId": "49", "tagName": "故障原因-导向系统原因" }, { "tagId": "50", "tagName": "故障原因-电气系统原因" }, { "tagId": "53", "tagName": "故障原因-轿厢原因" }, { "tagId": "54", "tagName": "故障原因-控制系统原因" }, { "tagId": "55", "tagName": "故障原因-门系统原因" }, { "tagId": "56", "tagName": "故障原因-其他原因" }, { "tagId": "57", "tagName": "故障原因-人为原因" }, { "tagId": "58", "tagName": "故障原因-外部原因" }, { "tagId": "60", "tagName": "故障原因-曳引系统原因" }, { "tagId": "72", "tagName": "故障原因-因警铃与门开关按键邻近，乘客误操作" }, { "tagId": "196", "tagName": "人为原因-生活垃圾导致开关门受阻，电梯停止运行" }, { "tagId": "197", "tagName": "人为原因-野蛮搬运导致门变形，电梯无法运行" }, { "tagId": "198", "tagName": "人为原因-装修垃圾导致开关门受阻，电梯停止运行" }, { "tagId": "199", "tagName": "人为原因-超载" }, { "tagId": "200", "tagName": "人为原因-阻挡关门时间过长，电梯无法运行" }, { "tagId": "201", "tagName": "人为原因-其他" }, { "tagId": "202", "tagName": "外部原因-电梯在运行过程中出现的停电" }, { "tagId": "203", "tagName": "外部原因-电气部件进水导致的短路故障" }, { "tagId": "204", "tagName": "外部原因-机房温度过高，电气控制系统自动保护" }, { "tagId": "205", "tagName": "外部原因-故障后自动恢复运行" }, { "tagId": "206", "tagName": "外部原因-其他" }, { "tagId": "207", "tagName": "门系统-轿门锁失效" }, { "tagId": "208", "tagName": "门系统-厅门锁失效" }, { "tagId": "209", "tagName": "门系统-门机故障" }, { "tagId": "210", "tagName": "门系统-门刀与滚轮（球）间距调整不良" }, { "tagId": "211", "tagName": "门系统-安全触板、光幕等防夹人保护装置无效" }, { "tagId": "212", "tagName": "门系统-主动门与从动门之间的联动失效" }, { "tagId": "213", "tagName": "门系统-门触点失效" }, { "tagId": "214", "tagName": "门系统-门挂轮破损" }, { "tagId": "215", "tagName": "门系统-门导向系统失效" }, { "tagId": "216", "tagName": "门系统-其他" }],
    
    wayArr: [{ "tagId": "66", "tagName": "解救方法-安装调试" }, { "tagId": "67", "tagName": "解救方法-加平衡重物.找平层" }, { "tagId": "68", "tagName": "解救方法-平层开门放人" }, { "tagId": "69", "tagName": "解救方法-其他方法" }, { "tagId": "70", "tagName": "解救方法-强行开门放人" }, { "tagId": "71", "tagName": "解救方法-手动盘车放人" }],

    dic: {},
    reason: '',
    way: '',
    rescueNumber: '',
    rescuePhone: '',
    content: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      dic: JSON.parse(options.dic)
    })
    
  },

  changePeopleNum(e) {
    this.setData({
      'rescueNumber': e.detail.detail.value
    })
  },
  changePhone(e) {
    this.setData({
      'rescuePhone': e.detail.detail.value
    })
  },
  changeRemark(e) {
    this.setData({
      'content': e.detail.detail.value
    })
  },

  handleReasonChange({ detail = {} }) {
    this.setData({
      reason: detail.value
    });
  },
  handleWayChange({ detail = {} }) {
    this.setData({
      way: detail.value
    });
  },

  submitOrder() {
    if (this.data.reason == '') {
      wx.showToast({
        title: '请选择故障原因',
        icon: 'none'
      })
      return;
    } else if (this.data.way == '') {
      wx.showToast({
        title: '请选择解救方法',
        icon: 'none'
      })
      return;
    }
    var dic = this.data.dic;
    dic.RescueNumber = this.data.rescueNumber;
    dic.RescuePhone = this.data.rescuePhone;
    dic.Content = this.data.content;
    dic.ReasonId = this.data.reason;
    dic.RemedyId = this.data.way;

    Request.post('Task/SaveTaskStatus', dic).then(res => {
      if (res.data.Success == true) {
        wx.setStorageSync('refresh-mark', true);
        wx.navigateBack({
          
        });
      } else {
        wx.showToast({
          title: res.data.Message,
          icon: 'none'
        })
      }
    }).catch(err => { });
  }
})