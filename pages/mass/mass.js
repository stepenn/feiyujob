// pages/mass/mass.js
let config = require('../../config.js');
let utils = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    awards: "",
    category: "",
    dateStart:'',
    dateEnd: "",
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
      let endTime = (utils.timestampToTime(obj.endDate)).slice(0, 10);
      this.setData({
        awards: obj.name,
        category: obj.job,
        dateStart: startTime,
        dateEnd: endTime,
      })
    }
  },
  awardsInput: function (e) {
    this.setData({
      awards: e.detail.value
    })
  },
  categoryInput: function (e) {
    this.setData({
      category: e.detail.value
    })
  },
  //时间段
  bindDateStartChange: function (e) {
    this.setData({
      dateStart: e.detail.value
    })
    let curTime = utils.curTime();
    if (this.data.dateStart > curTime) {
      wx.showToast({
        title: '请重新选择时间',
        icon: 'none',
        duration: 1000,
        success: () => {
          this.setData({
            dateStart: ''
          })
        }
      })
    }
  },
  bindDateEndChange: function (e) {
    this.setData({
      dateEnd: e.detail.value
    })
    let curTime = utils.curTime();
    if (this.data.dateEnd > curTime) {
      wx.showToast({
        title: '请重新选择时间',
        icon: 'none',
        duration: 1000,
        success: () => {
          this.setData({
            dateEnd: ''
          })
        }
      })
    }
  },
  save: function () {
    if (!this.data.awards) {
      wx.showToast({
        title: '请输入社团名称',
        duration: 500
      })
    } else if (!this.data.category.length) {
      wx.showToast({
        title: '请填写职位',
        icon: 'none',
        duration: 500
      })
    } else if (!this.data.dateStart.length && !this.data.dateEnd.length) {
      wx.showToast({
        title: '请选择实习时间段',
        icon: 'none',
        duration: 500
      })
    }else {
      if (this.data.itemId == 'undefined') {
        this.getMass({
          list: [
            {
              name: this.data.awards,
              job: this.data.category,
              startDate: this.data.dateStart,
              endDate: this.data.dateEnd,
            }
          ]
        });
      } else {
        this.putMass();
      }
    }
  },
  //删除实习经历部分
  deleteItem() {
    utils.request(config.service.deleteResume,'get',{
      id: this.data.itemId,
      type: 4
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
  //更新社团经历
  putMass(){
    this.getMass({
      list:[
        {
          id:this.data.itemId,
          name: this.data.awards,
          job: this.data.category,
          startDate: this.data.dateStart,
          endDate: this.data.dateEnd,
        }
      ]
    })
  },
  //添加社团经历
  getMass(params){
    utils.request(config.service.schoolWorks,'post',params).then(res=>{
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