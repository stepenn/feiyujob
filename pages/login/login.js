// pages/login/login.
var config = require("../../config.js");
var utils = require('../../utils/util.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userName:'',
    password:'',
    sex:2,
    email:'',
    tel:'',
    currentMethod:'partLogin'
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let wxInfo = wx.getStorageSync('info');
    if(!wxInfo){
      wx.navigateTo({
        url: '../authorize/authorize',
      })
    }
  },
  // 用户登录
  login: function () {
    if (this.data.userName.length == 0) {
      wx.showToast({
        title: '请输入账号',
        icon: 'none',
        duration: 1000
      })
    } else if (this.data.password.length == 0) {
      wx.showToast({
        title: '请输入密码',
        icon: 'none',
        duration: 1000
      })
    } else {
      this.getLogin();
    }
  },
  //请求登录接口
  getLogin:function(){
    wx.showLoading({
      title: '登录中...',
    })
    wx.request({
      url: config.service.login,
      data:{
        userName: this.data.userName,
        password: this.data.password
      },
      success:res=>{
        wx.hideLoading();
        app.globalData.header.Cookie = res.header['Set-Cookie'];
        console.log(app.globalData.header.Cookie)
        wx.setStorage({
          key: "canUser",
          data: res.data.data,
        })
        setTimeout(() => {
          wx.switchTab({
            url: '../home/home'
          })
        }, 1000)
      }
    })
  },
  //用户注册
  register:function(){
    if (this.data.userName.length == 0){
      wx.showToast({
        title: '请输入用户名',
        icon: 'none',
        duration: 1000
      })
    } else if (this.data.password.length == 0) {
      wx.showToast({
        title: '请输入密码',
        icon: 'none',
        duration: 1000
      })
    } else if (this.data.email.length == 0) {
      wx.showToast({
        title: '请输入邮箱',
        icon: 'none',
        duration: 1000
      })
    } else if (this.data.tel.length == 0) {
      wx.showToast({
        title: '请输入手机号',
        icon: 'none',
        duration: 1000
      })
    }else{
      this.getRegister()
    }
  },
  //请求注册接口
  getRegister(){
    let params = {};
    params.userName = this.data.userName;
    params.sex = this.data.sex;
    params.email = this.data.email;
    params.password = this.data.password;
    params.telephone = this.data.tel;
    utils.request(config.service.register,'get',params).then(res=>{
      console.log(res)
      setTimeout(() => {
        wx.showToast({
          title: '注册成功',
          icon: 'none',
          duration: 500
        })
        this.setData({
          currentMethod: 'partLogin'
        })
      }, 2000)
      if (!res.active) {
        wx.showToast({
          title: '请去邮箱激活账户!',
          icon: 'none',
          duration: 1500
        })
      }
    })
  },
  //检查用户名是否存在
  checkUserName:function(userName){
    if(userName.length){
      wx.request({
        url: config.service.checkUserName,
        data: {
          userName: userName
        },
        success: res => {
          if(res.data==1){
            console.log("该用户名可注册")
          }
        },
        fail: res => {
          if(res.data==2){
            wx.showToast({
              title: '用户名已存在',
              icon: "none",
              duration: 1000
            })
          }
        }
      })
    }
   
  },
  //检查邮箱是否存在
  checkExistEmail:function(email){
    if(email.length){
      if (this.checkEmail(email)) {
        wx.request({
          url: config.service.checkEmail,
          data: {
            email: email
          },
          success: res => {
            if(res.data){
              console.log("success")
            }else{
              wx.showToast({
                title: '邮箱已存在，请重新输入',
                icon: "none",
                duration: 1000
              })
            }
          }
        })
      }
    }
  },
  //切换到登录
  partLogin:function(){
    this.setData({
      currentMethod: "partLogin"
    })
  },
  //切换到注册
  partRegister:function(){
    this.setData({
      currentMethod: "partRegister"
    })
  },
  // 获取用户名
  userNameInput: function (e) {
    this.setData({
      userName: e.detail.value
    })
    this.checkUserName(e.detail.value)
  },
  // 获取输入密码
  passwordInput: function (e) {
    let password = e.detail.value;
    let checkedNum = this.checkPassword(password)
    this.setData({
      password: e.detail.value
    })
  },
  //密码由6-12位数字加字母组成验证
  checkPassword:function(password){
    if(password.length){
      let str = /^[a-zA-Z0-9]{6,12}$/;
      if (str.test(password)) {
        return true
      } else {
        wx.showToast({
          title: '密码太过简单',
          icon: 'none',
          duration: 1000,
        })
        return false
      }
    }
  },
  //性别
  radioChange: function (e) {
    this.setData({
      sex:e.detail.value
    })
    console.log(this.data.sex)
  },
  //邮箱
  emailInput:function(e){
    let email = e.detail.value;
    this.setData({
      email: e.detail.value
    })
    this.checkExistEmail(email)
  },
  //邮箱验证
  checkEmail:function(email){
    let str = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
    if(str.test(email)){
      return true
    }else{
      wx.showToast({
        title: '邮箱格式不正确',
        icon:'none',
        duration:1000,
      })
      return false
    }
  },
  //手机号码
  telInput:function(e){
    let telephone = e.detail.value;
    let checked = this.checkTel(telephone)
    this.setData({
      tel: e.detail.value
    })
  },
  //手机号码验证
  checkTel:function(tel){
    if(tel.length){
      let str = /^[1][3,4,5,7,8][0-9]{9}$/;
      if (str.test(tel)) {
        return true
      } else {
        wx.showToast({
          title: '手机号不正确',
          icon: 'none',
          duration: 1000,
        })
        return false
      }
    }
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