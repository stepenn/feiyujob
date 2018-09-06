// pages/practice/practice.js
let config=require('../../config.js');
let utils = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    companyName:"",
    jobTitle:'',
    dateStart:"",
    dateEnd:"",
    content:'',
    itemId:'',
    itemObj:''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      itemId:options.id,
      itemObj:options.obj
    })
    this.showItem(this.data.itemId, JSON.parse(this.data.itemObj))
  },
  showItem(id,obj){
    if (id == this.data.itemId){
      let startTime = (utils.timestampToTime(obj.startDate)).slice(0,10);
      let endTime = (utils.timestampToTime(obj.endDate)).slice(0,10);
      this.setData({
        companyName: obj.company,
        jobTitle:obj.jobName,
        dateStart: startTime,
        dateEnd:endTime,
        content:obj.content
      },()=>{
        wx.setStorage({
          key: 'praContent',
          data: obj.content,
        })
      })
    }
  },

  //获取公司名称
  companyNameInput:function(e){
    this.setData({
      companyName:e.detail.value
    })
  },
  //获取职位
  jobTitleInput: function (e) {
    this.setData({
      jobTitle:e.detail.value
    })
  },
  
  //时间段
  bindDateStartChange: function (e) {
    this.setData({
      dateStart: e.detail.value
    })
    let curTime = utils.curTime();
    if(this.data.dateStart>curTime){
      wx.showToast({
        title: '请重新选择时间',
        icon:'none',
        duration:1000,
        success:()=>{
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
  //保存实习经历
  saveEdu: function () {
    if (!this.data.companyName.length) {
      wx.showToast({
        title: '请输入公司名称',
        icon:'none',
        duration: 500
      })
    } else if (!this.data.jobTitle.length) {
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
    } else {
      if (this.data.itemId == 'undefined'){
        this.getPractices({
          list: [
            {
              workType:3,
              company: this.data.companyName,
              jobName: this.data.jobTitle,
              startDate: this.data.dateStart,
              endDate: this.data.dateEnd,
              content: wx.getStorageSync('praContent')
            }
          ]
        });
      }else{
        this.putPractices();
      }
    }
  },
  //删除实习经历部分
  deleteItem(){
    wx.showLoading({
      title: '数据加载中...',
    })
    utils.request(config.service.deleteResume, 'get', {
      id: this.data.itemId,
      type: 5}).then(res=>{
        wx.hideLoading()
        setTimeout(() => {
          wx.navigateBack()
        }, 1000)
        wx.removeStorageSync('praContent')
      }).catch(()=>{
        wx.hideLoading()
      })
  },
  //更新实习经历
  putPractices(){
    this.getPractices({
      list: [
        {
          id:this.data.itemId,
          workType:3,
          company: this.data.companyName,
          jobName: this.data.jobTitle,
          startDate: this.data.dateStart,
          endDate: this.data.dateEnd,
          content: wx.getStorageSync('praContent')
        }
      ]
    })
  },
  //添加实习经历
  getPractices:function(params){
    wx.showLoading({
      title: '数据加载中...',
    })
    utils.request(config.service.practices,'post',params).then(res=>{
      wx.hideLoading()
      wx.redirectTo({
        url: "../resume/resume"
      })
    }).catch(()=>{
      wx.hideLoading()
    })
  },
  proDescribe: function (e) {
    let types=e.target.dataset.type;
    wx.navigateTo({
      url: '../content/content?type='+types+'&pra='+this.data.content+'&id='+this.data.itemId,
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