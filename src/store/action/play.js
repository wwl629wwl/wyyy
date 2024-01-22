import * as TYPES from '../action-types';

const playAction = {
    /* 将需要播放的歌曲的info存入到store容器中 */
    setPlayMusicInfo(playinfo) {
        return {
            type: TYPES.SET_PLAY_MUSIC,
            playinfo
        }
    },

    addPlayMusicInfoToList(playlist) {
        return {
            type: TYPES.ADD_MUSIC_TO_MY_LOCAL_PLAY_LIST,
            playlist
        }
    },

    setPlayTag(tag) {
        return {
            type: TYPES.SET_PLAY_TAG,
            tag
        }
    },
    setPlaySongName(songid) {
        return {
            type: TYPES.SET_PLAY_SONG_NAME,
            songid
        }
    }
}


export default playAction;