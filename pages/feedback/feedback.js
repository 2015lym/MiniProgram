// pages/feedback/feedback.js

const Request = require('../../utils/request.js');

const {
  $Toast
} = require('../../dist/base/index');


Page({

  /**
   * 页面的初始数据
   */
  data: {
    feedbackText: "",
    numberText: "0/100"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  bindinput: function(e) {
    var number = e.detail.value.length;
    this.setData({
      numberText: number + "/100",
      feedbackText: e.detail.value
    });
  },

  submit: function() {
wx.showModal({
  title: 'aaa',
  content: 'bbb',
})
    if (this.data.feedbackText.length == 0) {
      $Toast({
        content: '请填写意见反馈',
        type: 'error'
      });
      return;
    }
    Request.post('WeChatMiniApps/SaveUserFeedback', {
      feedbackContent: this.data.feedbackText
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