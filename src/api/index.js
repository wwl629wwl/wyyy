import http from "./http";

/* 获取用户信息--未登录 */
const queryUserInfo = () => http.get('/api/user/account');

/* 获取用户详情 */
const queryUserDetail = (uid) => {
    return http.get('/api/user/detail', {
        params: {
            uid
        }
    })
}

/* 请求推荐歌单-- 未登录 */
const queryRecommendList = () => http.get('/api/personalized?limit=10');

/* 请求最新音乐-- 未登录 */
const queryNewMusicList = () => http.get('/api/album/newest');

/* 请求推荐MV-- 未登录 */
const queryNewMV = () => http.get('/api/personalized/mv');

/* 请求歌单详情 */
const queryMusicInfo = (id) => {
    return http.get('/api/playlist/detail', {
        params: {
            id
        }
    })
};

/* 获取相关推荐歌单 */
const queryRelatedList = (id) => {
    return http.get('/api/related/playlist', {
        params: {
            id
        }
    })
};

/* 获取歌单所有歌曲 */
const queryAllMusic = (id, limit = 1000) => {
    return http.get('/api/playlist/track/all', {
        params: {
            id,
            limit
        }
    })
}

/* 获取歌手热门歌曲 */
const querySingerHotSong = (id) => {
    return http.get('/api/artists', {
        params: {
            id
        }
    })
};

/* 获取歌手专辑 */
const querySingerAlbum = (id, current) => {
    // 因为需要配合pagination来请求数据
    const offset = (current - 1) * 30; // 偏移值为30
    const limit = 30; //每页显示30个数据

    return http.get('/api//artist/album', {
        params: {
            id,
            offset,
            limit
        }
    })
};

/* 获取歌手的MV */
const querySingerMV = (id, current) => {
    // 因为需要配合pagination来请求数据
    const offset = (current - 1) * 32; // 偏移值为30
    const limit = 32; //每页显示30个数据

    return http.get('/api/artist/mv', {
        params: {
            id,
            offset,
            limit
        }
    })
};

/* 获取歌手介绍 */
const querySingerInfo = (id) => {
    return http.get('/api/artist/desc', {
        params: {
            id
        }
    })
};

/* 获取专辑详情 */
const queryAlbumInfo = (id) => {
    return http.get('/api/album', {
        params: {
            id
        }
    })
};

/* 获取专辑动态详情 */
const queryAlbumDynamicInfo = (id) => {
    return http.get('/api/album/detail/dynamic', {
        params: {
            id
        }
    })
};

/* 获取搜索建议 必选参数keywords */
const querySearchSuggest = (keywords) => {
    const limit = 10;
    return http.get('/api/search/suggest', {
        params: {
            keywords,
            limit
        }
    })
}

/* 获取搜索全部 */
const querySearchAllOfType = (keywords, type, current = 1, limit = 20) => {
    // 这里也是要陪pagination来请求数据
    const offset = (current - 1) * limit;
    return http.get('/api/search', {
        params: {
            keywords,
            type,
            offset,
            limit
        }
    })
}

/* 获取MV详情 */
const queryMVDetail = (mvid) => {
    return http.get('/api/mv/detail', {
        params: {
            mvid,
        }
    })
};

/* 获取MV播放地址 */
const queryMVPlayAddress = (id) => {
    return http.get('/api/mv/url', {
        params: {
            id
        }
    })
};

/* 登录 */
const login = (phone, password) => {

    return http.get('/api/login/cellphone', {
        params: {
            phone,
            password
        }
    })
};

/* 获取私人fm */
const queryPersonalFM = () => http.get('/api/personal_fm');

/* 获取每日推荐歌曲 */
const queryDailySongs = () => http.get('/api/recommend/songs');

/* 获取用户信息 , 歌单，收藏，mv, dj 数量 */
const queryUserCount = () => http.get('/api/user/subcount');

/* 获取用户的歌单 */
const queryUserAlbum = (uid) => {
    return http.get('/api/user/playlist', {
        params: {
            uid
        }
    })
};

/* 获取用户关注的歌手 */
const queryUserFollowsSinger = () => http.get('/api/artist/sublist');

/* 请求用户收藏的专辑 */
const queryUserFollowSheet = () => http.get('/api/album/sublist');

/* 请求用户收藏的mv列表 */
const queryUserFollowMV = () => http.get('/api/mv/sublist');

/* 请求用户收藏的DJ列表 */
const queryUserFollowDJ = () => http.get('/api/dj/sublist');

/* 获取用户播放记录 */
const queryUserPlayRecord = (uid, type = 1) => {
    /* 可选参数 : type : type=1 时只返回 weekData, type=0 时返回 allData  */
    return http.get('/api/user/record', {
        params: {
            uid,
            type
        }
    })
}

/* 退出登录 */
const logout = () => http.get('/api/logout');

/* 获取用户动态 */
const queryUserEvent = (uid) => {
    return http.get('/api/user/event', {
        params: {
            uid
        }
    })
};

/* 收藏或取消收藏歌单 */
const subscribeSheet = (t, id) => {
    // t是类型 t=1收藏 t=2 取消收藏
    return http.get('/api/playlist/subscribe', {
        params: {
            t,
            id
        }
    })
}

/* 对歌单添加或删除歌曲 */
const addOrDelSongToSheet = (op = 'add', pid, tracks) => {
    // op: 从歌单增加单曲为 add, 删除为 del
    // pid: 歌单id
    // tracks: 歌曲 id,可多个,用逗号隔开
    return http.get('/api/playlist/tracks', {
        params: {
            op,
            pid,
            tracks
        }
    })
};

/* 获取音乐url */
const queryMusicUrl = (id) => {
    // id:音乐的id
    // level：播放音质等级
    let level = 'exhigh';
    return http.get('/api/song/url/v1', {
        params: {
            id,
            level
        }
    })
}

/* 获取歌词 */
const queryLyric = (id) => {
    return http.get('/api/lyric', {
        params: {
            id
        }
    })
};

/* 获取逐句歌词 */
const queryLineLyric = (id) => {
    return http.get('/api/lyric/new', {
        params: {
            id
        }
    })
};

/* 获取专辑全部歌曲 */
const queryAlbumAllMusic = (id) => {
    return http.get('/api/album', {
        params: {
            id
        }
    })
}

/* 暴露API */
const api = {
    queryRecommendList,
    queryNewMusicList,
    queryNewMV,
    queryMusicInfo,
    queryRelatedList,
    queryAllMusic,
    querySingerHotSong,
    querySingerAlbum,
    querySingerMV,
    querySingerInfo,
    queryAlbumInfo,
    querySearchSuggest,
    querySearchAllOfType,
    queryMVDetail,
    queryMVPlayAddress,
    queryUserInfo,
    login,
    queryPersonalFM,
    queryDailySongs,
    queryUserCount,
    queryUserAlbum,
    queryUserFollowsSinger,
    queryUserFollowSheet,
    queryUserFollowMV,
    queryUserFollowDJ,
    queryUserDetail,
    queryUserPlayRecord,
    queryUserEvent,
    logout,
    subscribeSheet,
    addOrDelSongToSheet,
    queryAlbumDynamicInfo,
    queryMusicUrl,
    queryLineLyric,
    queryLyric,
    queryAlbumAllMusic
};

export default api;