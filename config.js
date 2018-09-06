/**
 * 请求接口配置文件
 */
//请求的api服务器域名
let host = "https://feiyujob.com";

let config = {
  service:{
    host,
    //基础信息api
    getAllProvince: `${host}/api/base/getAllProvince`,
    hotCity: `${host}/api/base/getCitysByOrder`,
    //用户相关api
    login:`${host}/api/user/login`,
    register: `${host}/api/user/register`,
    checkUserName: `${host}/api/user/checkUserName`,
    checkEmail:`${host}/api/user/checkEmail`,
    userInfo: `${host}/api/user/getUserInfo`,
    updateUser: `${host}/api/user/updateUser`,

    //简历相关api
    deleteResume: `${host}/api/resume/deleteResumeType`,
    schoolWorks: `${host}/api/resume/modifySchoolWorks`,
    getSchoolWorks: `${host}/api/resume/getSchoolWorks`,
    modifyIntent: `${host}/api/resume/modifyResumeIntent`,
    getIntent: `${host}/api/resume/getResumeIntent`,
    modifySkills: `${host}/api/resume/modifySkills`,
    getSkills: `${host}/api/resume/getSkillInfos`,
    userEducation: `${host}/api/resume/modifyUserEdus`,
    getEduInfos: `${host}/api//resume/getUserEduInfos`,
    practices: `${host}/api/resume/modifyPractices`,
    getPractices: `${host}/api/resume/getPractices`,
    awards: `${host}/api/resume/modifyAwards`,
    getAwards: `${host}/api/resume/getAwards`,
    attachs: `${host}/api/resume/modifyAttachs`,
    getAttachs: `${host}/api/resume/getAttachs`,
    score: `${host}/api/resume/getResumeScore`,
    Allresume: `${host}/api/resume/getResume`,

    //收藏搜索相关api
    searchUrl:`${host}/api/wx/search`,
    collect: `${host}/api/recruit/collectRecruit`,
    cancel: `${host}/api/recruit/cancelRecruit`,
    allcollect: `${host}/api/recruit/getRecruitByUserId`,
    focused: `${host}/api/recruit/getCollectRecruitByParams`,
    recruitsCity: `${host}/api/index/getInfoByWorkCityTypePubRange`,
    preachCity: `${host}/api/index/getInfoByWorkCityTypeXjTimeRange`,
    preachSchool: `${host}/api/base/getSchoolByParams`,

    //详情页
    details: `${host}/api/recruit/getRecruitDetail`,

    //猜你喜欢相关api
    guessLike: `${host}/api/wx/like`,
    //搜索筛选
    searchParamsUrl: `${host}/api/wx/getInfoByParams`,
    //获取城市
    getCityUrl: `${host}/api/base/getCityByIp`,
    //获取省份
    getCountryUrl: `${host}/api/base/getAllProvince`,
    //获取学校信息
    getSchoolUrl: `${host}/api/base/getSchoolByParams`,
    //用户收藏
    
  }
}
module.exports=config;