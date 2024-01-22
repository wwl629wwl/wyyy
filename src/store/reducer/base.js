import * as TYPES from '../action-types';
import _ from '../../assets/utils';


/* 定义一个初始状态存储 */
let initial = {
    info: null,
    isLogin: false,
};

export default function baseReducer(state = initial, action) {
    // 先将状态进行浅克隆
    state = _.clone(state);

    switch (action.type) {
        case TYPES.BASE_USER_INFO:
            state.info = action.info;
            state.isLogin = action.isLogin
            break;
        default:
            break;
    }

    return state;
}