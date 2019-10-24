// pages/insurance/insurance-pay/insurance-pay.js

import drawQrcode from '../../../utils/weapp.qrcode.min.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    payUrl: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var data = JSON.parse(decodeURIComponent(options.data))
    console.log(data)
    this.setData({
      payUrl: data.PayUrl
    })

    drawQrcode({
      width: 200,
      height: 200,
      canvasId: 'myQrcode',
      text: data.PayUrl
    })
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

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },
  copyUrl: function() {
    wx.setClipboardData({
      data: this.data.payUrl,
      success: function (res) {
        wx.getClipboardData({
          success: function (res) {
            wx.showToast({
              title: '复制成功'
            })
          }
        })
      }
    })
  }
})