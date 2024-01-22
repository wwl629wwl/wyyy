import * as TYPES from '../action-types';
import _ from '../../assets/utils';

let initial = {
    musicId: 0,
    relatedIndex: 0,
};

export default function subscribeReducer(state = initial, action) {
    /* 对状态进行浅复制 */
    state = _.clone(state);

    switch (action.type) {
        case TYPES.SUBSCRIBE_MUSIC_ITEM_ID:
            state.musicId = action.musicId;
            break;
        case TYPES.SUBSCRIBE_RELATED_ITEM_INDEX:
            state.relatedIndex = action.relatedIndex;
            break;
        default:
            break;
    }

    return state
}