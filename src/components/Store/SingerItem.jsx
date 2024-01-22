import React, { useContext } from "react";
import { Image } from "antd";
import './SingerItem.less';
import PropTypes from 'prop-types';


const SingerItem = function SingerItem(props) {

    // console.log(props);
    let { info, id = 0, type, method } = props;
    return <div className="singer-item-box" onClick={() => { method(id) }} >
        <div className="avatar">
            <div className="avatar-box" style={{ width: '40px', height: '40px', fontSize: '20px' }}>
                <div className="inner">
                    <Image src={info.avatarUrl || info.picUrl || `${info.coverUrl}?prama80y80`} preview={false} placeholder={true} />
                </div>
            </div>
        </div>
        <div className="content">
            <div className="content-title" >
                {info.nickname || info.name || info.title}
            </div>
            <div className="sub-title" >{(type === 1 && `专辑: ${info?.albumSize} /  MV: ${info?.mvSize}`) ||
                (type === 2 && `${info?.artists[0]?.name} / ${info?.size}`) ||
                (type === 3 && info?.creator[0].userName) || (type === 4 && `${info?.dj?.nickname} / ${info?.programCount}期`)}

            </div>
        </div>
    </div>
}

/* SingerItem 做属性验证 */
SingerItem.defaultProps = {
    info: null,
    type: 1,
    id: 0,
    method: null
};

SingerItem.propTypes = {
    info: PropTypes.object,
    type: PropTypes.number,
    id: PropTypes.number,
    method: PropTypes.func
};

export default SingerItem;