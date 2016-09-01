/**
 * Created by Administrator on 2016/8/24.
 */
const Config = {}

Config.debug = true;
Config.requestAction = '';
Config.requestActionDebug = '';
Config.requestLocalAction = '';
Config.getRequestAction = function(){
    if(this.debug){
        if(this.requestLocalAction){
            return this.requestLocalAction;
        }
        return this.requestActionDebug;
    }
    return this.requestAction;
}
Config.requestWXAction = '';
Config.requestWXActionDebug = '';
Config.requestLocalWXAction = '';
Config.getRequestWXAction = function(){
    if(this.debug){
        if(this.requestLocalWXAction){
            return this.requestLocalWXAction;
        }
        return this.requestWXActionDebug;
    }
    return this.requestWXAction;
}
Config.upLoadAction = '';
Config.upLoadActionDebug = '';
Config.upLoadLocalAction = '';
Config.getUpLoadAction = function(){
    if(this.debug){
        if(this.upLoadLocalAction){
            return this.upLoadLocalAction;
        }
        return this.upLoadActionDebug;
    }
    return this.upLoadAction;
}

Config.appId = '';
Config.appIdDebug = '';
Config.getAppId = function(){
    if(this.debug){
        return this.appIdDebug;
    }
    return this.appId;
}

Config.regs = {
    image: /image\/\w+/,
    phone: /^(13\d{9})|(147\d{8})|(15[02356789]\d{8})|(17[08]\d{8})|(18[012356789]\d{8})$/,
}

module.exports = Config;