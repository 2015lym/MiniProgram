Component({
  behaviors: ['wx://form-field'],

  externalClasses: ['i-class'],

  properties: {
    mode: {
      type: String
    },
    title: {
      type: String
    },
    value: {
      type: String
    },
    range: {
      type: Array
    },
    displayValue: {
      type: String,
      value: '请选择'
    },
    startTime: {
      type: String,
      value: ''
    }
  },
  pageLifetimes: {
    show: function () {
      var timestamp = Date.parse(new Date()) + 24 * 60 * 60 * 1000;
      var date = new Date(timestamp);
      //获取年份  
      var Y = date.getFullYear();
      //获取月份  
      var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
      //获取当日日期 
      var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
      this.setData({
        startTime: Y+'-'+M+'-'+D
      })
      console.log("当前时间：" + this.data.startTime);
    }
  },
  methods: {
    bindDataChange: function (e) {
      console.log('picker发送选择改变，携带值为', e.detail.value)
      if (this.data.mode == 'date') {
        this.setData({
          value: e.detail.value,
          displayValue: e.detail.value
        });
        this.triggerEvent('selectEvent', { data: e.detail.value });
      } else {
        this.setData({
          value: e.detail.value,
          displayValue: this.data.range[e.detail.value].name
        });
        this.triggerEvent('selectEvent', { data: e.detail.value });
      }
    }
  }
});
