// pages/preach/preach.js
let config = require('../../config.js');
let utils = require('../../utils/util.js');
let app = getApp();
const QQMapWX = require('../../libs/qqmap-wx-jssdk.js');
const UNPROMPTED = 0;
const UNAUTHORIZED = 1;
const AUTHORIZED = 2;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    noSelect:'../../images/like.png',
    hasSelect:'../../images/like-sel.png',
    selectIndex: [],
    floorstatus: false,
    selectCity: true,
    selectCityData:[],
    selectSchool: false,
    selectSchoolData:[],
    selectTime:true,
    date:'',
    isMask: false,
    pullA:false,
    listB: [],
    curIndex:-1,
    pageNumber: 1,
    pageSize: 10,
    controlFocus: true,
    locationCity:'',
    toggleCity:true,
    toggleSchool:false,
    locationAuthType: UNPROMPTED,
    isAuth:false,
    pull:false,
    school:'',
    curIndexS:-1,
    moreCity:"",
    searchKeys:'',
    isHas:'',
    hasMore: false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.qqmapsdk = new QQMapWX({
      key: 'D5BBZ-55JK3-XWJ32-YLWVH-VEQ33-J3FMH'
    })
    wx.getSetting({
      success: res => {
        let auth = res.authSetting['scope.userLocation'];
        this.setData({
          locationAuthType:auth?AUTHORIZED:(auth==false)?UNAUTHORIZED:UNPROMPTED,
         
        })
        if(auth){
          this.getLocation()
        }
      }
    })
    this.getHotcity();
    this.getPreach({
      workType: 2,
      pageNumber: this.data.pageNumber,
      pageSize: 10
    });
    this.onTapLocation();
    
  },
  //获取位置信息
  onTapLocation() {
    if (this.data.locationAuthType === UNAUTHORIZED){
      wx.openSetting({
        success:res=>{
          let auth = res.authSetting['scope.userLocation'];
          if(auth){
            this.setData({
              isAuth:false
            })
            this.getLocation()
          }
        }
      })
    }else{
      this.setData({
        isAuth:true
      })
      this.getLocation()
    }
  },
  getLocation:function(){
    wx.getLocation({
      success: res => {
        this.qqmapsdk.reverseGeocoder({
          location: {
            latitude: res.latitude,
            longitude: res.longitude
          },
          success: res => {
            let city = res.result.address_component.city;
            this.setData({
              locationCity:city
            })
            this.getSchoolData(this.data.locationCity)
          }
        });
      },
      fail: () => {
        this.setData({
          locationAuthType: UNAUTHORIZED
        })
      }
     
    })
  },
  selectRep: function (e) {
    let index = e.currentTarget.dataset.selectindex;  
    let id = e.currentTarget.dataset.id
    let selectIndex = this.data.selectIndex;    
    selectIndex[index].sureid = !selectIndex[index].sureid;   
    this.setData({
      selectIndex: selectIndex,
      isHas: selectIndex[index].sureid
    })
    if (selectIndex[index].sureid){
      this.collectInfo(id);
    }else{
      this.cancelInfo(id)
    }
  },
  //我的关注
  myfocused: function () {
    let canUser = wx.getStorageSync("canUser")
    if (!canUser) {
      wx.navigateTo({
        url: '../authorize/authorize',
      })
    } else {
      if(this.data.controlFocus){
        this.checkFocused()
      }else{
        this.getPreach({
          workType: 2,
          pageNumber: 1,
          pageSize: 10
        }, () => {
          wx.stopPullDownRefresh()
        })
      }
      this.setData({
        controlFocus: !this.data.controlFocus,
        pageNumber: 1,
        listB: [] 
      })
    }
  },
  //查询我的关注
  checkFocused: function () {
    utils.request(config.service.focused,'get',{
      workType: 2,
      pageNumber: 1,
      pageSize: 10
    }).then(res=>{
      this.setData({
        listB: res
      })
    })
  },
  //用户收藏
  collectInfo(id){
    utils.request(config.service.collect,'get',{
      recruitId: id
    }).then(()=>{
      wx.showToast({
        title: '收藏成功',
        duration: 1000
      })
    })
  },
  //取消收藏
  cancelInfo(id){
    utils.request(config.service.cancel, 'get', {
      recruitId: id
    }).then(() => {
      wx.showToast({
        title: '取消收藏',
        duration: 1000
      })
    })
  },
  //获取宣讲会信息
  getPreach:function(params,callback){
    wx.request({
      url:config.service.preachCity,
      data:params,
      success: res => {
        wx.showLoading({
          title: '数据加载中...'
        });
        if (res.data.success) {
          wx.hideLoading();
          let rData = res.data.data;
          let listItem = this.data.listB;
          let selectIndex =this.data.selectIndex;
          for (var j = 0; j < rData.length;j++){
            selectIndex.push({ sureid: false })
          }
          if (rData.length < this.data.pageSize) {
            this.setData({
              listB: listItem.concat(rData),
              selectIndex:selectIndex,
              hasMore:true
            })
            callback && callback()
          } else {
            this.setData({
              listB: listItem.concat(rData),
              selectIndex: selectIndex,
              hasMore: false,
              pageNumber: this.data.pageNumber + 1,
            })
          }
        } 
      },
      fail: () => {
        wx.hideLoading();
      }
    })
  },
  //更多城市
  moreCity: function () {
    wx.navigateTo({
      url: '../city/city',
    })
  },
  //获取热门城市
  getHotcity: function () {
    wx.request({
      url: config.service.hotCity,
      data: {
        level: 2,
        order: 1
      },
      success: res => {
        this.setData({
          selectCityData: res.data.data
        })
      }
    })
  },
  //点击选择城市
  clickCity: function () {
    var selectCity = this.data.selectCity;
    if (selectCity == true) {
      this.setData({
        selectCity: false,
        isMask: true
      })
    } else {
      this.setData({
        selectCity: true,
        isMask: false
      })
    }
  },
  //点击切换城市
  selectCity: function (e) {
    this.setData({
      selectCity: true,
      isMask: false
    })
  },
  toggleCity:function(e){
    this.setData({
      toggleCity: !this.data.toggleCity,
      toggleSchool: !this.data.toggleSchool
    })
  },
  selectCityHandler:function(e){
    let city = e.target.dataset.val
    this.setData({
      locationCity:city,
      toggleCity: !this.data.toggleCity,
      toggleSchool: !this.data.toggleSchool,
      curIndex: e.target.dataset.index
    })
    this.getSchoolData(city);
  },
  //获取学校
  getSchoolData(cityName){
    wx.request({
      url: config.service.preachSchool,
      data:{
        cityName:cityName
      },
      success:res=>{
        this.setData({
          selectSchoolData:res.data.data
        })
      }
    })
  },
  //点击切换学校
  selectSchool: function (e) {
    this.setData({
      selectSchool: true,
      selectCity:true,
      isMask: false,
      pull:true,
      listB: [],
      school: e.target.dataset.val,
      curIndexS: e.target.dataset.index
    })
    this.selSchoolResult()
  },
  selSchoolResult:function(){
    this.getPreach({
      workType:2,
      city:this.data.locationCity,
      school:this.data.school,
      pageNumber:1,
      pageSize:10
    })
  },
  //点击选择时间
  bindDateChange: function (e) {
    let curTime = utils.curTime();
    this.setData({
      date: e.detail.value > curTime ? curTime : e.detail.value,
      selectTime:!this.data.selectTime,
      listB: [],
      selectCity:true,
      isMask: false,
      pageNumber:this.data.pageNumber,
      pullA:true
    })
    this.selTimeResult();
  },
  selTimeResult:function(){
    this.getPreach({
      workType: 2,
      fromXjTime:this.data.date,
      pageNumber: 1,
      pageSize: 10
    })
  },
  
  // 搜索入口
  wxSearchTab: function (e) {
    let types = e.target.dataset.type
    wx.navigateTo({
      url: "../search/search?type=" + types
    })
  },
  //跳转到详情页
  details: function (e) {
    let id = e.currentTarget.dataset.id;
    let types = e.currentTarget.dataset.type;
    wx.navigateTo({
      url: '../stage/stage?id=' + id + '&select=' + this.data.isHas+'&types='+types
    })
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
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
   
  },
  preLoad(){
    this.onLoad()
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let city = wx.getStorageSync('city');
    let keywordB = wx.getStorageSync('preach');
    let searchPreach = wx.getStorageSync('searchPreach');
    let isPreach = app.globalData.isPreach;
    console.log(isPreach)
    this.setData({
      moreCity: city,
      searchKeys: keywordB,
      listB: keywordB ? searchPreach:this.data.listB
    },()=>{
      wx.removeStorageSync('city')
    })
    if (isPreach){
      this.setData({
        pageNumber:1,
        listB:[]
      })
      this.preLoad()
    }
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
    if(this.data.pull){
      this.getPreach({
        workType: 2,
        city: this.data.locationCity,
        school: this.data.school,
        pageNumber: this.data.pageNumber-1,
        pageSize: 10
      }, () => {
        wx.stopPullDownRefresh()
      })
    }else if(this.data.pullA){
      this.getPreach({
        workType: 2,
        fromXjTime:this.data.date,
        pageNumber: this.data.pageNumber - 1,
        pageSize: 10
      }, () => {
        wx.stopPullDownRefresh()
      })
    }else if(!this.data.controlFocus){
      wx.stopPullDownRefresh()
    }else if(this.data.hasMore){
      wx.stopPullDownRefresh()
    }else{
      this.getPreach({
        workType: 2,
        pageNumber: this.data.pageNumber,
        pageSize: 10
      }, () => {
        wx.stopPullDownRefresh()
      })
    }
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.pull) {
      this.getPreach({
        workType: 2,
        city: this.data.locationCity,
        school: this.data.school,
        pageNumber: this.data.pageNumber - 1,
        pageSize: 10
      }, () => {
        wx.stopPullDownRefresh()
      })
    } else if (this.data.pullA) {
      this.getPreach({
        workType: 2,
        fromXjTime: this.data.date,
        pageNumber: this.data.pageNumber - 1,
        pageSize: 10
      }, () => {
        wx.stopPullDownRefresh()
      })
    } else if (!this.data.controlFocus) {
      wx.stopPullDownRefresh()
    } else if (this.data.hasMore) {
      wx.stopPullDownRefresh()
    } else {
      this.getPreach({
        workType: 2,
        pageNumber: this.data.pageNumber,
        pageSize: 10
      }, () => {
        wx.stopPullDownRefresh()
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})