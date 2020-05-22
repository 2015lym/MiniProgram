// pages/video/video.js
import NIM from '../../vendors/NIM_Web_NIM_weixin_v7.5.0.js'

const Request = require('../../utils/request.js');
let app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isConnect: false,
    role: 0, // 加入时角色
    account: '',
    channelName: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options.wyAccount);
    this.setData({
      account: options.wyAccount,
      channelName: options.roomId
    })
    app.nim = NIM.getInstance({
      db: false,
      debug: true,
      appKey: '6f44f64cfd07c9cf71883fe2e923cbdb',
      account: this.data.account,
      token: '123456',
      onconnect: this.onConnect()
    });
  },

  onConnect() {
    console.log('连接成功')
    this._generateJoinChannelParameter()
    setTimeout(() => {
      this.setData({
        isConnect: true
      })
      wx.navigateTo({
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