import React, { useEffect, useState } from "react";
import api from "../../api";
import SAlbumItem from "../../components/Search/SAlbumItem";
import { emptyArray } from "../../api/method";
import { Pagination } from "antd";

const SAlbum = function SAlbum(props) {
    let { keywords, type } = props;

    /* 定义需要的状态 */
    let [albums, setAlbums] = useState([]),
        [total, setTotal] = useState(0),
        [current, setCurrent] = useState(1);

    const onPageChange = (current) => {
        setCurrent(current);
    }

    /* 请求数据 */
    useEffect(() => {
        (async () => {
            try {
                await api.querySearchAllOfType(keywords, type, current).then(response => {
                    let { result: { albums, albumCount } } = response;
                    setAlbums(albums);
                    setTotal(albumCount);
                })
            } catch (_) { }
        })()
    }, [current]);

    return <div className="search-album-box">
        <div className="album-list list">
            {albums.length > 0 ? albums.map(item => {
                return <SAlbumItem info={item} key={`${item?.id}+salbum`} />
            }) : null}
            {emptyArray.map((item, index) => {
                return <div className="empty" key={`${item}+${index}+salbum`}></div>
            })}
        </div>
        <div className="pagination">
            {total > 20 ? <>
                <Pagination
                    defaultCurrent={1}
                    current={current}
                    total={total}
                    onChange={onPageChange}
                    pageSize={20}
                />
            </> : null}
        </div>
    </div>
};

export default SAlbum;