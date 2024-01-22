import React, { useEffect, useState } from "react";
import api from "../../api";
import SSheetItem from "../../components/Search/SSheetItem";
import { emptyArray } from "../../api/method";
import { Pagination } from "antd";

const SSheet = function SSheet(props) {

    let { keywords, type } = props;

    /* 定义需要的状态 */
    let [playlist, setPlaylist] = useState([]),
        [total, setTotal] = useState(0),
        [current, setCurrent] = useState(1);

    const onPageChange = (current) => {
        setCurrent(current)
    }

    useEffect(() => {
        (async () => {
            try {
                await api.querySearchAllOfType(keywords, type, current).then(response => {
                    let { result: { playlistCount, playlists } } = response;
                    setPlaylist(playlists);
                    setTotal(playlistCount);
                })
            } catch (_) { }
        })()
    }, [current]);

    return <div className="search-sheet-box">
        <div className="playlist-box list">
            {playlist.length > 0 ? playlist.map(item => {
                return <SSheetItem info={item} key={`key={${item?.id}+ salbum`} />
            }) : null}
            {emptyArray.map((item, index) => {
                return <div className="empty" key={`${item}+${index}`}></div>
            })}
        </div>
        <div className="pagination">
            {total > 20 ? <>
                <Pagination defaultCurrent={1}
                    current={current}
                    total={total}
                    onChange={onPageChange}
                    pageSize={20} />
            </> : null}
        </div>
    </div>
};

export default SSheet;