// pages/insurance/pay-insurance-order/pay-insurance-order.js

const Request = require('../../../utils/request.js');

const {
  $Toast
} = require('../../../dist/base/index');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    listData: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.data) {
      this.listData = JSON.parse(options.data)
    } else {
      Request.post('WeChatMiniApps/GetInsuranceOrderLists', {
        GroupId: options.groupId
      }).then(res => {
        if (res.data.Success == true) {
          var rtnData = JSON.parse(res.data.Data);
          var newArray = [];
          for (var i = 0; i < rtnData.length; i ++) {
            var item = rtnData[i];
            item.index = i;
            newArray.push(item);
          }
          this.setData({
            listData: newArray
          });
        } else {

        }
      }).catch(err => { });
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  // 支付
  payOrder: function (event) {
    console.log(event)
    Request.get('WeChatMiniApps/GetInsuranceOrders', {
      policyNumber: event.currentTarget.dataset.item.PolicyNumber
    }).then(res => {
      if (res.data.Success == true) {
        if (res.data.Code == 2) {
          var data = encodeURIComponent(JSON.stringify(event.currentTarget.dataset.item))
          wx.navigateTo({
            url: '../insurance-pay/insurance-pay?data=' + data
          })
        } else {
          $Toast({
            content: res.data.Message,
            type: 'error'
          });
          var newArray = [];
          for (var i = 0; i < this.data.listData.length; i++) {
            var item = this.data.listData[i];
            if (i == event.currentTarget.dataset.item.index) {
              if (res.data.Code == 1) {
                item.OrderStatus = 1;
              } else if (res.data.Code == 3) {
                item.OrderStatus = 2;
              } else if (res.data.Code == 4) {
                item.OrderStatus = 3;
              }
            }
            newArray.push(item);
          }
          this.setData({
            listData: newArray
          });
        }
      } else {

      }
    }).catch(err => { });


  }
})