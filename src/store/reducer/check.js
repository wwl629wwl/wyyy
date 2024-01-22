import * as TYPES from '../action-types';
import _ from '../../assets/utils';

let initial = {
    listShow: false,
    listCheck: false
}

export default function checkReducer(state = initial, action) {
    state = _.clone(state);

    switch (action.type) {
        case TYPES.CHECK_PLAYLIST_SHOW:
            state.listShow = action.listShow;
            state.listCheck = action.listCheck;
            break;
        default:
            break;
    }

    return state;
};