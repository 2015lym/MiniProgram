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
    }
  },
  pageLifetimes: {
    show: function () {
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
