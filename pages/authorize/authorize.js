// pages/authorize/authorize.js
var app = getApp();
var config = require("../../config.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad: function () {
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        //console.log(res.code)
      }
    })
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            withCredentials:true,
            success: function (res) {
              app.globalData.userInfo = res.userInfo;
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
              
            }
          });
        }
      }
    })
  },
  bindGetUserInfo: function (e) {
    if(e.detail.userInfo){
      wx.navigateTo({
        url: '../login/login',
      })
      wx.setStorage({
        key: 'info',
        data: e.detail.userInfo,
      })
    }else{
      this.bindRefuse()
    }
  },
  bindRefuse:function(){
    //用户按了拒绝按钮
    wx.showModal({
      title: '警告',
      content: '拒绝授权，将无法进入小程序!',
      showCancel: false,
      confirmText: '返回授权',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击了“返回授权”')
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})