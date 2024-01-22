import * as TYPES from '../action-types';

/* 异步获取用户信息 */
const collectAction = {
    /* 设置collectPopUp是否显示 */
    setCollectPopUpShow() {
        return {
            type: TYPES.COLLECT_POP_UP_SHOW,
            isShow: true
        }
    },
    setCollectPopUpHide() {
        return {
            type: TYPES.COLLECT_POP_UP_SHOW,
            isShow: false
        }
    },
}

export default collectAction;