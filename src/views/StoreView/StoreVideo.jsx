import React, { useEffect, useState } from "react";
import api from "../../api";
import SingerItem from "../../components/Store/SingerItem";
import './StoreVideo.less';
import { Button } from "antd";
import { NavLink } from "react-router-dom";

const StoreVideo = function StoreVideo() {

    /* 定义状态 */
    let [mvData, setMvData] = useState([]),
        [mvId, setMvId] = useState(14314653),
        [mvInfo, setMvInfo] = useState({}),
        [mvUrl, setMvUrl] = useState('');

    const handleVideoFromChild = (data) => {
        setMvId(data)
    }

    /* 请求 用户 收藏的mv 用于渲染左侧数据 */
    useEffect(() => {
        (async () => {
            try {
                let { data } = await api.queryUserFollowMV();
                console.log(data);
                setMvData(data);
            } catch (_) { }
        })()
    }, []);

    /* 根据mvid 请求 mv的detail */
    useEffect(() => {
        (async () => {
            try {
                let { data } = await api.queryMVDetail(mvId);
                setMvInfo(data);
            } catch (_) { }
        })()
    }, [mvId]);

    /* 根据mvid 请求mv的视频url */
    useEffect(() => {
        (async () => {
            try {
                let { data: { url } } = await api.queryMVPlayAddress(mvId)
                setMvUrl(url);
            } catch (_) { }
        })()
    }, [mvId]);

    return <div className="store-video-box">
        <div className="store-video-left">
            {mvData.length > 0 ? mvData.map(item => {
                let { vid } = item;
                return <SingerItem id={Number(vid)} info={item} type={3} key={`${vid}+mv`} method={handleVideoFromChild} />
            }) : null}
        </div>
        {mvInfo && mvUrl ? <div className="store-video-right">
            <div className="store-video-detail">
                <div className="desc">
                    <span className="title">{mvInfo.name}</span>
                    <span className="by">by</span>
                    <NavLink className='creator' to={`/artists/${mvInfo.artistId}`}> {mvInfo.artistName}</NavLink>
                </div>
            </div>
            <video src={mvUrl} poster={`${mvInfo.cover}?param=1440y810`} preload="none" controls='controls'></video>
            <div className="actions">
                <Button><i className="iconfont">&#xe90f;</i>赞({mvInfo.subCount})</Button>
                <Button><i className="iconfont">&#xe666;</i>收藏({mvInfo.shareCount})</Button>
                <Button><i className="iconfont">&#xe606;</i>评论({mvInfo.commentCount})</Button>
            </div>
        </div> : null}
    </div>
}

export default StoreVideo;