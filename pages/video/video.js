// pages/video/video.js

const Request = require('../../utils/request.js');
let app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    role: 0, // 加入时角色
    account: '',
    channelName: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      account: options.wyAccount,
      channelName: options.roomId
    })

    this._generateJoinChannelParameter()
    setTimeout(() => {
      wx.redirectTo({
        url: `/pages/room/room?rome=${this.data.channelName}`
      })
    }, 1000)
  },
  _generateJoinChannelParameter(channelInfo) {
    // 存储到全局，方便下一页面调用
    app.globalData.imInfo.channelName = this.data.channelName
    app.globalData.imInfo.accid = this.data.account || 'unknow'
    app.globalData.imInfo.role = this.data.role
  }
})