import React from "react";
import { NavLink } from "react-router-dom";
import './SVideoItem.less';
import { handleDuration } from "../../api/method";
import { Badge } from "antd";

const SVideoItem = function SVideoItem(props) {
    let { info } = props;
    // console.log(props)
    let { vid, coverUrl, durationms, playTime, title, type } = info;
    let covUrl = `${coverUrl}?param=320y240`
    return <NavLink to={`/video/${vid}`} className='search-video-item' state={{ type }}>
        <div className="cover-pic" style={{ backgroundImage: `url(${covUrl})` }}>
            <div className="playcnt">
                {/* Math.floor 向下取整 */}
                <span className="cnt-number">{Math.floor(playTime / 10000)}万</span>
                <i className="iconfont" style={{ width: '22px', height: '22px', lineHeight: '22px' }}>&#xe60f;</i>
            </div>
            <div className="duration">{handleDuration(durationms)}</div>
        </div>
        <span className="name">
            <Badge color="#f06292">MV</Badge>
            <span>{title}</span>
        </span>
    </NavLink>

};

export default SVideoItem;