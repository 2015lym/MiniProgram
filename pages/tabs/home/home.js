// pages/home.js

const Request = require('../../../utils/request.js');

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    selectIndex: 0,
    currentTab: 'tab1',
    rescueList: [1, 2, 3, 4, 5, 6, 7],
    recordList: [1, 2, 3, 4, 5, 6, 7],
    order: {
      liftNum: '',
      liftId: '',
      address: '',
      rescueNumber: 1,
      rescuePhone: '',
      content: ''
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (app.userInfo) {
      this.setData({
        userInfo: app.userInfo
      })
    }
    // Request.get('Task/GetTaskList', {
    //   PhoneId: '-1',
    //   PageIndex: 1,
    //   PageSize: 10
    // }).then(res => {
    //   // this.setData({
    //   //   listData: JSON.parse(res.data.Data)
    //   // });
    // }).catch(err => {});
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

  selectBtn: function(event) {
    this.setData({
      selectIndex: event.currentTarget.dataset.value
    })
    wx.pageScrollTo({
      scrollTop: 0
    })
    if (this.data.selectIndex == 0) {

    } else if (this.data.selectIndex == 1) {
      this.getRescueList();
    } else if (this.data.selectIndex == 2) {

    } else {

    }
  },

  /* ---救援列表--- */
  handleChangeTab({ detail }) {
    this.setData({
      currentTab: detail.key
    });
  },

  getRescueList() {
    Request.get('Task/GetTaskList', {

    }).then(res => {
      // this.setData({
      //   listData: JSON.parse(res.data.Data)
      // });
    }).catch(err => { });
  },

  /* ---处置记录--- */
  // 处置记录详情
  recordDetail() {
    wx.navigateTo({
      url: '../../record-detail/record-detail',
    })
  },

  /* ---人工下单--- */
  changeCode(e) {
    this.setData({
      'order.liftNum': e.detail.detail.value
    })
    this.getAddress(e.detail.detail.value);
  },
  getAddress(liftNum) {
    Request.get('Lift/GetLiftByLiftNum?liftNum=' + liftNum).then(res => {
      this.setData({
        'order.address': JSON.parse(res.data.Data).InstallationAddress,
        'order.liftId': JSON.parse(res.data.Data).ID,
      })
    }).catch(err => {});
  },
  changePeopleNum(e) {
    this.setData({
      'order.rescueNumber': e.detail.detail.value
    })
  },
  changePhone(e) {
    this.setData({
      'order.rescuePhone': e.detail.detail.value
    })
  },
  changeRemark(e) {
    this.setData({
      'order.content': e.detail.detail.value
    })
  },
  submitOrder() {
    if (this.data.order.liftId == '') {
      wx.showToast({
        title: '电梯编号录入不完整！',
        icon: 'none'
      })
      return;
    } else if (!this.testNumber(this.data.order.rescueNumber)) {
      wx.showToast({
        title: '被困人数录入错误！',
        icon: 'none'
      })
      return;
    } else if (this.data.order.rescueNumber == '' || this.data.order.rescueNumber <= 0) {
      wx.showToast({
        title: '被困人数录入错误！',
        icon: 'none'
      })
      return;
    }

    Request.post('Task/ArtificialOrder',{
      LiftId: this.data.order.liftId,
      RescueNumber: this.data.order.rescueNumber,
      RescuePhone: this.data.order.rescuePhone,
      Content: this.data.order.content,
      ConfirmUserId: wx.getStorageSync('userInfo').UserId
    }).then(res => {
      if (res.data.Success == true) {
        wx.showToast({
          title: '提交成功'
        })
        this.setData({
          order: {},
          'order.changePeopleNum': 1,
          selectIndex: 0
        })
        wx.pageScrollTo({
          scrollTop: 0
        })
      } else {
        wx.showToast({
          title: res.data.Message,
          icon: 'none'
        })
      }
    }).catch(err => { });
  },
  testNumber(value) {
    var regNum = new RegExp(/^[0-9]+$/);
    return regNum.test(value);
  }
})