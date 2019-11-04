// pages/add-score/add-score.js

const Request = require("../../utils/request.js");
const { $Toast } = require('../../dist/base/index');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    liftId: '',
    starIndex: 5,
    feedbackText: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      liftId: options.liftId
    });
  },
  onChange(e) {
    const index = e.detail.index;
    this.setData({
      starIndex: index
    })
  },
  bindinput: function (e) {
    this.setData({
      feedbackText: e.detail.value
    });
  },
  submit: function () {
    if (this.data.feedbackText.length == 0) {
      $Toast({
        content: '请填写评价',
        type: 'error'
      });
      return;
    }

    Request.post('WeChatMiniApps/SaveLiftScore', {
      liftId: this.data.liftId,
      fraction: this.data.starIndex,
      commentContent: this.data.feedbackText
    }).then(res => {
      if (res.data.Success == true) {
        $Toast({
          content: '提交成功',
          type: 'success'
        });
        setTimeout(function () {
          wx.navigateBack({

          });
        }, 1500)
      }
    }).catch(err => { });
  }
})