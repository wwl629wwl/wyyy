import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import api from "../../api";
import './PerCharts.less';
import MusicListItem from "../../components/PlayList/MusicListItem";

const PerCharts = function PerCharts(props) {

    let { uid } = props;
    let [allData, setAllData] = useState([]),
        [weekData, setWeekData] = useState([]),
        [current, setCurrent] = useState(0);



    useEffect(() => {
        (async () => {
            try {
                let { allData } = await api.queryUserPlayRecord(uid, current);
                setAllData(allData)
            } catch (_) { };
        })()
    }, [current]);

    useEffect(() => {
        (async () => {
            try {
                let { weekData } = await api.queryUserPlayRecord(uid, current);
                setWeekData(weekData);
            } catch (_) { };
        })()
    }, [current]);

    const changeCurrent = (event) => {
        /* 根据点击的a标签的title不同 去设置current的值 */
        if (event.target.title === 'alldata') {
            setCurrent(0);
        } else {
            setCurrent(1);
        }
    }

    return <div className="personal-charts-box">
        <div className="charts-header">
            <a className={`type ${current === 0 ? 'active' : ''}`} onClick={changeCurrent} title="alldata">所有播放</a>
            <a className={`type ${current === 1 ? 'active' : ''}`} title="weekdata" onClick={changeCurrent}>最近一周</a>
            <span className="statistics">累积播放2242首</span>
        </div>
        <div className="track-playlist">
            {(current == 0 && allData?.length > 0) ? allData.map((item, index) => {
                let { song, score } = item;
                return <MusicListItem index={index} info={song} key={`${index}+alldata`} score={score} />
            }) : null}
            {(current === 1 && weekData?.length > 0) ? weekData.map((item, index) => {
                let { song, score } = item;
                return <MusicListItem index={index} info={song} key={`${index}+alldata`} score={score} />
            }) : null}
        </div>
    </div>
}

/* PerCharts 做属性验证 */
PerCharts.defaultProps = {
    uid: 0
}

PerCharts.propTypes = {
    uid: PropTypes.number
}


export default PerCharts;