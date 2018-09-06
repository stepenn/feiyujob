// pages/info/info.js

let config = require('../../config.js');
let utils = require('../../utils/util.js');
let app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    hidden: true,
    nocancel: false,
    name: '',
    sex:0,
    //age:'',
    //tempFilePaths:'',
    telephone:"", //联系电话
    email:"",//邮箱
    eduList:["未知","专科","本科","研究生","博士"],
    hignEdu:'',
    birthday:'',
    id:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let canUser = wx.getStorageSync('canUser');
    if (canUser){
      this.checkInfo()
    }
    
  },
  save(){
    this.updateInfo()
  },
  //查询用户信息
  checkInfo(){
    wx.showLoading({
      title: '数据加载中...',
    })
    utils.request(config.service.userInfo,'get',{}).then(res=>{
      wx.hideLoading();
      console.log(res)
      this.setData({
        name:res.name,
        sex:res.sex,
        age:res.age,
        //tempFilePaths:res.headImg,
        hignEdu: res.hignEdu,
        telephone: res.telephone,
        email: res.email,
        birthday:res.birthday
      })
    }).catch(()=>{
      wx.hideLoading();
    })
  },
  //更新用户信息
  updateInfo(){
    wx.showLoading({
      title: '数据加载中...',
    })
    // let temp = JSON.stringify(this.data.tempFilePaths).split("[")[1];
    // let temps = temp.split("]")[0];
    utils.request(config.service.updateUser,'get',{
      name: this.data.name,
      sex: this.data.sex,
      //age: this.data.age,
      //headImg: temps,
      telephone: this.data.telephone,
      hignEdu: this.data.hignEdu,
      birthday: this.data.birthday,
      email: this.data.email
    }).then(res=>{
      wx.hideLoading();
      wx.redirectTo({
        url: "../resume/resume"
      })
    }).catch(()=>{
      wx.hideLoading();
    })
  },
  cancel: function () {
    this.setData({
      hidden: true
    });
  },
  confirm: function () {
    this.setData({
      hidden: !this.data.hidden,
      nocancel: this.data.nocancel
    });
  },
  getEdu:function(e){
    this.setData({
      hidden: true,
      hignEdu: e.target.dataset.index
    })
    
  },
  radioChange:function(e){
    this.setData({
      sex: e.detail.value
    })
  },
  //获取头像
  chooseImage: function () {
    let self = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        self.setData({
          tempFilePaths: res.tempFilePaths,
          isImage: true
        })
      }
    })
  },
  ageInput: function (e) {
    this.setData({
      age: e.detail.value
    })
  },
  //获取姓名
  nameInput:function(e){
    this.setData({
      name: e.detail.value
    })
  },
  //获取联系电话
  userTellInput:function(e){
    this.setData({
      telephone:e.detail.value
    })
  },
  //邮箱
  userEmailInput:function(e){
    this.setData({
      email: e.detail.value
    })
  },
  bindDateChange: function (e) {
    this.setData({
      birthday: e.detail.value
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