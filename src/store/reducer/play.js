import * as TYPES from '../action-types';
import _ from '../../assets/utils';

let initial = {
    playinfo: null,
    playlist: [],
    tag: false,
    songid: ''
}

export default function playReducer(state = initial, action) {
    state = _.clone(state);

    switch (action.type) {
        case TYPES.SET_PLAY_MUSIC:
            state.playinfo = action.playinfo;
            break;
        case TYPES.ADD_MUSIC_TO_MY_LOCAL_PLAY_LIST:
            state.playlist = action.playlist;
            break;
        case TYPES.SET_PLAY_TAG:
            state.tag = action.tag;
            break;
        case TYPES.SET_PLAY_SONG_NAME:
            state.songid = action.songid;
            break;
        default:
            break;
    }

    return state;
}