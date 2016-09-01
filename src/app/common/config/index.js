/**
 * Created by Administrator on 2016/8/24.
 */
const Config = require('../../../common/config/index');

Config.debug = true;
let shareImage = require('../../assets/share.png');

Config.requestWXAction = 'http://erpuat.mengbp.com:8090/wine-weixin-rest/cgi';
Config.requestWXActionDebug = 'http://erpuat.mengbp.com:8090/wine-weixin-rest/cgi';
//Config.requestLocalWXAction = 'http://192.168.100.164:8081/wine-weixin-rest/cgi';

Config.upLoadAction = 'http://erpuat.mengbp.com:8090/wine-weixin-rest/cgi/';
Config.upLoadActionDebug = 'http://erpuat.mengbp.com:8090/wine-weixin-rest/';
//Config.upLoadLocalAction = 'http://192.168.100.164:8081/wine-weixin-rest/';

Config.appId = 'wx5bb398c959489ae4';
Config.appIdDebug = 'wx03fc01e909d9a654';

Config.cmds = {
    wxJSSign:'christ/weixin/setSign',
    getCode:'weixin/minAutumn/getCode',
    isValidPhone:'weixin/minAutumn/isValidPhone',/*参数phone 手机号*/
    saveUserInfo:'weixin/minAutumn/saveUserInfo'
}

Config.ratios = {
    cropperRatio : 484/637,
}

Config.errors = {
    imageError:"图片格式错误",
    noImage:"请先选择要上传的图片",
    noBabyName:"请输入宝宝姓名",
    noBabyBirth:"请选择宝宝生日",
    phoneError:"手机号格式错误",
    noUserPhone:"请输入您的手机号",
    noChooseEnjoy:"请选择您要参加的场次",
    noChooseKnow:"请选择得知活动的渠道",
    noCanvas:"没有可上传的图片",
    sure:"确定要取消当前页面吗？"
}

Config.localStorageKeys = {
    MBP_USER_PHONE:'MBP_USER_PHONE'
}

Config.urlParams = {
    fromUserPhone:'fromUserPhone'
}


Config.shareObject = {
    title:"萌宝派中秋送好礼",
    desc:"萌宝派中秋送好礼",
    link:window.location.href.split("#")[0].split("?")[0],
    imgUrl:shareImage,
}

Config.waterMark = "@480w_1o.jpeg%7Cwatermark=1&object=SDUvemhvbmdxaXUyMDE2MDgyNi96aG9uZ3FpdWZvci5wbmdANDgwdw&p=5";

module.exports = Config;
