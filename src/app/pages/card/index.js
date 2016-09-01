/**
 * Created by Administrator on 2016/8/31.
 */
const React = require('react');
require('./index.css');
let close = require('../../assets/close.png');
let cardBg = require('../../assets/card_bg.png');
let rule = require('../../assets/card_rule.png');
let start = require('../../assets/card_start.png');
const CardLayer = React.createClass({
    closeLayer:function(){
        this.props.changeLayer();
    },
    showPhotoPart:function(){
        this.closeLayer();
        this.props.changePart(2)
    },
    showRulePart:function(){
        this.closeLayer();
        this.props.changePart(1)
    },
    render:function(){
        return (
            <div className={this.props.isShow?"layer_part card_layer":"layer_part card_layer hidden"}>
                <img src={close} className="img_auto_height img_close" onClick={this.closeLayer}/>
                <img src={cardBg} className="img_auto_height img_card_bg"/>
                <img src={start} className="img_auto_height img_card_start" onClick={this.showPhotoPart}/>
                <img src={rule} className="img_auto_height img_card_rule" onClick={this.showRulePart}/>
            </div>
        )
    }
});
module.exports = CardLayer;
