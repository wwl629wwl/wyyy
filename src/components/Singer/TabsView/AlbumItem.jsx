import React from "react";
import './AlbumItem.less';
import PropTypes from 'prop-types';

const AlbumItem = function AlbumItem(props) {
    // console.log(props);
    let { info } = props;
    let imgUrl = `${info.picUrl}?param=400y320`;

    return <div className="album-item-box item">
        <div className="pic album-info" style={{ backgroundImage: `url(${imgUrl})` }}>
            <div className="album-titles">
                <div className="ablum-title">{info.name}</div>
                <div className="ablum-subtitle"></div>
            </div>
        </div>
    </div>
};

/* 做属性验证 */
AlbumItem.defaultProps = {
    info: null
};

AlbumItem.propTypes = {
    info: PropTypes.object
}

export default AlbumItem;