import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../../api";
import AlbumItem from "./AlbumItem";
import './AllAlbum.less';
import { Pagination } from "antd";

const AllAlbum = function AllAlbum(props) {

    let { id } = props;
    /* 获取id 利用Router里面的Hook函数 */
    const params = useParams();

    /* 定义所需的状态 */
    let [hotAlbums, setHotAlbums] = useState([]),
        [current, setCurrent] = useState(1);


    /* 请求数据 */
    useEffect(() => {
        (async () => {
            try {
                await api.querySingerAlbum(params.id || id, current).then(response => {
                    // console.log(response);
                    let { hotAlbums } = response;
                    setHotAlbums(hotAlbums);
                })
            } catch (_) { }
        })();
    }, [current, id]);

    /* pagination页面切换之后调用的方法
       给pagination设置了current之后 pagination就变成了受控组件 因此需要设置这个方法来设置current
    */
    const pageChange = (page) => {
        setCurrent(page);
    }

    return <div className="all-album-box">
        <div className="album-list">
            {hotAlbums.length > 0 ? hotAlbums.map(item => {
                let { id } = item;
                return <AlbumItem info={item} key={id} />
            }) : null}
        </div>
        <div className="pagination-box">
            {hotAlbums.length > 10 ? <>
                {/* 加了current pagination就变成了受控组件 */}
                <Pagination defaultCurrent={1} total={50} current={current} onChange={pageChange} />
            </> : null}
        </div>
    </div>
};

export default AllAlbum;