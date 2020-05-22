// pages/resuce-evaluate/resuce-evaluate.js

const Request = require('../../utils/request.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    dic: {},
    starIndex1: 5,
    starIndex2: 5,
    starIndex3: 5
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      dic: JSON.parse(options.dic)
    })
    console.log(this.data.dic);
  },
  onChange1(e) {
    const index = e.detail.index;
    this.setData({
      'starIndex1': index
    })
  },
  onChange2(e) {
    const index = e.detail.index;
    this.setData({
      'starIndex2': index
    })
  },
  onChange3(e) {
    const index = e.detail.index;
    this.setData({
      'starIndex3': index
    })
  },

  submitOrder() {
    Request.post('Task/SaveTaskStatus', this.data.dic).then(res => {
      if (res.data.Success == true) {
        this.submitScore();
      } else {
        wx.showToast({
          title: res.data.Message,
          icon: 'none'
        })
      }
    }).catch(err => {});
  },

  submitScore() {
    var dic = [{
      TaskId: this.data.dic.ID,
      ItemId: 42,
      Rank: this.data.starIndex1,
      UserId: wx.getStorageSync('userInfo').UserId
    },
    {
      TaskId: this.data.dic.ID,
      ItemId: 43,
      Rank: this.data.starIndex2,
      UserId: wx.getStorageSync('userInfo').UserId
    },
    {
      TaskId: this.data.dic.ID,
      ItemId: 44,
      Rank: this.data.starIndex3,
      UserId: wx.getStorageSync('userInfo').UserId
    },
    ];
    Request.post('Task/SaveEvaluationScore', dic).then(res => {
      if (res.data.Success == true) {
        wx.setStorageSync('refresh-mark', true);
        setTimeout(function () {
          wx.navigateBack({

          });
        }, 1000);
      } else {
        wx.showToast({
          title: res.data.Message,
          icon: 'none'
        })
      }
    }).catch(err => {});

  }

})