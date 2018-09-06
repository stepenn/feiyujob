//app.js
var config = require("./config.js");
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.removeStorageSync('logs', logs)
  },
  globalData: {
    userInfo: null,//微信授权的useInfo
    canUser:null,//user相关api获取的用户信息
    locationCity:'',//定位城市
    isHome:false,
    isRecruits: false,
    isPreach: false,
    header:{'Cookie': ''}
  }
})