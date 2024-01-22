import React, { useContext, useEffect, useState } from "react";
import './RelatedItem.less'
import { Image, message } from "antd";
import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import action from "../../store/action";
import api from "../../api";

const RelatedItem = function RelatedItem(props) {
    let { info, type, index } = props;
    /* 歌单的id */
    let { id } = info;

    /* 定义所需要的状态 */
    let [musicUrl, setMusicUrl] = useState("");

    /* 从props中结构出 react-redux的属性 */
    let { subscribe: { musicId }, subscribeSongId, song: { songAarry }, setCollectPopUpHide } = props;

    const navigate = useNavigate();

    const RelatedItemClick = async () => {
        if (type === 1) {
            navigate(`/playlist/${id}`);
            return;
        }
        if (type === 3) {
            if (songAarry[index] && songAarry[index].includes(musicId)) {
                message.error('歌单内歌曲重复');
                return;
            }
            try {
                let { body } = await api.addOrDelSongToSheet('add', id, musicId);
                console.log(typeof (body.code));
                if (body.code === 502) {
                    message.error('歌单内歌曲重复');
                    return;
                }
                message.success('收藏歌曲成功');
            } catch (_) { };
            /* 将id同步到songArray中并隐藏collectPopUp */
            subscribeSongId(musicId, index);
            setCollectPopUpHide();
        }
    }

    /* useEffect获取数据请求 */
    useEffect(() => {
        (async () => {
            try {
                let { data } = await api.queryMusicUrl(musicId);
                setMusicUrl(data);
            } catch (_) { }
        })()
    }, [])

    return <div className="related-item-box" onClick={RelatedItemClick} >
        <div className="avatar">
            <div className="avatar-box" style={{ width: '40px', height: '40px', fontSize: '20px' }}>
                <div className="inner">
                    <Image src={info.coverImgUrl} preview={false} placeholder={true} />
                </div>
            </div>
        </div>
        <div className="content">
            <div className="content-title" >
                {info.name}
            </div>
            <div className="sub-title">{(type === 1 && info?.creator?.nickname)
                || (type === 2 && `共 ${info?.trackCount} 首 ，${info?.playCount} 次播放，${info?.subscribedCount} 人收藏`) ||
                (type === 3 && `共 ${info?.trackCount} 首`)} </div>
        </div>
        {type === 3 ? <div>
            {musicUrl ? '' : '正在加载中'};
        </div> : null}
    </div>
};

/* 对RelatedItem 做属性验证 */
RelatedItem.defaultProps = {
    info: null,
    type: 1

};

RelatedItem.propTypes = {
    info: PropTypes.object,
    type: PropTypes.number
};

export default connect(
    state => {
        return {
            song: state.song,
            subscribe: state.subscribe
        }
    },
    { ...action.song, ...action.collect }
)(RelatedItem);