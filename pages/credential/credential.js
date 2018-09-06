// pages/credential/credential.js
var config = require("../../config.js");
let utils = require('../../utils/util.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    awards: "",
    date: '',
    itemId: '',
    itemObj: ''

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      itemId: options.id,
      itemObj: options.obj
    })
    this.showItem(this.data.itemId, JSON.parse(this.data.itemObj))

  },
  showItem(id, obj) {
    if (id == this.data.itemId) {
      let startTime = (utils.timestampToTime(obj.startDate)).slice(0, 10);
      this.setData({
        awards: obj.name,
        date: startTime
      })
    }
  },

  awardsInput: function (e) {
    this.setData({
      awards: e.detail.value
    })
  },
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
    let curTime = utils.curTime();
    if (this.data.date > curTime) {
      wx.showToast({
        title: '请重新选择时间',
        icon: 'none',
        duration: 1000,
        success: () => {
          this.setData({
            date: ''
          })
        }
      })
    }
  },
  save: function () {
    if (!this.data.awards) {
      wx.showToast({
        title: '请输入名称',
        icon: 'none',
        duration: 500
      })
    } else if (!this.data.date) {
      wx.showToast({
        title: '请选择时间',
        icon: 'none',
        duration: 500
      })
    } else {
      if (this.data.itemId == 'undefined') {
        this.getCredent({
          list: [
            {
              startDate: this.data.date,
              level: 0,
              skillType: 2,
              name: this.data.awards
            }
          ]
        });
      } else {
        this.putCredent();
      }
    }
  },
  putCredent() {
    this.getCredent({
      list: [
        {
          id: this.data.itemId,
          startDate: this.data.date,
          level: 0,
          skillType: 2,
          name: this.data.awards
        }
      ]
    })
  },
  getCredent: function (params) {
    utils.request(config.service.modifySkills,'post',params).then(res=>{
      wx.redirectTo({
        url: "../resume/resume"
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