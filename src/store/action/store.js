import * as TYPES from '../action-types';
import api from '../../api';
import store from '../index';

const storeAction = {

    /* 请求收藏歌单列表 */
    async queryUserPlaylist() {
        let list = [];
        const baseinfo = store.getState().base;
        try {
            let { playlist } = await api.queryUserAlbum(baseinfo?.info?.userId);
            list = playlist;
        } catch (_) { }
        return {
            type: TYPES.USER_PLAYLIST,
            list
        }
    },

    /* 根据id移除收藏歌单 */
    removeSheetById(id) {
        return {
            type: TYPES.STORE_REMOVE_SHEET,
            id
        }
    },

    /* 收藏歌单 */
    subscribeSheet(info) {
        return {
            type: TYPES.STORE_SUBSCRIBE_SHEET,
            info
        }
    }
}

export default storeAction;