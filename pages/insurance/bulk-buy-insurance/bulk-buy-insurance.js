// pages/insurance/bulk-buy-insurance/bulk-buy-insurance.js

const Request = require('../../../utils/request.js');

const {
  $Toast
} = require('../../../dist/base/index');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    listData: [],
    current: [],
    allChecked: [],
    useDepartment: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      useDepartment: options.apltName
    })
    Request.get('WeChatMiniApps/GetLiftsByUserId', {
      UserId: wx.getStorageSync('userInfo').UserId
    }).then(res => {
      if (res.data.Success == true) {
        this.setData({
          listData: JSON.parse(res.data.Data)
        });
      } else {

      }
    }).catch(err => {});
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
  handleItemChange({
    detail = {}
  }) {
    const index = this.data.current.indexOf(detail.value);
    index === -1 ? this.data.current.push(detail.value) : this.data.current.splice(index, 1);
    this.setData({
      current: this.data.current
    });
  },

  allCheckedChange({
    detail = {}
  }) {
    const index = this.data.allChecked.indexOf(detail.value);
    index === -1 ? this.data.allChecked.push(detail.value) : this.data.allChecked.splice(index, 1);
    this.setData({
      allChecked: this.data.allChecked
    });
    if (this.data.allChecked.length > 0) {
      var tempArray = [];
      for (var i = 0; i < this.data.listData.length; i++) {
        var item = this.data.listData[i];
        var newString = item.LiftNum + ' - ' + item.CertificateNum;
        tempArray.push(newString);
      }
      this.setData({
        current: tempArray
      });
    } else {
      this.setData({
        current: []
      });
    }
  },
  // 购买保险
  buyInsurance: function() {
    if (this.data.current.length > 0) {
      var liftIds = [];
      for (var i = 0; i < this.data.listData.length; i++) {
        var item = this.data.listData[i];
        var newString = item.LiftNum + ' - ' + item.CertificateNum;
        for (var j = 0; j < this.data.current.length; j++) {
          var subItem = this.data.current[j];
          if (newString == subItem) {
            liftIds.push(item.LiftId)
          }
        }
      }
      wx.navigateTo({
        url: '../buy-insurance/buy-insurance?apltName=' + this.data.useDepartment +
          '&liftIds=' + JSON.stringify(liftIds)
      })
    } else {
      $Toast({
        content: '至少选择一项',
        type: 'error'
      });
    }
  },
  // 返回
  back() {
    wx.navigateBack({

    });
  },

})