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

  downloadImage: function ()  {
    $Toast({
      content: '下载图片需要在管理后台更新域名配置',
      type: 'error'
    });
    // var imgSrc = "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=666915515,3161272054&fm=26&gp=0.jpg"
    // wx.downloadFile({
    //   url: imgSrc,
    //   success: function (res) {
    //     console.log(res);
    //     //图片保存到本地
    //     wx.saveImageToPhotosAlbum({
    //       filePath: res.tempFilePath,
    //       success: function (data) {
    //         wx.showToast({
    //           title: '保存成功',
    //           icon: 'success',
    //           duration: 2000
    //         })
    //       },
    //       fail: function (err) {
    //         console.log(err);
    //         if (err.errMsg === "saveImageToPhotosAlbum:fail auth deny") {
    //           console.log("当初用户拒绝，再次发起授权")
    //           wx.openSetting({
    //             success(settingdata) {
    //               console.log(settingdata)
    //               if (settingdata.authSetting['scope.writePhotosAlbum']) {
    //                 console.log('获取权限成功，给出再次点击图片保存到相册的提示。')
    //               } else {
    //                 console.log('获取权限失败，给出不给权限就无法正常使用的提示')
    //               }
    //             }
    //           })
    //         }
    //       },
    //       complete(res) {
    //         console.log(res);
    //       }
    //     })
    //   }
    // })
  }
})