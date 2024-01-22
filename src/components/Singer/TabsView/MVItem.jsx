import React from "react";
import './MVItem.less';
import { handleDuration } from '../../../api/method.js';
import PropTypes from 'prop-types';

const MVItem = function MVItem(props) {
    let { info } = props;
    // 设置img大小
    let imgUrl = `${info.imgurl}?param320y240`
    return <div className="mv-item-box">
        <div className="mv-cover" style={{ backgroundImage: `url(${imgUrl})` }}>
            <div className="playcnt">
                <span className="cnt-number">{info.playCount}</span>
                <i className="iconfont"
                    style={{
                        width: '14px', height: '14px', color: '#fff',
                        lineHeight: '14px', textAlign: 'center'
                    }}>&#xe971;</i>
            </div>
            <div className="duration">{handleDuration(info.duration)}</div>
        </div>
    </div>
};

/* 做属性验证 */
MVItem.defaultProps = {
    info: null
};

MVItem.propTypes = {
    info: PropTypes.object
}


export default MVItem;