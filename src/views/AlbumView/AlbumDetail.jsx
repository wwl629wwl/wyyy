import React, { useEffect, useState } from "react";
import './AlbumDetail.less';
import api from "../../api";
import ListLeft from "../../components/PlayList/ListLeft";
import PlayListDetail from "../../components/PlayList/PlayListDetail";

const AlbumDetail = function AlbumDetail(props) {


    let { params: { id } } = props;

    /* 定义状态 存储数据 */
    let [songs, setSongs] = useState([]),
        [desc, setDesc] = useState({});

    /* 请求数据 */
    useEffect(() => {
        (async () => {
            try {
                await api.queryAlbumInfo(id).then(response => {
                    console.log(response);
                    let { songs, album } = response;
                    setSongs(songs);
                    setDesc(album);
                })
            } catch (_) { }
        })()
    }, [])


    return <div className="album-detail-box">
        <ListLeft />
        {desc && songs.length > 0 ? <PlayListDetail desc={desc} songs={songs} type={2}/> : null}
    </div>
};

export default AlbumDetail;