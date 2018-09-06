// pages/focused/focused.js
var config = require('../../config.js');
let utils = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    noSelect: '../../images/like.png',
    hasSelect: '../../images/like-sel.png',
    selectIndex: [],
    isHas: '',
    userName: '',
    headImg: '',
    isData:true,
    focusData:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let canUser = wx.getStorageSync('canUser');
    let info = wx.getStorageSync('info')
    this.setData({
      userName: canUser.userName,
      headImg:info.avatarUrl
    })
    this.checkFocused();
  
  },
  //获取我的关注
  checkFocused: function () {
    let header = {};
    let cookie = wx.getStorageSync("sessionid");
    if (cookie) {
      header["Cookie"] = cookie;
    }
    wx.request({
      url: config.service.allcollect,
      header: header,
      data: {
        pageNumber: 1,
        pageSize: 10
      },
      success: res => {
        if (!res.data.data) {
          this.setData({
            moreFocus: !this.data.moreFocus,
            isData: false
          })
        } else {
          let rData = res.data.data;
          let selectIndex = this.data.selectIndex;
          for (var j = 0; j < rData.length; j++) {
            selectIndex.push({ sureid: false })
          }
          this.setData({
            focusData: res.data.data
          })
        }
      }
    })
  },
  //跳转到详情页
  details: function (e) {
    let id = e.currentTarget.dataset.id;
    let types = e.currentTarget.dataset.type;
    wx.navigateTo({
      url: '../stage/stage?id=' + id + '&select=' + this.data.isHas + '&types=' + types
    })
  },
  selectRep: function (e) {
    let index = e.currentTarget.dataset.selectindex;
    let id = e.currentTarget.dataset.id
    let selectIndex = this.data.selectIndex;
    selectIndex[index].sureid = !selectIndex[index].sureid;
    this.setData({
      selectIndex: selectIndex,
      isHas: !selectIndex[index].sureid
    })
    if (selectIndex[index].sureid) {
      this.collectInfo(id);
    } else {
      this.cancelInfo(id)
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