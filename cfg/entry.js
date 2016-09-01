/**
 * Created by Administrator on 2016/8/12.
 */
const defaultSettings = require('./defaults');
const entry = {}
entry.setEntryFile = function(){
  defaultSettings.enterFileName = 'index';
}

entry.setPublicPath = function(validEnv){
  switch (validEnv){
    case 'dist':
      defaultSettings.publicPath = "http://www.mengbp.com/web/WXH5/MBP/MBPZQ/assets/";
      break;
    default:
      defaultSettings.publicPath = "/assets/";
      break;
  }
}

module.exports = entry;
