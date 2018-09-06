// pages/personal/personal.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userName:'',
    headImg:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      
    })
  },
  
  //判断是否授权
  getAuth(){
    let canUser=wx.getStorageSync('canUser');
    let wxInfo= wx.getStorageSync('info');
    if (!canUser){
      wx.navigateTo({
        url: '../authorize/authorize',
      })
    }else{
      wx.navigateTo({
        url: '../personal/personal',
      })
      this.setData({
        userName:canUser.userName,
        headImg: wxInfo.avatarUrl
      })
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },
  //我的简历
  myResume:function() {
    let canUser = wx.getStorageSync('canUser');
    if (canUser){
      wx.navigateTo({
        url: "../resume/resume"
      });
    }else{
      wx.navigateTo({
        url: "../login/login"
      });
    }
    
  },
  //竞争力指数
  myIndex: function () {
    wx.navigateTo({
      url: "../competitive/competitive"
    });
  },
  //我的关注
  myFocused: function () {
    let canUser = wx.getStorageSync('canUser');
    if (canUser) {
      wx.navigateTo({
        url: "../focused/focused"
      });
    } else {
      wx.navigateTo({
        url: "../login/login"
      });
    }
    
  },
  loginCenter:function(){
    wx.navigateTo({
      url: "../login/login"
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getAuth();
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