// pages/insurance/pay-insurance-order/cancel-insurance-list/cancel-insurance-list.js

const Request = require('../../../../utils/request.js');

const {
  $Toast
} = require('../../../../dist/base/index');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    elevatorData: {},
    liftId: '',
    listData: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      elevatorData: JSON.parse(options.data),
      liftId: JSON.parse(options.data).LiftId
    })
  },
  onShow: function () {
    Request.get('WeChatMiniApps/GetLiftInsuranceInfo', {
      liftId: this.data.liftId
    }).then(res => {
      if (res.data.Success == true) {
        this.setData({
          listData: JSON.parse(res.data.Data)
        });
      } else {

      }
    }).catch(err => { });
  },

  cancelInsurance() {
    wx.navigateTo({
      url: '../cancel-insurance/cancel-insurance?policyNumber=' + this.data.elevatorData.PolicyNumber
    })
  }
})