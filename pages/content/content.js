// pages/content/content.js
let config = require('../../config.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    beContent: "",
    can:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      can:options.type,
      beContent: options.pra
    })
    if(options.id=='undefined'){
      wx.removeStorageSync('praContent')
    }
    this.modifyContent(options.type)
  },
  //获取描述
  getDes: function (e) {
    this.setData({
      beContent: e.detail.value
    })
  },
  save: function () {
    let types = this.data.can;
    if (this.data.beContent.length) {
      switch(types){
        case 'edu':
          wx.setStorage({
            key: "edu",
            data: this.data.beContent,
            success: function () {
              wx.navigateBack()
            }
          })
          
          break;
        case 'pra':
          wx.setStorage({
            key: "praContent",
            data: this.data.beContent,
            success: function () {
              wx.navigateBack()
            }
          })
          break;
      }
    } else {
      wx.showToast({
        title: '请输入项目描述',
        icon:'none',
        duration: 1000
      })
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  //获取内容
  modifyContent(types){
    let edu = wx.getStorageSync("edu");
    let pra = wx.getStorageSync("pra");
    switch(types){
      case 'edu':
        this.setData({
          beContent: edu
        });
        break;
      case 'pra':
        this.setData({
          beContent: pra
        });
        break;
    }
  },
  

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (options) {
    let praContent = wx.getStorageSync('praContent');
    this.setData({
      beContent:praContent
    })
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