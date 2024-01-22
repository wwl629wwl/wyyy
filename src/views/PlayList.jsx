import React, { useEffect, useState } from "react";
import './PlayList.less';
import api from "../api";
import ListLeft from "../components/PlayList/ListLeft";
import PlayListDetail from "../components/PlayList/PlayListDetail";
import { connect } from "react-redux";
import action from "../store/action";

/* 这是播放详情的页面点击需要通过传id才能够进入 */
const PlayList = function PlayList(props) {
    let { params: { id }, base: { info: userInfo }, store: { list }, song: { songAarry },
        queryUserPlaylist, queryUserInfoAsync, queryMylistSongId } = props;
    let { location } = props;
    /* 定义用来存储数据的状态 */
    let [listDetail, setListDetail] = useState({}),
        [relatedList, setRelatedList] = useState([]),
        [musicList, setMusicList] = useState([]);
    let { params } = props;
    /* 请求歌单详情 */
    useEffect(() => {
        (async () => {
            try {
                if (location.state !== 2) {
                    await api.queryMusicInfo(id).then(response => {
                        let { playlist } = response;
                        setListDetail(playlist);
                    })
                } else {
                    let { album } = await api.queryAlbumInfo(id);
                    setListDetail(album);
                }
            } catch (_) { };
        })();
    }, [id]);

    /* 请求相关推荐的信息 */
    useEffect(() => {
        (async () => {
            try {
                await api.queryRelatedList(id).then(response => {
                    // console.log(response);
                    let { playlists } = response;
                    setRelatedList(playlists);
                })

            } catch (_) { };
        })()
    }, [id]);

    /* 请求歌单全部歌曲 */
    useEffect(() => {
        (async () => {
            try {
                if (location.state !== 2) {
                    await api.queryAllMusic(id).then(response => {
                        // console.log(response);
                        let { songs } = response;
                        setMusicList(songs);
                    })
                } else {
                    let { songs } = await api.queryAlbumAllMusic(id);
                    setMusicList(songs);
                }
            } catch (_) { }
        })();
    }, [id]);


    useEffect(() => {
        (async () => {
            /* 表明还没登录 */
            if (!userInfo) {
                let { info } = await queryUserInfoAsync();
                userInfo = info;
            }
            if (userInfo && list.length === 0) {
                /* 表明已经登录 但是list没有信息 */
                await queryUserPlaylist();
            }
            if (userInfo && list && songAarry.length === 0) {
                /* 表明已经登录list有信息 但是歌单id给空 */
                await queryMylistSongId();
            }
        })();
    }, [])

    return <div className="play-list-box ld-layout container">
        {relatedList.length > 0 ? <ListLeft data={relatedList} /> : <ListLeft />}
        {listDetail && musicList.length > 0 ? <PlayListDetail desc={listDetail} songs={musicList} params={params} type={1} /> : null}
    </div>
};

export default connect(
    state => {
        return {
            base: state.base,
            store: state.store,
            song: state.song
        }
    },
    { ...action.base, ...action.store, ...action.song }
)(PlayList);