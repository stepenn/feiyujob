// pages/recruits/recruits.js
var app = getApp();
var config = require('../../config.js');
var utils = require('../../utils/util.js');
Page({
  data: {
    floorstatus:false,
    selectPerson: true,
    isFocus:true,
    selectArea: false,
    isMask:false,
    selectData:[],
    curIndex: -1,
    listA:[],
    pageNumber:1,
    pageSize:10,
    controlFocus:true,
    selectCity:'',
    pull:false,
    moreCity:'',
    searchKeys:'',
    hasMore:false
  },
  //点击选择类型
  clickPerson: function () {
    var selectPerson = this.data.selectPerson;
    if (selectPerson == true) {
      this.setData({
        selectArea: true,
        selectPerson: false,
        isMask:true
      })
    } else {
      this.setData({
        selectArea: false,
        selectPerson: true,
        isMask:false
      })
    }
  },
  //获取热门城市
  getHotcity:function(){
    wx.request({
      url:config.service.hotCity,
      data:{
        level:2,
        order:1
      },
      success:res=>{
        this.setData({
          selectData:res.data.data
        })
      }
    })
  },
  //我的关注
  myfocused:function(){
    let canUser = wx.getStorageSync("canUser")
    if(!canUser){
      wx.navigateTo({
        url: '../authorize/authorize',
      })
    }else{
      if (this.data.controlFocus){
        this.checkFocused()
      }else{
        this.getRecruits({
          workType: 1,
          pageNumber: 1,
          pageSize: 10
        }, () => {
          wx.stopPullDownRefresh()
        });
      }
      this.setData({
        controlFocus: !this.data.controlFocus,
        pageNumber:1,
        listA:[]
      })
    }
  },
  //查询我的关注
  checkFocused:function(){
    utils.request(config.service.focused,'get',{
      workType: 1,  //类型 1校招 2宣讲会 3实习 4社招
      pageNumber: this.data.pageNumber,
      pageSize: 10
    }).then(res=>{
      this.setData({
        listA: res
      })
    })
  },
  //获取校园招聘信息
  getRecruits:function(params,callback){
    wx.request({
      url: config.service.recruitsCity,
      data: params,
      success:res=>{
        wx.showLoading({
          title:'加载中...'
        });
        if(res.data.success){
          wx.hideLoading();
          let rData = res.data.data;
          let listItem = this.data.listA;
          if (rData.length<this.data.pageSize){
            this.setData({
              listA: listItem.concat(rData),
              hasMore:true
            })
            callback && callback();
          }else{
            this.setData({
              listA: listItem.concat(rData),
              pageNumber: this.data.pageNumber + 1,
              hasMore:false
            })
          }
        }
      },
      fail:()=>{
        wx.hideLoading();
      }
    })
  },
  //点击切换
  mySelect: function (e) {
    this.setData({
      selectPerson: true,
      selectArea: false,
      isMask:false,
      listA:[],
      pageNumber: 1,
      pageSize: 10,
      selectCity: e.target.dataset.city,
      curIndex: e.target.dataset.index,
      pull:true
    })
    this.selectCityData()
  },
  selectCityData:function(){
    this.getRecruits({
      workType: 1,
      city: this.data.selectCity,
      pageNumber: this.data.pageNumber,
      pageSize: 10
    })
  },
  // 搜索入口
  wxSearchTab: function (e) {
    let types = e.target.dataset.type;
    wx.navigateTo({
      url: "../search/search?type="+types+"&search="+this.data.searchKeys
    });
  },
  // 获取滚动条当前位置
  onPageScroll: function (e) {
    if (e.scrollTop > 100) {
      this.setData({
        floorstatus: true
      });
    } else {
      this.setData({
        floorstatus: false
      });
    }
  },
  //回到顶部
  goTop: function (e) { 
    if (wx.pageScrollTo) {
      wx.pageScrollTo({
        scrollTop: 0
      })
    }
  },
  //更多城市
  moreCity:function(){
    wx.navigateTo({
      url: '../city/city',
    })
  },
  //跳转到详情页
  details: function (e) {
    let id = e.currentTarget.dataset.id;
    let types = e.currentTarget.dataset.type;
    wx.navigateTo({
      url: '../stage/stage?id=' + id +'&types='+types
    })
  },
  onPullDownRefresh:function(){
    if(this.data.pull){
      this.getRecruits({
        workType: 1,
        city:this.data.selectCity,
        pageNumber: this.data.pageNumber,
        pageSize: 10
      },()=>{
        wx.stopPullDownRefresh()
      })
    } else if (this.data.hasMore){
      wx.stopPullDownRefresh()
    }else{
      this.getRecruits({
        workType: 1,
        pageNumber: this.data.pageNumber,
        pageSize: 10
      }, () => {
        wx.stopPullDownRefresh()
      });
    }
    
  },
  onReachBottom:function(){
    if (this.data.pull) {
      this.getRecruits({
        workType: 1,
        city: this.data.selectCity,
        pageNumber: this.data.pageNumber,
        pageSize: 10
      }, () => {
        wx.stopPullDownRefresh()
      })
    } else if (this.data.hasMore) {
      wx.stopPullDownRefresh()
    } else {
      this.getRecruits({
        workType: 1,
        pageNumber: this.data.pageNumber,
        pageSize: 10
      }, () => {
        wx.stopPullDownRefresh()
      });
    }
  },
  onLoad: function (options) {
    this.getHotcity();
    this.getRecruits({
      workType: 1, 
      pageNumber: this.data.pageNumber,
      pageSize: 10
    });
    
  },
  recruLoad(){
    this.onLoad();
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    let city = wx.getStorageSync('city');
    let keywordA = wx.getStorageSync('recruits');
    let searchRecruits = wx.getStorageSync('searchRecruits');
    let isRecruits = app.globalData.isRecruits;
    console.log(isRecruits)
    this.setData({
      moreCity: city,
      searchKeys: keywordA,
      listA: keywordA?searchRecruits:this.data.listA
    },()=>{
      wx.removeStorageSync('city');
    });
    if (isRecruits){
      this.setData({
        pageNumber: 1,
        listA: []
      })
      this.recruLoad();
    }
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})