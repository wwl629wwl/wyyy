import React, { useEffect, useState } from "react";
import api from "../../../api";
import { useParams } from "react-router-dom";
import MVItem from './MVItem';
import './RelatedMV.less';
import { Pagination } from "antd";

const RelatedMV = function RelatedMV(props) {

    let { id } = props;
    /* 通过 Router的Hook函数来获取id */
    const params = useParams();

    /* 定义状态来存储数据 */
    let [mvs, setMvs] = useState([]),
        [current, setCurrent] = useState(1);

    const pageChange = (page) => {
        setCurrent(page);
    }

    /* 请求数据 */
    useEffect(() => {
        (async () => {
            try {
                await api.querySingerMV(params.id || id, current).then(response => {
                    let { mvs } = response;
                    setMvs(mvs);
                })
            } catch (_) { }
        })()
    }, [current, id]);

    return <div className="related-mv-box">
        <div className="mvs-list">
            {mvs.length > 0 ? mvs.map(item => {
                let { id } = item;
                return <MVItem key={id} info={item} />
            }) : null}
        </div>
        <div className="pagination">
            {mvs.length > 10 ? <>
                <Pagination defaultCurrent={1} total={50} current={current} onChange={pageChange} />
            </> : null}
        </div>
    </div>
}

export default RelatedMV;