// pages/record-detail/record-detail.js

const Request = require('../../utils/request.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    elevatorItem: {},
    detail: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options.item)
    this.setData({
      elevatorItem: JSON.parse(options.item)
    })

    Request.get('Task/GetTask?id=' + this.data.elevatorItem.ID).then(res => {
      if (res.data.Success == true) {
        this.setData({
          detail: JSON.parse(res.data.Data)
        });
        console.log('1');
        console.log(this.data.detail);
      } else {
        wx.showToast({
          title: res.data.Message,
          icon: 'none'
        })
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

  callPhone(e) {0
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.item.Mobile
    })
  }
})