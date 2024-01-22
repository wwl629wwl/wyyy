import * as TYPES from '../action-types';
import api from '../../api';
import store from '../index';

const songAction = {

    /* 请求我的收藏列表的歌单的id */
    async queryMylistSongId() {
        let songAarry = [];
        /* 拿到我的收藏了歌单列表 */
        const storelist = store.getState().store;
        /* 从我的收藏列表中拿到我创建的歌单 */
        let mylist = storelist?.list.filter(item => {
            return item.subscribed === false
        });
        let result = [];
        if (Array.isArray(mylist)) {
            result = await Promise.all(mylist.map(async item => {
                let { playlist: { trackIds } } = await api.queryMusicInfo(item.id);
                let finalResult = trackIds.map(item => {
                    return item.id
                })

                return finalResult;
            }))
            songAarry = result;
        }

        return {
            type: TYPES.MY_PLAYLIST_SONG_ID,
            songAarry,
        }

    },

    subscribeSongId(id, index) {
        return {
            type: TYPES.MY_PLAYLIST_ADD_SONG_ID,
            id,
            index
        }
    },

    reomoveSongId(id) {
        return {
            type: TYPES.ROMOVE_ID_IN_MY_LIKELIST,
            id
        }
    }
}
export default songAction;