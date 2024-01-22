import React, { useEffect, useState } from "react";
import './DailyRec.less';
import ListLeft from "../../components/PlayList/ListLeft";
import api from "../../api";
import { message } from "antd";
import RightDetail from "../../components/Home/RightDetail";

const DailyRec = function DailyRec() {

    let [dailySong, setDailySong] = useState([]);

    /* 请求数据 */
    useEffect(() => {
        (async () => {
            try {
                let { code, data: { dailySongs } } = await api.queryDailySongs();
                if (+code !== 200) {
                    message.error('网络错误，请稍后重试');
                    return;
                }
                setDailySong(dailySongs);
            } catch (_) { }
        })()
    }, []);

    return <div className="daily-recommend-box">
        <ListLeft from={'daily'} />
        {dailySong ? <RightDetail type={1} data={dailySong} /> : null}
    </div>
}

export default DailyRec