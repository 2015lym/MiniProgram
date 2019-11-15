//app.js
const Request = require("./utils/request.js");

App({
  userInfo: null,
  baseUrl: 'https://www2.dianti119.com/api/',
  globalData: {
    channelInfo: {},
    imInfo: {}, // 会话配置信息
  },

  onLaunch: function() {
    // 登录
    wx.login({
      success: data => {

        Request.get('WeChatMiniApps/GetWeChatMiniAppsOpenId', {
          code: data.code
        }).then(res => {
          if (res.data.Success == true) {
            wx.setStorage({
              key: 'openId',
              data: JSON.parse(res.data.Data).OpenId,
            })
            wx.setStorage({
              key: 'sessionKey',
              data: JSON.parse(res.data.Data).SessionKey,
            })
            this.getLocalUserInfo();
          } else {

          }
        }).catch(err => {});

      }
    })

    let systemInfo = wx.getSystemInfoSync()
    this.globalData.videoContainerSize = {
      width: systemInfo.windowWidth,
      height: systemInfo.windowHeight - 80
    }

  },

  getLocalUserInfo: function() {
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.userInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
              Request.post('WeChatMiniApps/SaveMiniAppsUser', {
                nickname: res.userInfo.nickName,
                sex: res.userInfo.gender,
                province: res.userInfo.province,
                city: res.userInfo.city,
                country: res.userInfo.country,
                headimgurl: res.userInfo.avatarUrl
              }).then(res => {
                if (res.data.Success == true) {
                  wx.setStorage({
                    key: 'userInfo',
                    data: JSON.parse(res.data.Data)
                  })
                }
              }).catch(err => {});

            }
          })
        }
      }
    })
  }
})