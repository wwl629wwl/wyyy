import * as TYPES from '../action-types';

const checkAction = {
    /* 控制playbar里面的checklist的显示与隐藏 */
    setListPopoverShow() {
        return {
            listShow: true,
            listCheck: true,
            type: TYPES.CHECK_PLAYLIST_SHOW
        }
    },

    setListPopoverHide() {
        return {
            listShow: false,
            listCheck: false,
            type: TYPES.CHECK_PLAYLIST_SHOW
        }
    },
};


export default checkAction;