import * as TYPES from '../action-types';
import _ from '../../assets/utils';


/* 定义一个初始状态存储 */
let initial = {
    isShow: false
};

export default function collectReducer(state = initial, action) {
    // 先将状态进行浅克隆
    state = _.clone(state);

    switch (action.type) {
        case TYPES.COLLECT_POP_UP_SHOW:
            state.isShow = action.isShow;
            break;
        default:
            break;
    }

    return state;
}