import * as TYPES from '../action-types';
import _ from '../../assets/utils';

let initial = {
    list: []
}

export default function storeReducer(state = initial, action) {
    state = _.clone(state);

    switch (action.type) {
        case TYPES.USER_PLAYLIST:
            state.list = action.list;
            break;
        case TYPES.STORE_REMOVE_SHEET:
            // 过滤掉要删除的新闻
            if (Array.isArray(state.list)) {
                state.list = state.list.filter(item => {
                    return +item.id !== +action.id;
                })
            }
            break;
        case TYPES.STORE_SUBSCRIBE_SHEET:
            let array = Array.from(state.list);
            array.push(action.info);
            state.list = array;
            break;
        default:
            break
    }
    return state;
}