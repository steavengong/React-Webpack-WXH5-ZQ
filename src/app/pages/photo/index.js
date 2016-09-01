/**
 * Created by Administrator on 2016/8/29.
 */
const React = require('react');
require('./index.css');
const Config = require('../../common/config/index');
const Util = require('../../common/util/index');
let photoBorder = require('../../assets/photo_border.png');
let choosePhoto = require('../../assets/choose_photo.png')
let chooseOk = require('../../assets/choose_ok.png');
let enjoy = require('../../assets/enjoy.png');
let enjoyGift = require('../../assets/enjoy_gift.png');
let invite = require('../../assets/invite_friend.png');
let rule = require('../../assets/rule.png');
const PhotoPart = React.createClass({
    showLocalPhotoCropLayer:function(event){
        const files = event.target.files;
        if(files.length > 0){
            const file  = files[0];
            if(!Config.regs.image.test(file.type)){
                this.props.changeAlert({
                    content:Config.errors.imageError,
                });
                return;
            }
            this.props.getFileOrigin(file);
        }
        event.target.value = '';
    },
    showAppPhotoCropLayer:function(){
        console.log("heheefa")
    },
    showUserInfoJoinLayer:function(){
        if(this.props.fileResult){
            this.props.changeLayer(2);
        }
        else{
            this.props.changeAlert({
                content:Config.errors.noImage
            });
        }
    },
    showShareLayer:function(){
        /*这里需要通过JSBridge确认是否需要调用app分享方式*/
        if(Util.JSBridge){

        }
        else{
            this.props.changeLayer(3);
        }
    },
    showGiftLayer:function(){
        this.props.changeLayer(4);
    },
    redirect:function(){
        window.location.href = Config.shareObject.link;
    },
    showRulePart:function(){
      this.props.changePart(1);
    },
    render:function(){
        return (
            <div className={this.props.isShow?'page_part photo_part':'page_part photo_part hidden'}>
                <div className="photo_group">
                    <img src={this.props.fileResult?((typeof (this.props.fileResult) === 'object')? this.props.fileResult.toDataURL():this.props.fileResult):''} className="img_auto_height img_photo_result"/>
                    <img src={photoBorder} className="img_auto_height img_photo_border"/>
                </div>
                <div className={this.props.needJoin?"choose_photo":"choose_photo hidden"}>
                    <img src={choosePhoto} className="img_auto_height" onClick={this.showAppPhotoCropLayer}/>
                    {/*input type="file" className需要根据JSBridge 回传的值做判断*/}
                    <input type="file" className={Util.JSBridge?"input_photo_file hidden":"input_photo_file"} accept="image/*" onChange={this.showLocalPhotoCropLayer}/>
                </div>
                <img src={chooseOk}
                     className={this.props.needJoin?"img_auto_height img_choose_ok":"img_auto_height img_choose_ok hidden"}
                     onClick={this.showUserInfoJoinLayer}/>
                <img src={invite}
                     className={this.props.needJoin||!(this.props.hasJoin&&this.props.isSelf)?"img_auto_height img_invite_friend hidden":"img_auto_height img_invite_friend"}
                     onClick={this.showShareLayer}/>
                <img src={enjoyGift}
                     className={this.props.needJoin||!(this.props.hasJoin&&this.props.isSelf)?"img_auto_height img_enjoy_gift hidden":"img_auto_height img_enjoy_gift"}
                     onClick={this.showGiftLayer}/>
                <img src={enjoy} className={this.props.needJoin||(this.props.hasJoin&&this.props.isSelf)?"img_auto_height img_enjoy hidden":"img_auto_height img_enjoy"}
                     onClick={this.redirect}/>
                <img src={rule} className={this.props.needJoin||(this.props.hasJoin&&this.props.isSelf)?"img_auto_height img_rule hidden":"img_auto_height img_rule"}
                     onClick={this.showRulePart}/>
            </div>
        )
    }
});
module.exports = PhotoPart;
