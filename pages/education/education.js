// pages/education/education.js
var config=require("../../config.js");
let utils = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    schoolName:'',
    professional:"",
    level:'',
    array:['大专',"本科","硕士","博士"],
    date: '',
    dateStart: "",
    dateEnd: "至今",
    eduContent: '',
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
        schoolName: obj.schooName,
        professional: obj.professional,
        level: obj.eduLevel,
        dateStart: startTime,
        dateEnd: endTime
      })
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },
  //删除实习经历部分
  deleteItem() {
    wx.showLoading({
      title: '数据加载中...',
    })
    utils.request(config.service.deleteResume, 'get', {
      id: this.data.itemId,
      type: 2
    }).then(res => {
      wx.hideLoading()
      setTimeout(() => {
        wx.navigateBack()
      }, 1000)
    }).catch(() => {
      wx.hideLoading()
    })
  },
  //添加教育经历
  userEdu: function (params){
    wx.showLoading({
      title: '数据加载中...',
    })
    utils.request(config.service.userEducation,'post',params).then(()=>{
      wx.hideLoading()
      wx.redirectTo({
        url: "../resume/resume"
      })
    }).catch(() => {
      wx.hideLoading();
    })
  },
  //获取学历
  bindPickerChange: function (e) {
    this.setData({
      level: e.detail.value
    })
  },
  //获取学校
  schoolNameInput:function(e){
    this.setData({
      schoolName:e.detail.value
    })
  },
  //获取专业
  proInput:function(e){
    this.setData({
      professional:e.detail.value
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
  //更新教育经历
  putEduInfos() {
    this.userEdu({
      list: [
        {
          id: this.data.itemId,
          schooName: this.data.schoolName,
          professional: this.data.professional,
          startDate: this.data.dateStart,
          endDate: this.data.dateEnd,
          eduLevel: this.data.level,
          eduStatus: 1,
        }
      ]
    })
  },
  //保存教育经历
  saveEdu:function(){
    if (!this.data.schoolName.length){
      wx.showToast({
        title: '请输入学校',
        icon: 'none',
        duration:500
      })
    } else if (!this.data.professional.length){
      wx.showToast({
        title: '请填写专业',
        icon: 'none',
        duration:500
      })
    } else if (!this.data.dateStart.length && !this.data.dateEnd.length){
      wx.showToast({
        title: '请选择时间',
        icon: 'none',
        duration: 500
      })
    }else{
      if (this.data.itemId == 'undefined'){
        this.userEdu({
          list: [
            {
              schooName: this.data.schoolName,
              professional: this.data.professional,
              startDate: this.data.dateStart,
              endDate: this.data.dateEnd,
              eduLevel: this.data.level,
              eduStatus: 1,
            }
          ]
        })
      }else{
        this.putEduInfos();
      }
    }
    
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