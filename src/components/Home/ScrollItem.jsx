import React from "react";
import './ScrollItem.less'
import { Image } from "antd";
import { NavLink } from "react-router-dom";
import PropTypes from 'prop-types';

/* 处理人数的方法 */
const handleCount = (val) => {
    if (val < 100000) return Math.trunc(val).toString();
    return `${Math.trunc(val / 10000)} 万`;
}

/**
 * @description 通过对这个组件进行封装可以实现循环使用 主要有ItemTitle以及传入的数据
 * @returns 
 */
const ScrollItem = function ScrollItem(props) {

    let { data: { name, id, picUrl, playCount }, type } = props;
    return <NavLink className='scroll-item-box' to={`/playlist/${id}`} replace={true} state={type}>
        <div className="cover">
            <Image src={picUrl} preview={false} placeholder={true} width={'160px'} height={'160px'} />
            {playCount ? <div className="mask">
                <i className="iconfont" style={{ fontSize: '18px' }}>&#xe621;</i>
                <span style={{ marginLeft: '6px', fontSize: '16px' }}>{handleCount(playCount)}</span>
            </div> : null}
        </div>
        <div className="caption">{name}</div>
    </NavLink>
};

/* 因为ScrollItem会被其他组件使用 因此需要做属性验证呢 */
/* type=1是推荐音乐
 * type=2是最新音乐
 * type=3是推荐mv
*/
ScrollItem.defaultProps = {
    data: null,
    type: 1
};

ScrollItem.propTypes = {
    data: PropTypes.object,
    type: PropTypes.number
};


export default ScrollItem;