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
    selectMark: false,
    currentMarkItem: {},

    actions: [],
    currentAction: {},

    currentElevator: {},
    markers: [],
    scale: 5,
    longitude: 123.405261,
    latitude: 41.745071,
    rescueList: [],
    realRescueList: [],
    recordList: [],
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
    this.getHomeList();
    this.getLastStatus();
  },

  onShow: function() {
    if (wx.getStorageSync('refresh-mark') == true) {
      wx.showToast({
        title: '操作成功！',
        icon: 'success'
      })
      wx.setStorageSync('refresh-mark', false);
      this.getMarkDetail(this.data.currentMarkItem);
    }
  },
  getLastStatus() {
    Request.get('Task/GetLastStatusActionList').then(res => {
      if (res.data.Success == true) {
        this.setData({
          actions: JSON.parse(res.data.Data)
        });
      } else {
        wx.showToast({
          title: res.data.Message,
          icon: 'none'
        })
      }
    }).catch(err => {});
  },
  getHomeList() {
    this.setData({
      scale: 5,
      selectMark: false
    })
    Request.get('Task/GetTaskList').then(res => {
      if (res.data.Success == true) {
        this.setData({
          rescueList: JSON.parse(res.data.Data)
        });
        if (this.data.rescueList.length > 0) {
          this.addMarkers();
          wx.showToast({
            title: '共' + this.data.rescueList.length + '个救援内容！',
            icon: 'none'
          })
        } else {
          this.setData({
            markers: []
          })
        }
      } else {
        wx.showToast({
          title: res.data.Message,
          icon: 'none'
        })
      }
    }).catch(err => {});
  },

  addMarkers() {
    var array = [];
    for (var i = 0; i < this.data.rescueList.length; i++) {
      var item = this.data.rescueList[i];
      var jwArray = item.Lift.BaiduMapXY.split(',');
      var mark = {
        id: i,
        iconPath: "/resource/images/Marker.png",
        title: item.Lift.LiftNum + '\n' + item.Lift.InstallationAddress,
        width: 40,
        height: 40,
        longitude: jwArray[0],
        latitude: jwArray[1],
      }
      array.push(mark);
    }
    this.setData({
      markers: array,
      latitude: array[0].latitude,
      longitude: array[0].longitude
    })
  },

  markertap(e) {
    var item = this.data.rescueList[e.markerId];
    var marker = this.data.markers[e.markerId];
    this.setData({
      scale: 14,
      longitude: marker.longitude,
      latitude: marker.latitude,
      currentMarkItem: item
    })
    this.getMarkDetail(item);
    this.setData({
      selectMark: true
    })
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
      this.getRecordList();
    } else {

    }
  },

  callBack() {
    wx.navigateTo({
      url: '../../video/video?wyAccount=18622797149&roomId=asdfsadf',
    })
  },
  monitoring() {

  },

  /* ---报警电梯--- */
  resuceInfo() {
    wx.navigateTo({
      url: '../../resuce-info/resuce-info?item=' + JSON.stringify(this.data.currentElevator),
    })
  },
  phoneDetail() {
    wx.navigateTo({
      url: '../../phone-detail/phone-detail?item=' + JSON.stringify(this.data.currentElevator),
    })
  },

  getMarkDetail(item) {
    Request.get('Task/GetTask?id=' + item.ID).then(res => {
      if (res.data.Success == true) {
        var dic = JSON.parse(res.data.Data);
        dic.UseConfirmTime = dic.UseConfirmTime.replace('T', ' ');
        if (dic.MaintConfirmTime == null) {
          dic.MaintConfirmTime = '';
        } else {
          dic.MaintConfirmTime = dic.MaintConfirmTime.replace('T', ' ');
        }
        if (dic.RescueCompleteTime == null) {
          dic.RescueCompleteTime = '';
        } else {
          dic.RescueCompleteTime = dic.RescueCompleteTime.replace('T', ' ');
        }
        this.setData({
          currentElevator: dic
        });

        for (var i = 0; i < this.data.actions.length; i++) {
          var item = this.data.actions[i];
          if (dic.StatusId == item.StatusId) {
            this.setData({
              currentAction: item
            });
            break;
          }
        }
      } else {
        wx.showToast({
          title: res.data.Message,
          icon: 'none'
        })
      }
    }).catch(err => {});
  },

  tapImage() {
    var dic = {
      CreateTime: this.data.currentElevator.CreateTime,
      ID: this.data.currentElevator.ID,
      StatusId: this.data.currentAction.Argument,
      StatusName: this.data.currentAction.ActionName,
      RemedyUserId: wx.getStorageSync('userInfo').UserId,
      ConfirmUserId: wx.getStorageSync('userInfo').UserId
    };
    console.log(dic)
    if (this.data.currentAction.ActionName == '完成救援') {
      wx.navigateTo({
        url: '../../resuce-done/resuce-done?dic=' + JSON.stringify(dic),
      })
    } else if (this.data.currentAction.ActionName == '服务评价') {
      wx.navigateTo({
        url: '../../resuce-evaluate/resuce-evaluate?dic=' + JSON.stringify(dic),
      })
    } else if (this.data.currentAction.ActionName == '误报' || this.data.currentAction.ActionName == '安装调试') {
      wx.navigateTo({
        url: '../../resuce-error/resuce-error?dic=' + JSON.stringify(dic),
      })
    } else {
      Request.post('Task/SaveTaskStatus', dic).then(res => {
        if (res.data.Success == true) {
          wx.showToast({
            title: '操作成功！',
            icon: 'success'
          })
          this.getMarkDetail(this.data.currentMarkItem);
        } else {
          wx.showToast({
            title: res.data.Message,
            icon: 'none'
          })
        }
      }).catch(err => {});
    }
  },
  tapImageJd() {
    var dic = {
      CreateTime: this.data.currentElevator.CreateTime,
      ID: this.data.currentElevator.ID,
      StatusId: this.data.currentAction.Argument,
      StatusName: this.data.currentAction.ActionName,
      RemedyUserId: wx.getStorageSync('userInfo').UserId,
      ConfirmUserId: wx.getStorageSync('userInfo').UserId
    };
    Request.post('Task/SaveTaskStatus', dic).then(res => {
      if (res.data.Success == true) {
        wx.showToast({
          title: '操作成功！',
          icon: 'success'
        })
        this.getMarkDetail(this.data.currentMarkItem);
      } else {
        wx.showToast({
          title: res.data.Message,
          icon: 'none'
        })
      }
    }).catch(err => {});
  },

  /* ---救援列表--- */
  handleChangeTab({
    detail
  }) {
    this.setData({
      currentTab: detail.key
    });
    this.getRescueList();
  },

  getRescueList() {
    Request.get('Task/GetTaskList', {

    }).then(res => {
      if (res.data.Success == true) {
        this.setData({
          rescueList: JSON.parse(res.data.Data)
        });
        var array = [];
        for (var i = 0; i < this.data.rescueList.length; i++) {
          var item = this.data.rescueList[i];
          if (this.data.currentTab == 'tab1' && item.RescueType == 0) {
            array.push(item);
          } else if (this.data.currentTab == 'tab2' && item.RescueType == 1) {
            array.push(item);
          }
        }
        this.setData({
          realRescueList: array
        });
      } else {
        wx.showToast({
          title: res.data.Message,
          icon: 'none'
        })
      }
    }).catch(err => {});
  },

  resuceDetail(event) {
    this.setData({
      selectIndex: 0
    });

  },

  /* ---处置记录--- */
  // 处置记录详情
  recordDetail(event) {
    wx.navigateTo({
      url: '../../record-detail/record-detail?item=' + JSON.stringify(event.currentTarget.dataset.item),
    })
  },
  getRecordList() {
    Request.get('Task/GetTaskEndList', {

    }, {
      PageIndex: 1,
      PageSize: 20
    }).then(res => {
      if (res.data.Success == true) {
        this.setData({
          recordList: JSON.parse(res.data.Data)
        });
      } else {
        wx.showToast({
          title: res.data.Message,
          icon: 'none'
        })
      }
    }).catch(err => {});
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

    Request.post('Task/ArtificialOrder', {
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
        this.getHomeList();
      } else {
        wx.showToast({
          title: res.data.Message,
          icon: 'none'
        })
      }
    }).catch(err => {});
  },
  testNumber(value) {
    var regNum = new RegExp(/^[0-9]+$/);
    return regNum.test(value);
  }
})