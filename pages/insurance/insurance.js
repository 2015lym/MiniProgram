// pages/insurance/insurance.js

const Request = require('../../utils/request.js');

const {
  $Toast
} = require('../../dist/base/index');


Page({

  /**
   * 页面的初始数据
   */
  data: {
    elevatorData: {},
    liftId: '',
    listData: {}
  },
  onLoad: function(options) {
    this.setData({
      elevatorData: JSON.parse(options.data),
      liftId: JSON.parse(options.data).Id
    })
  },
  onShow: function() {
    Request.get('WeChatMiniApps/GetLiftInsuranceInfo', {
      liftId: this.data.liftId
    }).then(res => {
      if (res.data.Success == true) {
        this.setData({
          listData: JSON.parse(res.data.Data)
        });
      } else {

      }
    }).catch(err => {});
  },

  // 购买保险
  buyInsurance: function() {
    wx.navigateTo({
      url: './buy-insurance/buy-insurance?apltName=' + this.data.listData.UseDepartment +
      '&liftIds=[' + this.data.liftId + ']' 
    })
  },
  // 批量购买保险
  bulkBuyInsurance: function() {
    wx.navigateTo({
      url: './bulk-buy-insurance/bulk-buy-insurance?apltName=' + this.data.listData.UseDepartment
    })
  }
})