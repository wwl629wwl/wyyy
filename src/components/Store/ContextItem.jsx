import React, { useContext } from "react";
import './ContextItem.less';
import { Image } from "antd";
import PropTypes from 'prop-types';
import { MyContext } from '../../views/StoreView/StoreAlbum';

const ContextItem = function ContextItem(props) {
    let { info } = props;
    let { trackCount, id } = info;

    const { onData } = useContext(MyContext)
    return <div className="context-item-box" onClick={() => { onData(id) }}>
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
            <div className="sub-title">{`共 ${trackCount} 首`}</div>
        </div>
    </div>
}

/* ContextItem 做属性验证 */
ContextItem.defaultProps = {
    info: null,
};

ContextItem.propTypes = {
    info: PropTypes.object,
};

export default ContextItem;