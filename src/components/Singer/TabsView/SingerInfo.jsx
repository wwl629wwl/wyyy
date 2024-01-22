import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../../api";
import './SingerInfo.less';

const SingerInfo = function SingerInfo(props) {
    let { id } = props;

    const params = useParams();

    /* 定义所需的状态 */
    let [briefDesc, setBriefDesc] = useState(''),
        [introduction, setIntroduction] = useState([]);

    /* 请求信息 */
    useEffect(() => {
        (async () => {
            try {
                await api.querySingerInfo(params.id || id).then(response => {
                    let { briefDesc, introduction } = response;
                    setBriefDesc(briefDesc);
                    setIntroduction(introduction);
                })
            } catch (_) { };
        })()
    }, [id])

    return <div className="singer-info-box">
        <section className="intro">
            <p className="para">{briefDesc}</p>
            {introduction.length > 0 ? introduction.map((item, index) => {
                return <div key={index} className="map-box" >
                    <h2 className="subhead">{item.ti}</h2>
                    <p className="paras">{item.txt}</p>
                </div>
            }) : null}
        </section>
    </div>
}

export default SingerInfo;