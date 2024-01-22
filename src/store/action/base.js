import * as TYPES from '../action-types';
import api from '../../api';

/* 异步获取用户信息 */
const baseAction = {
    // 异步从服务器获取信息
    async queryUserInfoAsync() {

        let info = null;
        let isLogin = false;
        try {
            let { code, profile } = await api.queryUserInfo();
            if (+code === 200) {
                info = profile;
                isLogin = true;
            }
        } catch (_) { };

        return {
            type: TYPES.BASE_USER_INFO,
            info,
            isLogin
        }
    },

    // 清除本地存储的信息
    clearUserInfo() {
        return {
            type: TYPES.BASE_USER_INFO,
            info: null,
        }
    }
}

export default baseAction;