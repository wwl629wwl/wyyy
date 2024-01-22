import React, { useEffect, useState } from "react";
import ListLeft from '../../components/PlayList/ListLeft';
import './Video.less';
import api from "../../api";
import { NavLink } from "react-router-dom";
import { Button } from "antd";

const Video = function Video(props) {
    let { params } = props;

    /* 定义状态 存储数据 */
    let [videoData, setVideoData] = useState({}),
        [videoUrl, setVideoUrl] = useState('');

    /* 请求数据 */
    useEffect(() => {
        (async () => {
            try {
                await api.queryMVDetail(params.id).then(response => {
                    console.log(response);
                    let { data } = response;
                    setVideoData(data)
                })
            } catch (_) { }
        })()
    }, []);
    useEffect(() => {
        (async () => {
            try {
                await api.queryMVPlayAddress(params.id).then(response => {
                    console.log(response);
                    let { data: { url } } = response;
                    setVideoUrl(url);
                })
            } catch (_) { }
        })()
    }, []);

    return <div className="video-box">
        <ListLeft />
        {videoData && videoUrl ? <div className="video-detal-box">
            <div className="video-detail">
                <div className="desc">
                    <span className="title">{videoData.name}</span>
                    <span className="by">by</span>
                    <NavLink className='creator' to={`/artists/${videoData.artistId}`}> {videoData.artistName}</NavLink>
                </div>
            </div>
            <video src={videoUrl} poster={`${videoData.cover}?param=1440y810`} preload="none" controls='controls'></video>
            <div className="actions">
                <Button><i className="iconfont">&#xe90f;</i>赞({videoData.subCount})</Button>
                <Button><i className="iconfont">&#xe666;</i>收藏({videoData.shareCount})</Button>
                <Button><i className="iconfont">&#xe606;</i>评论({videoData.commentCount})</Button>
            </div>
        </div> : null}
    </div>
};

export default Video;