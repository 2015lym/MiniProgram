// pages/elevator-info/elevator-info.js
const Request = require("../../utils/request.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    elevatorData: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    Request.get('WeChatMiniApps/GetLiftById', {
      liftId: options.liftId
    }).then(res => {
      if (res.data.Success == true) {
        this.setData({
          elevatorData: JSON.parse(res.data.Data)
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