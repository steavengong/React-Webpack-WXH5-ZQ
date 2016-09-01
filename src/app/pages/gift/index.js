/**
 * Created by Administrator on 2016/8/31.
 */
const React = require('react');
require('./index.css');
const close = require('../../assets/close.png');
let giftBg = require('../../assets/gift_bg.png');
const GiftLayer = React.createClass({
    closeLayer:function(){
        this.props.changeLayer();
    },
    render:function(){
        return (
            <div className={this.props.isShow?"layer_part gift_layer":"layer_part gift_layer hidden"}>
                <img src={close} className='img_auto_height img_close'onClick={this.closeLayer}/>
                <img src={giftBg} className="img_auto_height img_gift_bg"/>
            </div>
        )
    }
});
module.exports = GiftLayer;
