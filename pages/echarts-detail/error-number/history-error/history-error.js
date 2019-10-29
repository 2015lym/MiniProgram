// pages/echarts-detail/error-number/history-error/history-error.js

const Request = require("../../../../utils/request.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    elevatorData: {},
    listData: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    Request.get('WeChatMiniApps/GetFaultInfoByLiftId', {
      liftId: options.liftId
    }).then(res => {
      if (res.data.Success == true) {
        this.setData({
          listData: JSON.parse(res.data.Data)
        });
      } else {

      }
    }).catch(err => { });

    Request.get('WeChatMiniApps/GetLiftById', {
      liftId: options.liftId
    }).then(res => {
      if (res.data.Success == true) {
        this.setData({
          elevatorData: JSON.parse(res.data.Data)
        });
      } else {

      }
    }).catch(err => { });
  }
})