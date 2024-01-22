import React, { useEffect, useState } from "react";
import './StoreAlbum.less';
import { connect } from 'react-redux';
import api from "../../api";
import StoreLeft from "../../components/Store/StoreLeft";
import PlayListDetail from "../../components/PlayList/PlayListDetail";

export const MyContext = React.createContext();

const StoreAlbum = function StoreAlbum(props) {

    let { info: { userId } } = props;
    /* 定义状态存储数据 */
    let [playlist, setPlaylist] = useState([]),
        [temp, setTemp] = useState([]),
        [listDetail, setListDetail] = useState({}),
        [albumId, setAlbumId] = useState(477328563);



    const handleDataFromChild = (data) => {
        setAlbumId(data);
    }

    /* 请求数据 请求用户收藏的专辑列表 用于渲染左侧数据 */
    useEffect(() => {
        (async () => {
            try {
                let { playlist } = await api.queryUserAlbum(userId);
                setPlaylist(playlist);
            } catch (_) { }
        })()
    }, []);

    /* 请求歌单所有音乐 */
    useEffect(() => {
        (async () => {
            try {
                let { songs } = await api.queryAllMusic(albumId);
                setTemp(songs);
            } catch (_) { }
        })()
    }, [albumId]);

    /* 请求歌单详情 */
    useEffect(() => {
        (async () => {
            try {
                let { playlist } = await api.queryMusicInfo(albumId);
                setListDetail(playlist);
            } catch (_) { }
        })()
    }, [albumId])

    return <MyContext.Provider value={{ onData: handleDataFromChild }}>
        <div className="store-album-box">
            {playlist ? <StoreLeft playlist={playlist} /> : null}
            <div className="store-right" >
                {(temp && listDetail) && <PlayListDetail desc={listDetail} songs={temp} type={3} />}
            </div>
        </div>
    </MyContext.Provider>
};

export default connect(
    state => state.base
)(StoreAlbum);