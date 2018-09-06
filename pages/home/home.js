// pages/home/home.js
var app = getApp();
var config = require("../../config.js");
Page({
  /**
   * 页面的初始数据
   */
  data: {
    select: [],
    searchHome:'',
    list:[],
    listBq: ["百度", "阿里", "腾讯","百度1","阿里1","腾讯1"],
    catalogSelect: -1,
    changeOrder:false,
    city:"杭州",
    curIndex:-1,
    searchKeys:'',
    pageNumber: 1,
    pageSize: 10,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getLikeData()
  },
  //获取猜你喜欢数据
  getLikeData(callback){
    wx.request({
      url: config.service.guessLike,
      data:{
        city:this.data.city,
        pageNumber: this.data.pageNumber,
        pageSize: 10
      },
      success:res=>{
        wx.showLoading({
          title: '加载中...'
        });
        if(res.data.success){
          wx.hideLoading();
          let rData = res.data.data;
          let listItem = this.data.list;
          if (rData.length < this.data.pageSize){
            this.setData({
              list: listItem.concat(rData),
              hasMore: true
            })
            callback && callback();
          }else{
            this.setData({
              list: listItem.concat(rData),
              pageNumber: this.data.pageNumber + 1,
              hasMore: false
            })
          }
        }
      },
      fail:()=>{
        wx.hideLoading();
      }
    })
  },
  //跳转到详情页
  details:function(e){
    let id = e.currentTarget.dataset.id;
    let types = e.currentTarget.dataset.type;
    wx.navigateTo({
      url: '../stage/stage?id=' + id + '&types=' + types
    })
  },
  closeInfo:function(e){
    this.setData({
      curIndex: e.currentTarget.dataset.index
    })
    wx.showToast({
      icon:'none',
      title: '已关闭此条信息',
      duration:1000,
    })
  },
  /*标签至多放三个 */
  getListBq(data){
    if(data.length>3){
      data = data.splice(0,3);
      this.setData({
        listBq:data
      })
    }
  },
  // 搜索入口
  wxSearchTab: function (e) {
    let types = e.target.dataset.type;
    wx.navigateTo({
      url: "../search/search?type="+types
    })
  },
  //收藏信息
  getCollection(event){
    let index = event.currentTarget.dataset.index;
    this.setData({
      catalogSelect:this.data.changeOrder?-1:index,
      changeOrder:!this.data.changeOrder
    });
    wx.showToast({
      icon:'none',
      title: this.data.changeOrder?'收藏成功':'取消收藏',
      duration: 1000
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
    let keyword = wx.getStorageSync('home');
    let searchHome = wx.getStorageSync('searchHome');
    let isHome = app.globalData.isHome;
    this.setData({
      searchKeys: keyword,
      list: keyword?searchHome:this.data.list
    });
    if (isHome){
      this.setData({
        pageNumber: 1,
        list:[]
      })
      this.onLoad()
    }
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
    if (this.data.hasMore){
      wx.stopPullDownRefresh()
    }else{
      this.getLikeData(()=>{
        wx.stopPullDownRefresh()
      })
    }
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.hasMore) {
      wx.stopPullDownRefresh()
    } else {
      this.getLikeData(() => {
        wx.stopPullDownRefresh()
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})