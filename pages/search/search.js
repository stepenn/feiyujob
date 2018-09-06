//index.js
var WxSearch = require('../../wxSearchView/wxSearchView.js');
var config = require('../../config.js');
var utils = require('../../utils/util.js');
var app = getApp();

Page({
  data: {
    can:'',
  },
  // 搜索栏
  onLoad: function (options) {
    this.setData({
      can: options.type
    })
    console.log(options.search)
    var that = this;
    WxSearch.init(
      that,  // 本页面一个引用
      ['阿里巴巴', "vivo", "网易", '百度', '小米','华为'], // 热点搜索推荐，[]表示不使用
      ['湖北', '湖南', '北京', "南京"],// 搜索匹配，[]表示不使用
      that.mySearchFunction, // 提供一个搜索回调函数
      that.myGobackFunction //提供一个返回回调函数
    );
  },

  // 转发函数,固定部分
  wxSearchInput: WxSearch.wxSearchInput,  // 输入变化时的操作
  wxSearchKeyTap: WxSearch.wxSearchKeyTap,  // 点击提示或者关键字、历史记录时的操作
  wxSearchDeleteAll: WxSearch.wxSearchDeleteAll, // 删除所有的历史记录
  wxSearchConfirm: WxSearch.wxSearchConfirm,  // 搜索函数
  wxSearchClear: WxSearch.wxSearchClear,  // 清空函数

  // 搜索回调函数  
  mySearchFunction: function (value) {
    let types = this.data.can;
    let keyword = value;
    switch(types){
      case 'home':
        this.resultSearch(value);
        break;
      case 'recruits':
        this.searchRecruits(value);
        break;
      case 'preach':
        this.searchPreach(value);
        break;
    }
  },
  //猜你喜欢搜索结果
  resultSearch:function(value){
    wx.showLoading({
      title: '数据加载中...'
    });
    utils.request(config.service.recruitsCity,'get',{
      companyName: value,
      pageNumber: 1,
      pageSize: 10
    }).then(res=>{
      wx.hideLoading();
      app.globalData.isHome = false;
      wx.setStorage({
        key: 'home',
        data: value,
        success: () => {
          wx.navigateBack()
        }
      })
      wx.setStorage({
        key: 'searchHome',
        data: res
      })
    }).catch(()=>{
      wx.hideLoading();
    })
  },
  //校园招聘搜索结果
  searchRecruits: function (value) {
    wx.showLoading({
      title: '数据加载中...'
    });
    utils.request(config.service.recruitsCity,'get',{
      workType: 1,
      companyName: value,
      pageSize: 10
    }).then(res=>{
      wx.hideLoading();
      app.globalData.isRecruits = false;
      wx.setStorage({
        key: 'recruits',
        data: value,
        success: () => {
          wx.navigateBack()
        }
      })
      wx.setStorage({
        key: 'searchRecruits',
        data: res
      })
    }).catch(()=>{
      wx.hideLoading();
    })
  },
  //宣讲会搜索结果
  searchPreach: function (value) {
    wx.showLoading({
      title: '数据加载中...'
    });
    utils.request(config.service.recruitsCity,'get',{
      workType: 2,
      companyName: value,
      pageSize: 10
    }).then(res=>{
      wx.hideLoading();
      app.globalData.isPreach = false;
      wx.setStorage({
        key: 'preach',
        data: value,
        success: () => {
          wx.navigateBack()
        }
      })
      wx.setStorage({
        key: 'searchPreach',
        data: res
      })
    }).catch(()=>{
      wx.hideLoading();
    })
  },
  // 返回回调函数
  myGobackFunction: function () {
    let types = this.data.can;
    switch (types) {
      case 'home':
        app.globalData.isHome = !app.globalData.isHome;
        wx.removeStorageSync('home');
        wx.removeStorageSync('searchHome');
        break;
      case 'recruits':
        app.globalData.isRecruits = !app.globalData.isRecruits;
        wx.removeStorageSync('recruits');
        wx.removeStorageSync('searchRecruits');
        break;
      case 'preach':
        app.globalData.isPreach = !app.globalData.isPreach;
        wx.removeStorageSync('preach');
        wx.removeStorageSync('searchPreach');
        break;
    }
    wx.navigateBack()
  }
})
