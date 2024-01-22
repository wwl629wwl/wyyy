import React, { useEffect, useState } from "react";
import './StoreSinger.less';
import api from "../../api";
import SingerItem from "../../components/Store/SingerItem";
import SingerRight from "../../components/Singer/SingerRight";

export const SingerContext = React.createContext();

const StoreSinger = function StoreSinger() {

    /* 定义状态 */
    let [follows, setFollows] = useState([]),
        [singerId, setSingerId] = useState(2843),
        [singerDetail, setSingerDetail] = useState({});

    /* 请求用户 收藏的歌手 用于 渲染左侧数据 */
    useEffect(() => {
        (async () => {
            try {
                let { data } = await api.queryUserFollowsSinger();
                setFollows(data);
            } catch (_) { }
        })()
    }, [])

    /* 请求数据 */
    useEffect(() => {
        (async () => {
            try {
                let { artist } = await api.querySingerHotSong(singerId);
                setSingerDetail(artist);
            } catch (_) { }
        })()
    }, [singerId])

    const handleDataFromChild = (data) => {

        // console.log(data)
        setSingerId(data);
    }

    return <div className="store-singer">
        <div className="singer-left-box">
            {follows.length > 0 ? follows.map(item => {
                let { id } = item;
                return <SingerItem info={item} id={id} type={1} key={`${id}+singer`} method={handleDataFromChild} />
            }) : null}

        </div>

        <div className="singer-right-box">
            {singerDetail ? <SingerRight info={singerDetail} id={singerId} /> : null}
        </div>
    </div>
};

export default StoreSinger;