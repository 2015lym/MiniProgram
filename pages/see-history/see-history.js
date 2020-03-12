// pages/see-history/see-history.js

const Request = require('../../utils/request.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    listData: [],
    pageIndex: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    Request.post('WeChatMiniApps/GetBrowseLift', {
      PageIndex: this.data.pageIndex,
      PageSize: 10
    }).then(res => {
      this.setData({
        listData: JSON.parse(res.data.Data)
      });
    }).catch(err => {});
  },

  gotoDetail: function(event) {
    wx.navigateTo({
      url: '../elevator-detail/elevator-detail?liftNum=' + event.currentTarget.dataset.item.LiftNum
    })
  },

  onPullDownRefresh() {
    this.setData({
      pageIndex: 1
    })
    Request.post('WeChatMiniApps/GetBrowseLift', {
      PageIndex: this.data.pageIndex,
      PageSize: 10
    }).then(res => {
      this.setData({
        listData: JSON.parse(res.data.Data)
      });
      wx.stopPullDownRefresh()
    }).catch(err => {});
  },
  onReachBottom() {
    wx.showLoading({
      title: '玩命加载中',
    })
    this.setData({
      pageIndex: this.data.pageIndex + 1
    })
    Request.post('WeChatMiniApps/GetBrowseLift', {
      PageIndex: this.data.pageIndex,
      PageSize: 10
    }).then(res => {
      wx.hideLoading()
      if (res.data.Success) {
        if (JSON.parse(res.data.Data).length == 0) {
          wx.showToast({
            title: '没有更多了',
            icon: 'none'
          })
          this.setData({
            pageIndex: this.data.pageIndex - 1
          })
        } else {
          this.setData({
            listData: this.data.listData.concat(JSON.parse(res.data.Data))
          });
        }
      }
    }).catch(err => {
      wx.hideLoading()
    });
  },
})