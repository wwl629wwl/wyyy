import React, { useEffect, useState } from "react";
import api from "../../api";
import SSingerItem from "../../components/Search/SSingerItem";
import { emptyArray } from "../../api/method";
import { Pagination } from "antd";

const SSinger = function SSinger(props) {
    let { keywords, type } = props;

    /* 定义所需的状态 */
    let [artists, setArtists] = useState([]),
        [total, setTotal] = useState(0),
        [current, setCurrent] = useState(1);

    const onPageChange = (current) => {
        setCurrent(current);
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // 可选，平滑滚动效果
        });
    }

    /* 请求数据 */
    useEffect(() => {
        (async () => {
            try {
                await api.querySearchAllOfType(keywords, type, current, 18).then(response => {
                    let { result: { artists, artistCount } } = response;
                    setArtists(artists);
                    setTotal(artistCount);
                })
            } catch (_) { }
        })()
    }, [current]);

    return <div className="search-singer-box">
        <div className="singer-list-box list">
            {artists.length > 0 ? artists.map(item => {
                return <SSingerItem info={item} key={`${item?.id}+ssinger`} />
            }) : null}
            {emptyArray.map((item, index) => {
                return <div className="empty" key={`${item}+${index}`}></div>
            })}
        </div>
        <div className="pagination">
            {total > 18 ? <>
                <Pagination defaultCurrent={1}
                    total={total}
                    current={current}
                    onChange={onPageChange}
                    pageSize={18}
                />
            </> : null}
        </div>
    </div>
};

export default SSinger;