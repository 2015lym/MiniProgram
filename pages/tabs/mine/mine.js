// pages/mine/mine.js
const Request = require("../../../utils/request.js");
const { $Toast } = require('../../../dist/base/index');


const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (app.userInfo) {
      this.setData({
        userInfo: app.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
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

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  getUserInfo: function(e) {
    console.log(e)
    if (e.detail.userInfo) {
      app.userInfo = e.detail.userInfo
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      });
      Request.post('https://www2.dianti119.com/api/WeChatMiniApps/SaveMiniAppsUser', {
        nickname: this.data.userInfo.nickName,
        sex: this.data.userInfo.gender,
        province: this.data.userInfo.province,
        city: this.data.userInfo.city,
        country: this.data.userInfo.country,
        headimgurl: this.data.userInfo.avatarUrl
      }).then(res => {
        console.log(res)
        if (res.data.Success == true) {
          wx.setStorage({
            key: 'userInfo',
            data: JSON.parse(res.data.Data)
          })
        }
      }).catch(err => {});
    }
  },
  // 绑定手机号
  getPhoneNumber(e) {
    console.log(e.detail)
    if (e.detail.errMsg == 'getPhoneNumber:fail user deny') {
      $Toast({
        content: '未获取到手机号',
        type: 'error'
      });
    } else {
      Request.post('https://www2.dianti119.com/api/WeChatMiniApps/BindUser', {
        encryptedData: e.detail.encryptedData,
        iv: e.detail.iv,
        sessionKey: wx.getStorageSync('sessionKey'),
      }).then(res => {
        console.log(res)
        if (res.data.Success == true) {
          $Toast({
            content: '绑定成功',
            type: 'success'
          });
          wx.setStorage({
            key: 'userInfo',
            data: JSON.parse(res.data.Data)
          });
        } else {
          $Toast({
            content: res.data.Message,
            type: 'success'
          });
        }
      }).catch(err => { });
    }
  }
})