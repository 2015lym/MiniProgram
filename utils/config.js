// 配置
var envir = 'online',
  CONFIG = {},
  configMap = {
    test: {
      appkey: '6f44f64cfd07c9cf71883fe2e923cbdb',
      url: 'https://app.netease.im'
    },

    pre: {
      appkey: '6f44f64cfd07c9cf71883fe2e923cbdb',
      url: 'https://app.netease.im'
    },
    online: {
      appkey: '6f44f64cfd07c9cf71883fe2e923cbdb',
      url: 'https://app.netease.im'
    }
  };
CONFIG = configMap[envir];
// 是否开启订阅服务
CONFIG.openSubscription = true

module.exports = CONFIG