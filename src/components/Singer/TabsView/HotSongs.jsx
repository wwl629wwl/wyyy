import React, { useEffect, useState } from "react";
import api from "../../../api";
import { useParams } from "react-router-dom";
import MusicListItem from "../../PlayList/MusicListItem";

const HotSongs = function HotSongs(props) {

    let { id } = props;
    /* 定义所需要的状态 */
    let [hotSongs, setHotSongs] = useState([]);

    /* 使用Router V6 里面的hook函数来获取id 而不通过子传父的方式 */
    const params = useParams();

    /* 请求数据 */
    useEffect(() => {
        (async () => {
            try {
                await api.querySingerHotSong(params.id || id).then(response => {
                    // console.log(response);
                    let { hotSongs } = response;
                    setHotSongs(hotSongs);
                })

            } catch (_) { };
        })();
    }, [id]);


    return <div className="hot-songs-box">
        {hotSongs.length > 0 ? hotSongs.map((item, index) => {
            return <MusicListItem
                info={item}
                index={index}
                key={`${item.name}+${index}`} />
        }) : null}
    </div>
};

export default HotSongs;