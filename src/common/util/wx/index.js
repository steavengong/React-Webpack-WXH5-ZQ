/**
 * Created by Administrator on 2016/8/24.
 */
const UWX = require('../../util/index');
const wx = require('weixin-js-sdk');
UWX.setJSSign = function(wxOptions){
    var self = this;
    const options = {
        url:wxOptions.url,
        data:wxOptions.data,
        success:function(result){
            var response = result.response;
            if(response && wx){
                wx.config({
                    debug : wxOptions.debug, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId : wxOptions.appId, // 必填，公众号的唯一标识
                    timestamp : response.timestamp, // 必填，生成签名的时间戳
                    nonceStr : response.nonceStr, // 必填，生成签名的随机串
                    signature :response.signature,// 必填，签名，见附录1
                    jsApiList : wxOptions.jsApiList||[ "onMenuShareTimeline",
                        "onMenuShareAppMessage", "onMenuShareQQ",
                        "onMenuShareWeibo","showMenuItems","hideMenuItems"]
                    // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                });
                wx.ready(function() {
                    //判断当前客户端版本是否支持指定JS接口
                    wx.checkJsApi({
                        jsApiList : wxOptions.jsApiList||[ "onMenuShareTimeline",
                            "onMenuShareAppMessage",
                            "onMenuShareQQ", "onMenuShareWeibo","showMenuItems","hideMenuItems"]
                    });
                    wxOptions.wxReady();
                });

                wx.error(function() {
                });
            }
        }
    }
    self.getResponseFromJSON(options);
}
UWX.shareItems = function(shareObject){
    if(wx){
        this.onMenuShareTimeline(shareObject);
        this.onMenuShareAppMessage(shareObject);
        this.onMenuShareQQ(shareObject);
        this.onMenuShareWeibo(shareObject);
    }
}
UWX.onMenuShareTimeline = function(shareObject){//获取“分享到朋友圈”按钮点击状态及自定义分享内容接口
    if(wx){
        wx.onMenuShareTimeline({
            title : shareObject.title, // 分享标题
            link : shareObject.link, // 分享链接
            imgUrl : shareObject.imgUrl, // 分享图标
            success: shareObject.success,
            cancel: shareObject.cancel
        });
    }
}
UWX.onMenuShareAppMessage = function(shareObject) { //获取“分享给朋友”按钮点击状态及自定义分享内容接口
    if(wx){
        wx.onMenuShareAppMessage({
            title : shareObject.title, // 分享标题
            desc : shareObject.desc, // 分享描述
            link : shareObject.link, // 分享链接
            imgUrl : shareObject.imgUrl, // 分享图标
            success: shareObject.success,
            cancel: shareObject.cancel
        });
    }
}
UWX.onMenuShareQQ = function(shareObject) { //获取“分享到QQ好友”按钮点击状态及自定义分享内容接口
    if(wx){
        wx.onMenuShareQQ({
            title : shareObject.title, // 分享标题
            desc : shareObject.desc, // 分享描述
            link : shareObject.link, // 分享链接
            imgUrl : shareObject.imgUrl, // 分享图标
            success: shareObject.success,
            cancel: shareObject.cancel
        });
    }
}
UWX.onMenuShareWeibo = function(shareObject){ //获取“分享到腾讯微博”按钮点击状态及自定义分享内容接口
    if(wx){
        wx.onMenuShareWeibo({
            title : shareObject.title, // 分享标题
            desc : shareObject.desc, // 分享描述
            link : shareObject.link, // 分享链接
            imgUrl : shareObject.imgUrl, // 分享图标
            success: shareObject.success,
            cancel: shareObject.cancel
        });
    }
}

module.exports = UWX;