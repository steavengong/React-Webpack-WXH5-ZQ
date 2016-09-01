/**
 * Created by Administrator on 2016/8/29.
 */
const React = require('react');
const Util = require('../../common/util/index');
const Config = require('../../common/config/index');
const Request = require('../../common/request/index');
require('./index.css');
let close = require('../../assets/close.png');
let infoBg = require('../../assets/info_bg.png');
let submit = require('../../assets/submit.png');
const InfoLayer = React.createClass({
    getInitialState:function(){
        return {
            selects:[],
            selectEnjoys:[],
            selectKnows:[],
            selectedEnjoyCode:'-1',
            selectedEnjoyText:'请选择',
            selectedKnowCode:'-1',
            selectedKnowText:'请选择',
            selectDate:Util.formatTime(new Date())
        }
    },
    resetState:function(){
        const state = {
            selectedEnjoyCode:'-1',
            selectedEnjoyText:'请选择',
            selectedKnowCode:'-1',
            selectedKnowText:'请选择',
            selectDate:Util.formatTime(new Date())
        }
        this.refs.babyName.value = '';
        this.refs.userPhone.value = '';
        this.refs.selectEnjoy.value = '-1'
        this.refs.selectKnow.value = '-1'
        this.setState(state);
    },
    closeLayer:function(){
        this.props.changeAlert({
            content:Config.errors.sure,
            type:2,
            showAlert:true,
            onAlertSubmit:function(){
                this.props.changeLayer();
                this.resetState();
            }.bind(this)
        })

    },
    changeSubmitResult:function(data){
        this.props.changeSubmitResult(data);
    },
    submit:function(){
        const babyName = this.refs.babyName.value;
        if(!babyName){
            this.props.changeAlert({
                content:Config.errors.noBabyName
            });
            return;
        }

        const babyBirth = this.state.selectDate;
        if(!babyBirth){
            this.props.changeAlert({
                content:Config.errors.noBabyBirth
            });
            return;
        }

        const userPhone = this.refs.userPhone.value;
        if(!userPhone){
            this.props.changeAlert({
                content:Config.errors.noUserPhone
            });
            return;
        }

        if (!Config.regs.phone.test(userPhone)){
            this.props.changeAlert({
                content:Config.errors.phoneError
            });
            return
        }

        const selectedEnjoyCode = this.state.selectedEnjoyCode;
        if(parseInt(selectedEnjoyCode)<0){
            this.props.changeAlert({
                content:Config.errors.noChooseEnjoy
            });
            return ;
        }

        const selectedKnowCode = this.state.selectedKnowCode;
        if(parseInt(selectedKnowCode)<0){
            this.props.changeAlert({
                content:Config.errors.noChooseKnow
            });
            return ;
        }

        const canvas = this.props.fileResult
        if(!canvas){
            this.props.changeAlert({
                content:Config.errors.noCanvas
            });
            return ;
        }
        const fileBlob = Util.dataURLtoBlob(canvas.toDataURL())
        const userInfo = {
            userPhone:userPhone,
            babyName:babyName,
            babyBirth:babyBirth,
            selectedEnjoyCode:selectedEnjoyCode,
            selectedKnowCode:selectedKnowCode,
            fileBlob:fileBlob
        }

        this.props.changeAlert({
            content:"确认信息<br/>" +
            "宝宝姓名:   " + babyName + "<br/>" +
            "宝宝生日:   " + babyBirth + "<br/>" +
            "手机号:   " + userPhone + "<br/>" +
            "选择场次:   " + this.state.selectedEnjoyText + "<br/>" +
            "得知渠道:   " + this.state.selectedKnowText,
            type:1,
            showAlert:true,
            onAlertSubmit:function(){
                this.saveUserInfo(userInfo);
            }.bind(this)
        })


    },
    saveUserInfo:function(userInfo){
        const formData = Util.FormData;
        formData.append('phone',userInfo.userPhone);
        formData.append('babyName',userInfo.babyName);
        formData.append('babyBrithday',userInfo.babyBirth);
        formData.append('sceneNumber',userInfo.selectedEnjoyCode);
        formData.append('activeChannels',userInfo.selectedKnowCode);
        formData.append('image ',userInfo.fileBlob);
        const options = {
            url : Config.getUpLoadAction()+Config.cmds.saveUserInfo,
            formData : formData,
            success:function(result){
                this.props.changeAlert({
                    content:result.msg,
                    onAlertSubmit:function(){
                        Util.setLocalStorage(Config.localStorageKeys.MBP_USER_PHONE,result.obj.phone);
                        this.resetState();
                        this.props.changeLayer();
                        this.changeSubmitResult(result.obj);
                    }.bind(this)
                })
            }.bind(this)
        }
        Util.getResponseFromFormData(options);
    },
    initSelectData:function(){
        Request.cmd = Config.cmds.getCode;
        const options = {
            url:Config.getRequestWXAction(),
            data:Request,
            success:function(result){
                this.setState({selects:result.response});
                this.parseSelectData(result.response);
            }.bind(this)
        }
        Util.getResponseFromJSON(options);

    },
    parseSelectData:function(results){
        const selectEnjoys = [];
        const selectKnows = [];
        results.forEach(function(result){
            switch (result.codeType){
                case 'field':
                    selectEnjoys.push(result);
                    break;
                case 'activity':
                    selectKnows.push(result);
                    break;
            }
        });
        this.setState({selectEnjoys:selectEnjoys,selectKnows:selectKnows});
    },
    initSelectComponents:function(selects){
        const options = [];
        if(selects){
            selects.forEach(function(select){
                options.push(<option value={select.code} key={select.code}>{select.codeName}</option>)
            }.bind(this))
        }
        return options;
    },
    componentDidMount:function(){
        this.initSelectData();
    },
    onChangeSelectEnjoy:function(){
        const code = this.refs.selectEnjoy.value;
        this.setState({selectedEnjoyCode:code});
        if(code === '-1'){
            this.setState({selectedEnjoyText:'请选择'});
        }
        else{
            if(this.state.selectEnjoys){
                this.state.selectEnjoys.forEach(function(select){
                    if(select.code === code){
                        this.setState({selectedEnjoyText:select.codeName});
                    }
                }.bind(this))
            }
        }

    },
    onChangeSelectKnow:function(){
        const code = this.refs.selectKnow.value;
        this.setState({selectedKnowCode:code});
        if(code === '-1'){
            this.setState({selectedKnowText:'请选择'});
        }
        else{
            if(this.state.selectKnows){
                this.state.selectKnows.forEach(function(select){
                    if(select.code === code){
                        this.setState({selectedKnowText:select.codeName});
                    }
                }.bind(this))
            }
        }
    },
    onChangeSelectDate:function(){
        const selectDate = this.refs.babyBirth.value;
        this.setState({selectDate:Util.formatTime(selectDate)});
    },
    render:function(){
        return (
            <div className={this.props.isShow?"layer_part info_layer":"layer_part info_layer hidden"}>
                <img src={close} className="img_auto_height img_close" onClick={this.closeLayer}/>
                <div className="info_body color_blue">
                    <img src={infoBg} className="img_auto_height img_info_bg"/>
                    <div className="info_title">填写信息</div>
                    <div className="info_item_group">
                        <div className="info_item">
                            <div className="item_title">宝宝姓名</div>
                            <div className="item_put">
                                <div className="put_group">
                                    <input type="text" ref="babyName" maxLength="10"/>
                                </div>
                            </div>
                        </div>
                        <div className="info_item">
                            <div className="item_title">宝宝生日</div>
                            <div className="item_put">
                                <div className="put_group">
                                    <div className="select_text">{this.state.selectDate}</div>
                                    <input type="date" ref="babyBirth" onChange={this.onChangeSelectDate}/>
                                </div>
                            </div>
                        </div>
                        <div className="info_item">
                            <div className="item_title">联系电话</div>
                            <div className="item_put">
                                <div className="put_group">
                                    <input type="tel" ref="userPhone" maxLength="11"/>
                                </div>
                            </div>
                        </div>
                        <div className="info_item">
                            <div className="item_title">参加场次</div>
                            <div className="item_put">
                                <div className="put_group">
                                    <div className="select_text">{this.state.selectedEnjoyText}</div>
                                    <select ref="selectEnjoy" onChange={this.onChangeSelectEnjoy}>
                                        <option value="-1">请选择</option>
                                        {this.initSelectComponents(this.state.selectEnjoys)}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="info_item">
                            <div className="item_title">得知活动渠道</div>
                            <div className="item_put">
                                <div className="put_group">
                                    <div className="select_text">{this.state.selectedKnowText}</div>
                                    <select ref="selectKnow" onChange={this.onChangeSelectKnow}>
                                        <option value="-1">请选择</option>
                                        {this.initSelectComponents(this.state.selectKnows)}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <img src={submit} className="img_auto_height img_submit" onClick={this.submit}/>
                </div>
            </div>
        )
    }
});
module.exports = InfoLayer;
