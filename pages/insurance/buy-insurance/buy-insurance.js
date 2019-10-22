// pages/insurance/buy-insurance/buy-insurance.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    endTime: '',
    price: '85元/电梯',
    isEqualPeople: true,
    isSendNote: true,
    isSendEmail: true,
    // 保险方案
    bxfaArray: [{
        id: 'P110749001900000004',
        name: '辽宁电梯平台 - 住宅'
      },
      {
        id: '住宅、P110749001900000005',
        name: '辽宁电梯 - 非住宅(不含公共场所)'
      },
      {
        id: 'P110749001900000006',
        name: '辽宁电梯 - 非住宅(公共场所)'
      }
    ],
    // 电梯类型
    dtlxArray: [{
        id: '1',
        name: '自动扶梯'
      },
      {
        id: '2',
        name: '自动人行道'
      },
      {
        id: '3',
        name: '升降电梯：30层以内（含）'
      },
      {
        id: '4',
        name: '升降电梯：31-40层（含）'
      },
      {
        id: '5',
        name: '升降电梯：41层以上（含）'
      }
    ],
    recognizeeInfo: [

    ],
    invoiceArray: [
      {
        id: '0',
        name: '普票'
      },
      {
        id: '1',
        name: '专票'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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
  // 选择时间
  selectStartTime: function(e) {
    var oldDate = e.detail.data;
    var newYear = Number(oldDate.split('-')[0]) + 1;
    var newDate = oldDate.replace(oldDate.split('-')[0], newYear);
    this.setData({
      endTime: newDate
    });
  },

  selectBxfa: function(e) {
    if (e.detail.data == 0) {
      this.setData({
        price: '85元/电梯'
      });
    } else if (e.detail.data == 0) {
      this.setData({
        price: '105元/电梯'
      });
    } else {
      this.setData({
        price: '135元/电梯'
      });
    }
  },

  changeRecognizee(event) {
    const detail = event.detail;
    this.setData({
      isEqualPeople: detail.value
    })
    if (this.data.isEqualPeople == false &&
      this.data.recognizeeInfo.length == 0) {
      this.addRecognizee();
    }
  },

  addRecognizee() {
    var that = this;
    var obj = {};
    obj.Id = 1;
    let array = this.data.recognizeeInfo;
    array.push(obj);
    this.setData({
      recognizeeInfo: array
    });
  },

  changeSendNote(event) {
    const detail = event.detail;
    this.setData({
      isSendNote: detail.value
    })
  },
  changeSendEmail(event) {
    const detail = event.detail;
    this.setData({
      isSendEmail: detail.value
    })
  },
})