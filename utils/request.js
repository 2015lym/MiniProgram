const apiHttp = "https://www.dianti119.com/api/";
const socketHttp = "wss://*****.com/wss";

function httpReuqest(url, method, data, header) {
  var requestUrl = url;
  if (url.indexOf('http') == -1) {
    requestUrl = apiHttp + url;
  }
  data = data || {};
  data.openId = wx.getStorageSync('openId')
  header = header || {};
  let sessionId = wx.getStorageSync("UserSessionId");
  if (sessionId) {
    if (!header || !header["SESSIONID"]) {
      header["SESSIONID"] = sessionId;
    }
  }
  header['UserId'] = wx.getStorageSync('userInfo').UserId;

  wx.showNavigationBarLoading();
  let promise = new Promise(function(resolve, reject) {
    wx.request({
      url: requestUrl,
      header: header,
      data: data,
      method: method,
      success: function(res) {
        resolve(res);
      },
      fail: reject,
      complete: function() {
        wx.hideNavigationBarLoading();
      }
    });
  });
  return promise;
}

function upload(url, name, filePath) {
  let header = {};
  let sessionId = wx.getStorageSync("UserSessionId"); //从缓存中拿该信息
  if (sessionId) {
    if (!header || !header["SESSIONID"]) {
      header["SESSIONID"] = sessionId; //添加到请求头中
    }
  }
  wx.showNavigationBarLoading();
  let promise = new Promise(function(resolve, reject) {
    wx.uploadFile({
      url: apiHttp + url,
      filePath: filePath,
      name: name,
      header: header,
      success: function(res) {
        resolve(res);
      },
      fail: reject,
      complete: function() {
        wx.hideNavigationBarLoading();
      }
    });
  });
  return promise;
}
module.exports = {
  apiHttp: apiHttp,
  socketHttp: socketHttp,
  "get": function(url, data, header) {
    return httpReuqest(url, "GET", data, header);
  },
  "post": function(url, data, header) {
    return httpReuqest(url, "POST", data, header);
  },
  upload: function(url, name, filePath) {
    return upload(url, name, filePath);
  }
};