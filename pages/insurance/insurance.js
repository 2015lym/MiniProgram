// pages/insurance/insurance.js

const {
  $Toast
} = require('../../dist/base/index');


Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  // 购买保险
  buyInsurance: function () {
    wx.navigateTo({
      url: './buy-insurance/buy-insurance',
    })
  },
  // 批量购买保险
  bulkBuyInsurance: function () {

  }
})