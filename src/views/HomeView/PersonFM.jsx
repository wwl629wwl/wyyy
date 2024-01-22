import React, { useEffect, useState } from "react";
import ListLeft from "../../components/PlayList/ListLeft";
import './PersonFM.less';
import RightDetail from "../../components/Home/RightDetail";
import api from "../../api";
import { message } from "antd";

const PersonFM = function PersonFM() {

    let [fmdata, setFmdata] = useState([]);

    /* 请求数据 */
    useEffect(() => {
        (async () => {
            try {
                let { code, data } = await api.queryPersonalFM();
                if (+code !== 200) {
                    message.error('网络拥挤，请稍后重试')
                    return;
                }
                console.log(data);
                setFmdata(data);

            } catch (_) { }
        })()
    }, []);

    return <div className="person-fm-box">
        <ListLeft />
        {fmdata ? <RightDetail data={fmdata} type={0} /> : null}
    </div>
};

export default PersonFM;