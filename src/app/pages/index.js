/**
 * Created by Administrator on 2016/8/26.
 */
const React = require('react');
require('normalize.css');
require('../styles/base.css');
require('./index.css');
let mainBg = require('../assets/main_bg.png');
let ruleBg = require('../assets/rule_bg.png');
let lantern = require('../assets/lantern.png');
let stars = require('../assets/stars.png');
const Util = require('../common/util/index');
const Config = require('../common/config/index');
const Request =require('../common/request/index');
const HomePart = require('./home/index');
const RulePart = require('./rule/index');
const PhotoPart = require('./photo/index');
const CardLayer = require('./card/index');
const CropLayer = require('./crop/index');
const ShareLayer = require('./share/index');
const GiftLayer = require('./gift/index');
const InfoLayer = require('./info/index');
const AlertBox = require('./alert/index');
const IndexPage = React.createClass({
  getInitialState:function(){
    return {
      showHome:true,
      showRule:false,
      showPhoto:false,
      showCardLayer:false,
      showCropLayer:false,
      showInfoLayer:false,
      showShareLayer:false,
      showGiftLayer:false,
      bgImageFlag:true,
      showAlert:false,
      alertOptions:{},
      fileOrigin:'',
      fileResult:'',
      isSelf:false,
      hasJoin:false,
      needJoin:true
    }
  },
  changePart:function(type){
    /*
     *  0 ----  home
     *  1 ----  rule
     *  2 ---   photo
     * */
    let state = {};
    switch (type){
      case 0:
        state = {
          showHome:true,
          showRule:false,
          showPhoto:false,
          bgImageFlag:true
        }
        break;
      case 1:
        state = {
          showHome:false,
          showRule:true,
          showPhoto:false,
          bgImageFlag:false,
        }
        break;
      case 2:
        state = {
          showHome:false,
          showRule:false,
          showPhoto:true,
          bgImageFlag:true,
        }
        break;
    }
    this.setState(state);

  },
  changeLayer:function(type){
    /*
     *  0 ----  card
     *  1 ----  photo-crop
     *  2 ----  user_info_join
     * */
    let state = {};
    switch (type){
      case 0:
        state = {
          showCardLayer:true,
          showCropLayer:false,
          showInfoLayer:false,
          showShareLayer:false,
          showGiftLayer:false,
        }
        break;
      case 1:
        /*这里需要根据平台选择 app平台则调用app原生的图片选择和裁剪， 否则使用htmlJS方式
         * app原生通过JSBridge回传裁剪后的图片，显示不需要再裁剪了，直接PhotoPart部分更新显示裁剪后的图片，
         * htmlJS需要调用input file 方式选择图片后 显示裁剪页面，裁剪后PhotoPart部分更新显示裁剪后的图片
         * */
        state = {
          showCardLayer:false,
          showCropLayer:true,
          showInfoLayer:false,
          showShareLayer:false,
          showGiftLayer:false,
        }
        break;
      case 2:
        state = {
          showCardLayer:false,
          showCropLayer:false,
          showInfoLayer:true,
          showShareLayer:false,
          showGiftLayer:false,
        }
        break;
      case 3:
        state = {
          showCardLayer:false,
          showCropLayer:false,
          showInfoLayer:false,
          showShareLayer:true,
          showGiftLayer:false,
        }
        break;
      case 4:
        state = {
          showCardLayer:false,
          showCropLayer:false,
          showInfoLayer:false,
          showShareLayer:false,
          showGiftLayer:true,
        }
        break;
      default:
        state = {
          showCardLayer:false,
          showCropLayer:false,
          showInfoLayer:false,
          showShareLayer:false,
          showGiftLayer:false,
          fileOrigin:'',
        }
        break;
    }
    this.setState(state);
  },
  changeAlert:function(alertOptions){
    const defaultOptions = {
      content:'',
      showAlert:true,
      type:0,
      onAlertSubmit:function(){},
      onAlertCancel:function(){}
    }
    alertOptions = Util.mergeJSONData(alertOptions,defaultOptions);
    this.setState({alertOptions:alertOptions});
  },
  getFileOrigin:function(fileOrigin){
    if(fileOrigin){
      this.setState({fileOrigin:fileOrigin});
      this.setState({showCropLayer:true});
    }

  },
  getFileCrop:function(canvas){
    this.setState({fileResult:canvas});
  },
  changeSubmitResult:function(obj){
    //判断提交后结果 提交成功或者已经参加过了
    this.setState({
      hasJoin:true,
      fileResult:obj.photoPath+'@414w',
      isSelf:true,
      needJoin:false,
    });
    //创建分享的内容
    if(Util.isWX()){
      const shareObject = {
        title:Config.shareObject.title,
        desc:Config.shareObject.desc,
        link:Config.shareObject.link + "?" + Config.urlParams.fromUserPhone + "=" + obj.phone,
        imgUrl:obj.photoPath + Config.waterMark
      }
      Util.shareItems(shareObject)
    }
  },
  setWXSign:function(shareObject){
    if(Util.isWX()){
      Request.cmd = Config.cmds.wxJSSign;
      Request.parameters = {
        'url':window.location.href.split('#')[0]
      }
      const wxOptions = {
        url:Config.getRequestWXAction(),
        data:Request,
        appId:Config.getAppId(),
        debug:false,
        wxReady:function(){
          Util.shareItems(shareObject)
        }
      }
      Util.setJSSign(wxOptions);
    }
  },
  getUserInfo:function(){
    const localStorageUserPhone = Util.getLocalStorage(Config.localStorageKeys.MBP_USER_PHONE);
    const fromUserPhone = Util.queryUrlParams(Config.urlParams.fromUserPhone);
    Request.cmd = Config.cmds.isValidPhone;
    let options = {};
    if(localStorageUserPhone){
      //存在本地
      if(fromUserPhone){
        Request.parameters = {
          'phone':fromUserPhone
        }
        //存在分享
        //比较localStorageUserPhone fromUserPhone是否是同一个人
        //如果不是同一个人查询fromUserPhone isSelf---false  hasJoin --- true
        //如果是同一个人查询fromUserPhone  isSelf---true  hasJoin --- true
        if(localStorageUserPhone === fromUserPhone){
          options = {
            url:Config.getRequestWXAction(),
            data:Request,
            success:function(result){
              const obj = result.response.obj;
              let shareObject = {};
              if(obj){
                const state = {
                  hasJoin : true,
                  isSelf : true,
                  needJoin:false,
                  showHome:false,
                  showPhoto:true,
                  fileResult:obj.photoPath+'@414w',
                }
                this.setState(state);
                shareObject = {
                  title:Config.shareObject.title,
                  desc:Config.shareObject.desc,
                  link:Config.shareObject.link + "?" + Config.urlParams.fromUserPhone + "=" + obj.phone,
                  imgUrl:obj.photoPath + Config.waterMark
                }
              }
              else{
                Util.clearLocalStorage(Config.localStorageKeys.MBP_USER_PHONE);
                shareObject = Config.shareObject;
              }
              this.setWXSign(shareObject)
            }.bind(this)
          }
        }
        else{
          options = {
            url:Config.getRequestWXAction(),
            data:Request,
            success:function(result){
              const obj = result.response.obj;
              if(obj){
                const state = {
                  hasJoin : true,
                  isSelf : false,
                  needJoin : false,
                  showHome:false,
                  showPhoto:true,
                  fileResult:obj.photoPath+'@414w',
                }
                this.setState(state);
              }
              const shareObject = Config.shareObject;
              this.setWXSign(shareObject)
            }.bind(this)
          }
        }
        Util.getResponseFromJSON(options);
      }
      else{
        //不存在分享
        //查询localStorageUserPhone 同时
        //判断如果没有完成 则hasJoin --- false
        //否则 hanJoin---true
        Request.parameters = {
          'phone':localStorageUserPhone
        }
        options = {
          url:Config.getRequestWXAction(),
          data:Request,
          success:function(result){
            const obj = result.response.obj;
            let shareObject = {};
            if(obj){
              const state = {
                hasJoin : true,
                isSelf : true,
                needJoin : false,
                showHome:false,
                showPhoto:true,
                fileResult:obj.photoPath+'@414w',
              }
              this.setState(state);
              shareObject = {
                title:Config.shareObject.title,
                desc:Config.shareObject.desc,
                link:Config.shareObject.link + "?" + Config.urlParams.fromUserPhone + "=" + obj.phone,
                imgUrl:obj.photoPath + Config.waterMark
              }
            }
            else{
              Util.clearLocalStorage(Config.localStorageKeys.MBP_USER_PHONE);
              shareObject = Config.shareObject;
            }
            this.setWXSign(shareObject)
          }.bind(this)
        }
        Util.getResponseFromJSON(options);
      }
    }
    else{
      //本地不存在
      if(fromUserPhone){
        //存在分享
        //查询fromUserPhone 同时
        //判断如果没有完成 则hasJoin --- false
        //否则 hanJoin---true
        Request.parameters = {
          'phone':fromUserPhone
        }
        options = {
          url:Config.getRequestWXAction(),
          data:Request,
          success:function(result){
            console.log(result.response);
            const obj = result.response.obj;
            if(obj){
              const state = {
                hasJoin : true,
                isSelf : false,
                needJoin:false,
                showHome:false,
                showPhoto:true,
                fileResult:obj.photoPath+'@414w',
              }
              this.setState(state);
            }
            const shareObject = Config.shareObject;
            this.setWXSign(shareObject)
          }.bind(this)
        }
        Util.getResponseFromJSON(options);
      }
      else{
        //不存在分享
        const shareObject = Config.shareObject;
        this.setWXSign(shareObject)
      }
    }
  },
  componentDidMount:function(){
    this.getUserInfo();
  },
  render:function(){
    return (
      <div className="main_box" style={this.state.bgImageFlag?{backgroundColor:'#FCF59B'}:{backgroundColor:'#FFFFFF'}}>
        <div className="background_box">
          <img src={this.state.bgImageFlag?mainBg:ruleBg} className="img_auto_height"/>
          <img src={lantern} className="img_auto_height img_lantern"/>
          <img src={stars} className="img_auto_height img_stars"/>
          <HomePart isShow={this.state.showHome}
                    changeLayer={this.changeLayer}/>
          <RulePart isShow={this.state.showRule}
                    changePart={this.changePart}/>
          <PhotoPart isShow={this.state.showPhoto}
                     hasJoin = {this.state.hasJoin}
                     needJoin = {this.state.needJoin}
                     isSelf = {this.state.isSelf}
                     fileResult={this.state.fileResult}
                     changePart={this.changePart}
                     changeLayer={this.changeLayer}
                     getFileOrigin={this.getFileOrigin}
                     changeAlert={this.changeAlert}/>
          <CardLayer isShow={this.state.showCardLayer}
                     changePart={this.changePart}
                     changeLayer={this.changeLayer}/>
          <CropLayer isShow={this.state.showCropLayer}
                     fileOrigin={this.state.fileOrigin}
                     changeLayer={this.changeLayer}
                     getFileCrop={this.getFileCrop}/>
          <InfoLayer isShow={this.state.showInfoLayer}
                     fileResult={this.state.fileResult}
                     changeLayer={this.changeLayer}
                     changeAlert={this.changeAlert}
                     changeSubmitResult = {this.changeSubmitResult}/>
          <ShareLayer isShow={this.state.showShareLayer}
                      changeLayer={this.changeLayer}/>
          <GiftLayer isShow={this.state.showGiftLayer}
                     changeLayer={this.changeLayer}/>
          <AlertBox alertOptions={this.state.alertOptions}
                    changeAlert = {this.changeAlert}/>
        </div>
      </div>
    )
  }
});
module.exports = IndexPage;
