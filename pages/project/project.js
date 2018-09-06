// pages/project/project.js
let config = require('../../config.js');
let utils = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    projectName:"",
    projectRole:"",
    dataStart:"",
    dateEnd:"至今",
    content: '',
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
        projectName: obj.company,
        projectRole: obj.jobName,
        dateStart: startTime,
        dateEnd: endTime,
        content: obj.content
      }, () => {
        wx.setStorage({
          key: 'proContent',
          data: obj.content,
        })
      })
    }
  },
  //项目名称
  projectNameInput:function(e){
    this.setData({
      projectName:e.detail.value
    })
  },

  //项目角色
  projectRoleInput:function(e){
    this.setData({
      projectRole: e.detail.value
    })
  },
  proDescribe:function(e){
    let types = e.target.dataset.type;
    wx.navigateTo({
      url: '../details/details?type=' + types + '&pro=' + this.data.content + '&id=' + this.data.itemId,
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
  //保存项目经验
  saveEdu: function () {
    if (!this.data.projectName.length) {
      wx.showToast({
        title: '请输入项目名称',
        duration: 500
      })
    } else if (!this.data.projectRole.length) {
      wx.showToast({
        title: '请输入您的角色',
        duration: 500
      })
    } else if (!this.data.dateStart.length && !this.data.dateEnd.length) {
      wx.showToast({
        title: '请选择项目时间段',
        duration: 500
      })
    } else {
      if (this.data.itemId == 'undefined'){
        this.getProject({
          list: [
            {
              workType: 4,
              company: this.data.projectName,
              jobName: this.data.projectRole,
              startDate: this.data.dateStart,
              endDate: this.data.dateEnd,
              content: wx.getStorageSync('proContent')
            }
          ]
        })
      }else{
        this.putProject()
      }
    }
  },

  deleteItem() {
    utils.request(config.service.deleteResume,'get',{
      id: this.data.itemId,
      type: 5
    }).then(res=>{
      setTimeout(() => {
        wx.navigateBack()
      }, 1000)
      wx.showToast({
        title: '删除成功',
        icon: 'none',
        duration: 1500,
      })
      wx.removeStorageSync('proContent')
    })
  },
  //更新项目经验
  putProject() {
    this.getProject({
      list: [
        {
          id: this.data.itemId,
          workType: 4,
          company: this.data.companyName,
          jobName: this.data.jobTitle,
          startDate: this.data.dateStart,
          endDate: this.data.dateEnd,
          content: wx.getStorageSync('proContent')
        }
      ]
    })
  },
  //添加项目经验
  getProject(params){
    utils.request(config.service.practices,'post',params).then(res=>{
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