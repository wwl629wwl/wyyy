import React, { useEffect, useState } from "react";
import api from "../../api";
import ListLeft from "../../components/PlayList/ListLeft";
import './SingerDetail.less';
import SingerRight from "../../components/Singer/SingerRight";

const SingerDetail = function SingerDetail(props) {
    // console.log(props);
    let { params: { id } } = props;

    /* 定义所需要的状态 */
    let [singerInfo, setSingerInfo] = useState({});

    /* 请求数据 */
    useEffect(() => {

        (async () => {
            try {
                await api.querySingerHotSong(id).then(response => {
                    // console.log(response);
                    setSingerInfo(response);
                });
            } catch (_) { };
        })();

    }, []);


    return <div className="singer-detail-box">
        <ListLeft />
        {singerInfo ? <SingerRight info={singerInfo} /> : null}
    </div>
};

export default SingerDetail;