/**
 * Created by Administrator on 2016/8/30.
 */
const React = require('react');
require('./index.css');
const AlertBox = React.createClass({
    onSubmit:function(){
        this.changeAlert();
        this.props.alertOptions.onAlertSubmit();
    },
    onCancel:function(){
        this.changeAlert();
        this.props.alertOptions.onAlertCancel();
    },
    changeAlert:function(){
        this.props.changeAlert({
            showAlert:false
        })
    },
    render:function(){
        return (
            <div className={this.props.alertOptions.showAlert?'alert_box':'alert_box hidden'}>
                <div className={this.props.alertOptions.type==1?"alert_body alert_body_info":"alert_body"}>
                    <div className="alert_content" dangerouslySetInnerHTML = {{__html:this.props.alertOptions.content}}>
                    </div>
                    <span className={this.props.alertOptions.type?"alert_cancel":"alert_cancel hidden"} onClick={this.onCancel}>取消</span>
                    <span className="alert_ok" onClick={this.onSubmit}>确定</span>
                </div>
            </div>
        )
    }
});
module.exports = AlertBox;
