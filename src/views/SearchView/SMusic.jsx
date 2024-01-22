import React, { useEffect, useState } from "react";
import api from "../../api";
import MusicListItem from '../../components/PlayList/MusicListItem';
import { Pagination } from "antd";
import './SMusic.less';

/* 解决这个info的问题 */
const SMusic = function SMusic(props) {
    let { type, keywords } = props;

    /* 定义所需的状态 */
    let [totalCount, setTotalCount] = useState(0),
        [songArray, setSongArray] = useState([]),
        [current, setCurrent] = useState(1);


    const onPageChange = (current) => {
        setCurrent(current);
    }

    /* 请求数据 */
    useEffect(() => {
        (async () => {
            try {
                await api.querySearchAllOfType(keywords, type, current).then(response => {
                    // console.log(response);
                    let { result: { songCount, songs } } = response;
                    // console.log(songs);
                    setTotalCount(songCount);
                    setSongArray(songs);
                })
            } catch (_) { }
        })()
    }, [current]);

    return <div className="search-music-box">
        <div className="search-songs-list">
            {songArray.length > 0 ? songArray.map((item, index) => {
                let { id, name } = item;
                return <MusicListItem key={`${id}+${name}+smusic`} info={item} index={index} />
            }) : null}
        </div>
        <div className="search-pagination">
            <>
                <Pagination defaultCurrent={1}
                    total={totalCount}
                    current={current}
                    onChange={onPageChange}
                    pageSize={20}
                />
            </>
        </div>
    </div>
};

export default SMusic;