import React, { useEffect, useState } from "react";
import api from "../../api";
import SVideoItem from "../../components/Search/SVideoItem";
import { emptyArray } from "../../api/method";
import { Pagination } from "antd";

const SMV = function SMV(props) {
    let { keywords, type } = props;

    /* 定义需要的状态 */
    let [videos, setVideos] = useState([]),
        [total, setTotal] = useState(0),
        [current, setCurrent] = useState(1);

    const onPageChange = (current) => {
        setCurrent(current)
    }

    useEffect(() => {
        (async () => {
            try {
                await api.querySearchAllOfType(keywords, type, current, 22).then(response => {
                    let { result: { videos, videoCount } } = response;
                    console.log(response);
                    setTotal(videoCount);
                    setVideos(videos);
                })
            } catch (_) { }
        })()
    }, [current]);

    return <div className="search-mv-box">
        <div className="video-list video">
            {videos.length > 0 ? videos.map(item => {
                return <SVideoItem info={item} key={`${item?.vid}+svideo`} />
            }) : null}
            {emptyArray.map((item, index) => {
                return <div className="empty" style={{ width: '160px', height: '0' }} key={`${item}+${index}+smv`}></div>
            })}
        </div>
        <div className="pagination">
            {total > 20 ? <>
                <Pagination defaultCurrent={1} current={current} total={total} pageSize={22} onChange={onPageChange} />
            </> : null}
        </div>
    </div>
};

export default SMV;