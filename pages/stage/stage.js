// pages/stage/stage.js
let config = require('../../config.js');
let utils = require('../../utils/util.js');
let WxParse = require('../../wxParse/wxParse.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    detailsData:1,
    companyName:'',
    companyDesc:'',
    school:'',
    companyTags:'',
    recruitUrl:'',
    xjTime:'',
    recruitCitys:'',
    teachInsAddress:'',
    recruitWork:'',
    select:"",
    types:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    if (options.id || options.types ||options.select){
      this.setData({
        id: options.id,
        types: options.types,
        select: options.select
      });
    }
    this.getRecruitDetail(that)
  },
  //获取详情页信息
  getRecruitDetail(that) {
    wx.showLoading({
      title: '数据加载中...',
    })
    utils.request(config.service.details, 'get', {
      id: this.data.id
    }).then(res => {
      wx.hideLoading();
      let article = res.recruitWork
      WxParse.wxParse('article', 'html', article, that, 5);
      // console.log(recruit)
      this.setData({
        detailsData:res,
        companyName:res.companyName,
        companyDesc: res.companyDesc,
        recruitCitys: res.recruitCitys,
        school:res.school,
        recruitUrl: res.recruitUrl,
        recruitWork: res.recruitWork,
        xjTime:res.xjTime,
        companyTags: res.companyTags,
        teachInsAddress: res.teachInsAddress
      })
    }).catch(() => {
      wx.hideLoading()
    })
  },
  collectHander(){
    this.setData({
      select:!this.data.select
    })
    if (this.data.select) {
      this.collectInfo(this.data.id)
    } else {
      this.cancelInfo(this.data.id)
    }
    
  },
  //用户收藏
  collectInfo(id) {
    utils.request(config.service.collect, 'get', {
      recruitId: id
    }).then(() => {
      wx.showToast({
        title: '收藏成功',
        duration: 1000
      })
    })
  },
  //取消收藏
  cancelInfo(id) {
    utils.request(config.service.cancel, 'get', {
      recruitId: id
    }).then(() => {
      wx.showToast({
        title: '取消收藏',
        duration: 1000
      })
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