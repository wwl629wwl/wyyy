import React from "react";
import './RightDetail.less';
import { Switch, Button } from "antd";
import MusicListItem from "../PlayList/MusicListItem";
import PropTypes from 'prop-types';

const RightDetail = function RightDetail(props) {

    /* 这里定义一个数组 数组的每一项是一个对象 对象包含一个title和subtitle 
    根据传进来的type不同 去显示header的不同内容 */
    const desc = [
        { title: '私人 FM', subtitle: '找到只属于你的频率' },
        { title: '每日歌曲推荐', subtitle: '根据你的音乐口味生成，每天 6:00 更新' }
    ]
    let { data, type } = props;

    return <div className="right-detail-box">
        <div className="right-detail-header">
            <div className="header-bcg"></div>
            <div className="header-title">
                <div className="title"><span>{desc[type].title}</span> {type === 0 ? <Switch defaultChecked /> : null}</div>
                <div className="sub-title">{desc[type].subtitle}</div>
            </div>
        </div>
        {type === 1 ? <div className="play-all"><Button> <i className="iconfont">&#xe931;</i> 播放全部</Button></div> : null}
        <div className="play-list">
            {data ? data.map((item, index) => {
                return <MusicListItem key={`${item.id}+${index}`} index={index} info={item} />
            }) : null}
        </div>
    </div>
};

/* 做属性验证 */
RightDetail.defaultProps = {
    data: [],
    type: 0
};

RightDetail.propTypes = {
    data: PropTypes.array,
    type: PropTypes.number
};

export default RightDetail;