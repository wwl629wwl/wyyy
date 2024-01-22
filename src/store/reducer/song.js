import * as TYPES from '../action-types';
import _ from '../../assets/utils';

let initial = {
    songAarry: []
};

export default function songReducer(state = initial, action) {
    // 先将状态进行浅克隆
    state = _.clone(state);

    switch (action.type) {
        case TYPES.MY_PLAYLIST_SONG_ID:
            state.songAarry = action.songAarry;
            break;
        case TYPES.MY_PLAYLIST_ADD_SONG_ID:
            let array = Array.from(state.songAarry);
            array[action.index].push(action.id);
            state.songAarry = array;
            break;
        case TYPES.ROMOVE_ID_IN_MY_LIKELIST:
            let removeArray = Array.from(state.songAarry);
            // 找到id
            let index = removeArray[0].findIndex(item => item === action.id);
            // 删除
            removeArray[0].splice(index, 1);
            state.songAarry = removeArray;
        default:
            break;
    }

    return state;
}