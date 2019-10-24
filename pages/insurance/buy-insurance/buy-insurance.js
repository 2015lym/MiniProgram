// pages/insurance/buy-insurance/buy-insurance.js

const Request = require('../../../utils/request.js');

const {
  $Toast
} = require('../../../dist/base/index');

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
      },
      {
        id: 'P110749001900000015',
        name: '测试用0.01元电梯'
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
    // 发票类型
    invoiceArray: [
      {
        id: '0',
        name: '普票'
      },
      {
        id: '1',
        name: '专票'
      }
    ],
    recognizeeInfo: [

    ],
    
    submitData: {
      liftIds: [],
      userId: '',
      insuranceCarriers: '太平洋保险', // 承保公司
      elevatorType: '', // 电梯类型
      invoiceType: '0', // 发票类型
      electronicInvoiceReceivingMailbox: '', // 电子发票接收邮箱(普票填写)
      bankName: '',  //开户银行(专票填写)
      bankAccount: '',  //银行账户(专票填写)
      telephoneNumber: '',  //电话号码(专票填写)
      unitAddress: '',  //单位地址(专票填写)
      entity: {
        plcBase: {
          plcPlanCode: 'P110749001900000004',  // 保险方案代码(必须输入)
          plcStartDate: '',  // 保险起期(必须输入)
          plcEndDate: '',  // 保险止期(必须输入)
          plcPremium: '85',  // 保费(必须输入)
          paymentWay: '5'  // 支付方式(必须输入)
        },
        applicant: {
          apltName: '',  //投保人名称(必须输入)
          apltCretType: '5',  //投保人证件类型(必须输入)
          apltCretCode: '',  // 投保人证件号码(必须输入)
          apltTelephone: '',  //投保人固定电话(可选输入)
          apltEmail: '',  //投保人email(可选输入)
          apltMobile: '',  //投保人移动电话(可选输入)
          isrdAddress: ''  //投保人地址信息(可选输入)
        },
        insuredList: [
          {
            isrdName: '',  //被保人名称(必须输入)
            isrdCretType: '5',  //被保人证件类型(必须输入)
            isrdCretCode: '',  //被保人证件号码(必须输入)
            isrdTelephone: '',  //被保人固定电话(可选输入)
            isrdEmail: '',  //被保人email(可选输入)
            isrdMobile: '',  //被保人移动电话(可选输入)
            isrdAddress: ''  //被保人地址信息(可选输入)
          }
        ],
        elcPolicy: {
          elcMsgFlag: '0',  //短信发送标志(必须输入)
          elcMobile: '',  //短信接收手机号(可选输入)
          elcEmlFlag: '0',  //邮件发送标志(必须输入)
          elcEmail: ''  //电子保单接收邮箱(可选输入)
        }
      }
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      'submitData.entity.applicant.apltName': options.apltName
    })
    this.setData({
      'submitData.liftIds': JSON.parse(options.liftIds)
    })

    var userInfo = wx.getStorageSync('userInfo');
    this.setData({
      'submitData.entity.applicant.apltMobile': userInfo.Phone
    })
    this.setData({
      'submitData.userId': userInfo.UserId
    })
    console.log(this.data.submitData)
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
    this.setData({
      'submitData.entity.plcBase.plcStartDate': oldDate.replace(/-/g, '') + '0000'
    });
    this.setData({
      'submitData.entity.plcBase.plcEndDate': newDate.replace(/-/g, '') + '0000'
    })
  },
  // 选择保险方案
  selectBxfa: function(e) {
    if (e.detail.data == 0) {
      this.setData({
        price: '85元/电梯'
      });
      this.setData({
        'submitData.entity.plcBase.plcPlanCode': 'P110749001900000004'
      })
      this.setData({
        'submitData.entity.plcBase.plcPremium': '85'
      })
    } else if (e.detail.data == 1) {
      this.setData({
        price: '105元/电梯'
      });
      this.setData({
        'submitData.entity.plcBase.plcPlanCode': 'P110749001900000005'
      })
      this.setData({
        'submitData.entity.plcBase.plcPremium': '105'
      })
    } else if (e.detail.data == 2) {
      this.setData({
        price: '135元/电梯'
      });
      this.setData({
        'submitData.entity.plcBase.plcPlanCode': 'P110749001900000006'
      })
      this.setData({
        'submitData.entity.plcBase.plcPremium': '135'
      })
    } else {
      this.setData({
        price: '0.1元/电梯'
      });
      this.setData({
        'submitData.entity.plcBase.plcPlanCode': 'P110749001900000015'
      })
      this.setData({
        'submitData.entity.plcBase.plcPremium': '0.01'
      })
    }
  },
  // 选择电梯类型
  selectDtlx: function (e) {
    if (e.detail.data == 0) {
      this.setData({
        'submitData.elevatorType': '1'
      })
    } else if (e.detail.data == 0) {
      this.setData({
        'submitData.elevatorType': '2'
      })
    } else if (e.detail.data == 0) {
      this.setData({
        'submitData.elevatorType': '3'
      })
    } else if (e.detail.data == 0) {
      this.setData({
        'submitData.elevatorType': '4'
      })
    } else {
      this.setData({
        'submitData.elevatorType': '5'
      })
    }
  },
  // 选择发票类型
  selectInvoice: function (e) {
    if (e.detail.data == 0) {
      this.setData({
        'submitData.invoiceType.': '0'
      })
    } else {
      this.setData({
        'submitData.invoiceType': '1'
      })
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

  // 投保人input
  changeApltName(e) {
    this.setData({
      'submitData.entity.applicant.apltName': e.detail.detail.value
    })
  },
  changeApltCretCode(e) {
    this.setData({
      'submitData.entity.applicant.apltCretCode': e.detail.detail.value
    })
  },
  changeApltMobile(e) {
    this.setData({
      'submitData.entity.applicant.apltMobile': e.detail.detail.value
    })
  },
  changeApltTelephone(e) {
    this.setData({
      'submitData.entity.applicant.apltTelephone': e.detail.detail.value
    })
  },
  changeApltEmail(e) {
    this.setData({
      'submitData.entity.applicant.apltEmail': e.detail.detail.value
    })
  },
  changeApltAddress(e) {
    this.setData({
      'submitData.entity.applicant.isrdAddress': e.detail.detail.value
    })
  },

  // 发票input
  changeInvoiceReceivMail(e) {
    this.setData({
      'submitData.electronicInvoiceReceivingMailbox': e.detail.detail.value
    })
  },
  changeInvoiceBank(e) {
    this.setData({
      'submitData.bankName': e.detail.detail.value
    })
  },
  changeInvoiceBankNum(e) {
    this.setData({
      'submitData.bankAccount': e.detail.detail.value
    })
  },
  changeInvoicePhone(e) {
    this.setData({
      'submitData.telephoneNumber': e.detail.detail.value
    })
  },
  changeInvoiceAddress(e) {
    this.setData({
      'submitData.unitAddress': e.detail.detail.value
    })
  },


  submit() {
    if (this.data.isEqualPeople == true) {
      var applicant = this.data.submitData.entity.applicant;
      this.setData({
        'submitData.entity.insuredList': [
          {
            isrdName: applicant.apltName,
            isrdCretType: '5',
            isrdCretCode: applicant.apltCretCode,
            isrdTelephone: applicant.apltTelephone,
            isrdEmail: applicant.apltEmail,
            isrdMobile: applicant.apltMobile,
            isrdAddress: applicant.isrdAddress
          }
        ]
      });
    }

    if (this.checkData()) {
      console.log(this.data.submitData)
      Request.post('WeChatMiniApps/SaveInsuranceOrders', this.data.submitData).then(res => {
        if (res.data.Success == true) {
          wx.navigateTo({
            url: '../pay-insurance-order/pay-insurance-order?data=' + res.data.Data
          })
        } else {
          $Toast({
            content: res.data.Message,
            type: 'error'
          });
        }
      }).catch(err => { });
    }
  },
  back() {
    wx.navigateBack({
      
    });
  },
  checkData() {
    if (
      this.data.endTime == '' ||
      this.data.submitData.elevatorType == '' ||
      this.data.submitData.entity.applicant.apltName == '' ||
      this.data.submitData.entity.applicant.apltCretCode == '' ||
      this.data.submitData.entity.applicant.apltMobile == ''
    ) {
      $Toast({
        content: '请填写完整',
        type: 'error'
      });
      return false;
    } else {
      if (this.data.isSendNote) {
        this.setData({
          'submitData.entity.elcPolicy.elcMsgFlag': '1'
        });
        if (!this.data.submitData.entity.elcPolicy.elcMobile) {
          $Toast({
            content: '请输入接收短信手机号码',
            type: 'error'
          });
          return false;
        }
      } else {
        this.setData({
          'submitData.entity.elcPolicy.elcEmlFlag': '0'
        });
      }
      if (this.data.isSendEmail) {
        this.setData({
          'submitData.entity.elcPolicy.elcEmlFlag': '1'
        });
        if (!this.data.submitData.entity.elcPolicy.elcEmail) {
          $Toast({
            content: '请输入接收邮箱',
            type: 'error'
          });
          return false;
        }
      } else {
        this.setData({
          'submitData.entity.elcPolicy.elcEmlFlag': '0'
        });
      }
      return false;
    }
  }
})