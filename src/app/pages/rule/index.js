/**
 * Created by Administrator on 2016/8/29.
 */
const React = require('react');
require('./index.css');
let magazine = require('../../assets/rule_magazine.png');
let pillow = require('../../assets/rule_pillow.png');
let bag = require('../../assets/rule_bag.png');
let down = require('../../assets/down.png');
let start = require('../../assets/start.png');
const RulePart = React.createClass({
    changePart:function(){
        this.props.changePart(2);
    },
    render:function(){
        return (
            <div className={this.props.isShow?'page_part rule_part':'page_part rule_part hidden'}>
                <div className="rule_title color_blue">活动详情</div>
                <div className="rule_content color_blue">
                    中秋星宝贝，全家总动员<br/>
                    与萌宝派一起闹中秋<br/>
                </div>
                <div className="rule_body">
                    <div className="rule_body_part color_blue">
                        中秋追月节，全家总动员，今年的中秋佳节你准备带着宝宝上哪玩呢？<br/>
                        9月15、16日，萌宝派与优衣库邀你线上线下狂欢一起嗨！<br/>
                        模特宝宝见面会、绘画涂鸦创意秀、益智亲子玩乐区……<br/>
                        现场更有《聪明宝宝》封面墙可直接拍摄封面照，竞选封面小模特，参与优衣库大片拍摄！<br/>
                        辣么赞的假日活动怎能错过？<br/>
                        COME ON BABY<br/>
                    </div>
                    <div className="rule_body_part color_blue">
                        <div className="rule_body_part color_blue">
                            参与方式：<br/>
                            Round 1<br/>
                            9月X日-9月16日<br/>
                            1.在萌宝派APP或萌宝派微信号中找到“中秋星宝贝，全家总动员”活动帖，进入活动页面。<br/>
                            2.上传宝宝照片，并填写参赛报名信息，即可参与线上封面宝宝评选。<br/>
                            3.将制作完成的宝宝封面照分享给好友，增加宝宝入选机会哦！<br/>
                        </div>
                        <div className="rule_body_part color_red">
                            <div className="color_blue">Round 2</div>
                            时间：2016年9月15、16日  10:30~16:00<br/>
                            地点：宝乐汇生活时尚中心（上海宝山区牡丹江路1569号）<br/>
                            报名方式：<br/>
                            A：页面报名：制作线上封面照，填写参赛信息时勾选参与线下活动，即可报名。<br/>
                            B：微信报名：关注萌宝派微信服务号（mengbaopai），直接留言“报名+姓名+孕周数+联系方式”<br/>
                            C：萌宝派APP：各大应用商城搜索“萌宝派”，下载APP——APP中搜索“中秋星宝贝，全家总动员”
                            报名页面——直接报名，活动现场由工作人员完成验证即可获得额外礼品。<br/>
                        </div>
                    </div>
                    <div className="rule_body_part color_blue">
                        在现场，领取“星宝”成就卡，开启星路旅程——<br/>
                        ★舞台亲子律动操<br/>
                        早教老师带领家长与宝宝一起参与韵律游戏、健康体操，为接下来的“星路之旅”做好热身！<br/>
                        ★益智亲子玩乐区<br/>
                        缤纷益智玩具一起玩，让明星宝宝萌第一次展露社交技巧吧！分享玩具、分工合作，超腻害！<br/>
                        ★绘画涂鸦创意秀<br/>
                        天马行空任发挥，用多彩的画笔放飞宝宝想象吧！为粑粑麻麻画上贴纸卡通像，贴在衣服上还能参加亲子秀呢。<br/>
                        ★封面宝宝大角逐<br/>
                        活动期间可在优衣库门店内任意挑选服饰换装参加亲子装走秀；也可将宝宝创作的贴纸贴在优衣库的白T上进行创意DIY亲子装走秀；
                        在《聪明宝宝》杂志封面墙拍摄摄封面照片，宝宝就有机会登上《聪明宝宝》杂志封面，或拍摄优衣库亲子服饰大片！<br/>
                        <img src={magazine} className="img_auto_height img_gift"/>
                    </div>
                    <div className="rule_body_part color_blue">
                        颁奖礼<br/>
                        1.	亲子走秀后，参与家庭将接受现场观众投票评选，角逐各项大奖。<br/>
                        2.	现场揭晓“封面小明星”，并与《聪明宝宝》签约小模特，更有机会参与优衣库大片拍摄！<br/>
                        精彩大礼抢先看：
                        <img src={bag} className="img_auto_height img_gift"/>
                        <div className="text-gift">优衣库帆布购物袋</div>
                        <img src={pillow} className="img_auto_height img_gift"/>
                        <div className="text-gift">优衣库logo抱枕</div>
                        <br/>
                        还有超多神秘礼品尚未曝光<br/>
                        想要探寻更多活动详情，记得持续关注萌宝派最新爆料哦！<br/>
                    </div>
                </div>
                <img src={down} className="img_auto_height img_down"/>
                <img src={start} className="img_auto_height img_start" onClick={this.changePart}/>
            </div>
        )
    }
});
module.exports = RulePart;
