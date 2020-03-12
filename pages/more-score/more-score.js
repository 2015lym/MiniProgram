// pages/more-score/more-score.js

const Request = require("../../utils/request.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    liftId: '',
    scoreList: [],
    pageIndex: 1
  },
// "enablePullDownRefresh": true,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      scoreList: JSON.parse(options.data)
    })
    this.setData({
      liftId: JSON.parse(options.liftId)
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },
  onPullDownRefresh() {
    Request.post('WeChatMiniApps/GetLiftScoreList', {
      liftId: this.data.liftId,
      PageIndex: this.data.pageIndex,
      PageSize: 10
    }).then(res => {
      if (res.data.Success == true) {
        this.setData({
          scoreList: JSON.parse(res.data.Data)
        });
      } else {

      }
      wx.stopPullDownRefresh() 
    }).catch(err => { });
  },
  onReachBottom() {
    // this.setData({
    //   pageIndex: this.data.pageIndex + 1
    // })
    // Request.post('WeChatMiniApps/GetLiftScoreList', {
    //   liftId: this.data.liftId,
    //   PageIndex: this.data.pageIndex,
    //   PageSize: 10
    // }).then(res => {
    //   if (res.data.Success) {
    //     if (JSON.parse(res.data.Data).length == 0) {
    //       wx.showToast({
    //         title: '没有更多了',
    //         icon: 'none'
    //       })
    //       this.setData({
    //         pageIndex: this.data.pageIndex - 1
    //       })
    //     }
    //   }
    // }).catch(err => { });
  }
})