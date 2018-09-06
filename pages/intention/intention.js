// pages/intention/intention.js
let config=require('../../config.js');
let utils = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cityName:'',
    intentPosition:'',
    indexCity:'',
    arrayCity:["北京","上海","深圳","广州","天津","杭州",'南京','武汉',"成都","西安"],
    id:''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getIntent();
  },
  intentPositionInput: function (e) {
    this.setData({
      intentPosition: e.detail.value
    })
  },
  bindPickerChangeCity: function (e) {
    this.setData({
      indexCity: e.detail.value,
      cityName: this.data.arrayCity[e.detail.value]
    })
  },
  
  saveEdu: function () {
    if (!this.data.arrayCity[this.data.indexCity]) {
      wx.showToast({
        title: '请选择意向城市',
        duration: 500
      })
    } else if (!this.data.intentPosition) {
      wx.showToast({
        title: '请输入意向岗位',
        duration: 500
      })
    } 
    else {
      if(this.data.id){
        this.putIntent()
      }else{
        this.modifyIntent();
      }
      
    }
  },
  putIntent(){
    this.modifyIntent({
      id:this.data.id,
      cityName: this.data.cityName,
      intentPosition: this.data.intentPosition
    })
  },
  modifyIntent:function(params){
    wx.showLoading({
      title: '数据加载中...',
    })
    utils.request(config.service.modifyIntent,'get',
    params).then(res=>{
      wx.hideLoading();
      wx.redirectTo({
        url: "../resume/resume"
      })
    }).catch(()=>{
      wx.hideLoading();
      console.log('putIntent')
    })
  },
  
  //查询期望城市信息
  getIntent() {
    wx.showLoading({
      title: '数据加载中...',
    })
    utils.request(config.service.getIntent, 'get', {
    }).then(res => {
      wx.hideLoading();
      this.setData({
        cityName:res.cityName,
        intentPosition: res.intentPosition,
        id:res.id
      })
    }).catch(() => {
      wx.hideLoading();
      console.log('getIntent')
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