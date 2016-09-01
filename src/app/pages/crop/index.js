/**
 * Created by Administrator on 2016/8/30.
 */
const React = require('react');
let cancel = require('../../assets/cancel.png');
let complete = require('../../assets/complete.png');
let clockWise = require('../../assets/clock_wise.png');
let antiClockWise = require('../../assets/anti_clock_wise.png');
const Util = require('../../common/util/index');
const Config = require('../../common/config/index');
const Cropper = require('react-cropper').default;
require('./index.css');
require('cropperjs/dist/cropper.min.css');
const CropLayer = React.createClass({
    closeLayer:function(){
        this.props.changeLayer()
    },
    crop:function(){
        const canvas = this.refs.cropper.getCroppedCanvas();
        this.props.changeLayer();
        this.props.getFileCrop(canvas);
    },
    clockWise:function(){
        this.refs.cropper.rotate(90);
    },
    antiClockWise:function(){
        this.refs.cropper.rotate(-90);
    },
    render:function(){
        return (
            <div className={this.props.isShow?"layer_part crop_layer":"layer_part crop_layer hidden"}>
                <img src={cancel} className="img_auto_height img_cancel" onClick={this.closeLayer}/>
                <img src={complete} className="img_auto_height img_complete" onClick={this.crop}/>
                <Cropper
                    className="cropper_group"
                    ref='cropper'
                    src={Util.getBlobFromFile(this.props.fileOrigin)}
                    guides={false}
                    aspectRatio={Config.ratios.cropperRatio}
                    dragCrop={false}
                    dragMode="move"/>
                <img src={clockWise} className="img_auto_height img_clock_wise" onClick={this.clockWise}/>
                <img src={antiClockWise} className="img_auto_height img_anti_clock_wise" onClick={this.antiClockWise}/>
            </div>
        )
    }
});
module.exports = CropLayer;
