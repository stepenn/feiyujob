// pages/honor/honor.js
let config = require("../../config.js");
let utils = require('../../utils/util.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    index:'',
    awards:"",
    category:"",
    levelData: ['校级', '市级', '省级', '国家级'],
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
    let obj = JSON.parse(this.data.itemObj)
    this.showItem(this.data.itemId,obj)
  },
  showItem(id, obj) {
    if (id == this.data.itemId) {
      let startTime = (utils.timestampToTime(obj.awardDate)).slice(0, 10);
      this.setData({
        awards: obj.name,
        date: startTime,
        category: this.data.levelData[obj.level]
      })
    }
  },
  //获取奖项
  awardsInput: function (e) {
    this.setData({
      awards: e.detail.value
    })
  },
  bindPickerLevel: function (e) {
    this.setData({
      index: e.detail.value,
      category: this.data.levelData[e.detail.value]
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
        title: '请输入所获奖项',
        duration: 500
      })
    } else if (!this.data.date) {
      wx.showToast({
        title: '请选择时间',
        duration: 500
      })
    } else {
      if (this.data.itemId == 'undefined') {
        this.getHonor({
          list: [
            {
              awardDate: this.data.date,
              level: this.data.index,
              name: this.data.awards
            }
          ]
        });
      } else {
        this.putHonor();
      }
    }
  },
  //删除实习经历部分
  deleteItem() {
    utils.request(config.service.deleteResume,'get',{
      id: this.data.itemId,
      type: 6
    }).then(res=>{
      setTimeout(() => {
        wx.navigateBack()
      }, 1000)
      wx.showToast({
        title: '删除成功',
        icon: 'none',
        duration: 1500,
      })
    })
  },
  //更新荣誉奖项
  putHonor() {
    this.getHonor({
      list: [
        {
          id: this.data.itemId,
          awardDate: this.data.date,
          level: this.data.index,
          name: this.data.awards
        }
      ]
    })
  },
  //添加荣誉奖项
  getHonor:function(params){
    utils.request(config.service.awards,'post',params).then(res=>{
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