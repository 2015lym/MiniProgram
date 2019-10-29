// pages/elevator-maintain/elevator-maintain.js

const Request = require("../../utils/request.js");

const {
  $Toast
} = require('../../dist/base/index');


Page({

  /**
   * 页面的初始数据
   */
  data: {
    elevatorData: {},
    listData: {},
    historyData: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      elevatorData: JSON.parse(options.data)
    })
    Request.get('WeChatMiniApps/GetMaintenanceInfo', {
      liftId: this.data.elevatorData.Id
    }).then(res => {
      if (res.data.Success == true) {
        this.setData({
          listData: JSON.parse(res.data.Data)
        });
      } else {
        $Toast({
          content: '暂无维保数据',
          type: 'error'
        });
        setTimeout(function () {
          wx.navigateBack({

          });
        }, 1500)
      }
    }).catch(err => {});

    Request.post('WeChatMiniApps/GetMaintenanceHistoryInfoList', {
      liftId: this.data.elevatorData.Id,
      // liftId: '117640',
      pageIndex: '1',
      pageSize: '5'
    }).then(res => {
      if (res.data.Success == true) {
        this.setData({
          historyData: JSON.parse(res.data.Data)
        });
      } else {

      }
    }).catch(err => {});
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  callPhone: function(event) {
    wx.makePhoneCall({
      phoneNumber: event.currentTarget.dataset.item.Mobile
    })
  }
})