/**
 * Created by Administrator on 2016/8/31.
 */
const React = require('react');
require('./index.css');
let lantern = require('../../assets/share_lantern.png');
let moon = require('../../assets/share_moon.png');
let rabbit = require('../../assets/share_rabbit.gif');
const ShareLayer = React.createClass({
    closeLayer:function(){
        this.props.changeLayer();
    },
    render:function(){
        return (
            <div className={this.props.isShow?"layer_part share_part":"layer_part share_part hidden"}
                 onClick={this.closeLayer}>
                <img src={lantern} className="img_auto_height img_share_lantern"/>
                <img src={moon} className="img_auto_height img_share_moon"/>
                <img src={rabbit} className="img_auto_height img_share_rabbit"/>
            </div>
        )
    }
});
module.exports = ShareLayer;
