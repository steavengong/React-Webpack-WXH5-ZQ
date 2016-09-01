/**
 * Created by Administrator on 2016/8/29.
 */
const React = require('react');
require('./index.css');
let title = require('../../assets/title.png');
let content = require('../../assets/content.png');
let magazine = require('../../assets/magazine.png');
let clickText = require('../../assets/click_text.png');
let clickFinger = require('../../assets/click_finger.png');
let rabbit = require('../../assets/rabbit.gif');
const HomePart = React.createClass({
    changeLayer:function(){
        this.props.changeLayer(0);
    },
    render:function(){
        return (
            <div className={this.props.isShow?'page_part home_part':'page_part home_part hidden'}>
                <img src={title} className="img_auto_height img_title"/>
                <img src={content} className="img_auto_height img_content"/>
                <img src={magazine} className="img_auto_height img_magazine" onClick={this.changeLayer}/>
                <div className="click_group">
                    <img src={clickText} className="img_auto_height"/>
                    <img src={clickFinger} className="img_auto_height img_click_finger"/>
                </div>
                <img src={rabbit} className="img_auto_height img_rabbit"/>
            </div>
        )
    }
});
module.exports = HomePart;
