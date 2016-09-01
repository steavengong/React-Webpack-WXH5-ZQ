/**
 * Created by Administrator on 2016/8/24.
 */
const defaultUtil = require('../../../common/util/index');
const Util = defaultUtil.isWX()? require('../../../common/util/wx/index'):require('../../../common/util/index');
module.exports = Util;