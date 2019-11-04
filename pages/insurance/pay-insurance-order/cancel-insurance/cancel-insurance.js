// pages/insurance/pay-insurance-order/cancel-insurance/cancel-insurance.js

const Request = require('../../../../utils/request.js');

const {
  $Toast
} = require('../../../../dist/base/index');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    policyNumber: '',
    feedbackText: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      policyNumber: options.policyNumber
    });
  },
  bindinput: function (e) {
    this.setData({
      feedbackText: e.detail.value
    });
  },
  submit: function () {
    if (this.data.feedbackText.length == 0) {
      $Toast({
        content: '请输入退保原因',
        type: 'error'
      });
      return;
    }
    Request.post('WeChatMiniApps/Surrender', {
      policyNumber: this.data.policyNumber,
      insuranceReasons: this.data.feedbackText
    }).then(res => {
      if (res.data.Success == true) {
        wx.showModal({
          title: '退保申请已提交',
          content: '请保持投保人电话畅通，等待工作人员联系您办理退款。',
          showCancel: false,
          success (res) {
            wx.navigateBack({
              delta: 2
            })
          }
        })
      }
    }).catch(err => { });
  }
})