import { Image } from "antd";
import React from "react";
import './SAlbumItem.less';
import { formatDate } from '../../api/method.js';

const SAlbumItem = function SAlbumItem(props) {
    let { info } = props;
    let { artist, publishTime, id } = info;
    let avatarUrl = `${artist?.picUrl}?param=80y80`
    let picUrl = `${info?.blurPicUrl}?param=400y320`
    return <div className="search-album-item item">
        <div className="header">
            <div className="header-avatar" style={{ width: '40px', height: '40px', fontSize: '20px' }}>
                <div className="inner" >
                    <Image src={avatarUrl} preview={false} />
                </div>

            </div>
            <div className="header-title">
                <div className="header-title">{artist.name}</div>
                <div className="header-sub-title">{formatDate(publishTime)}</div>
            </div>
        </div>
        <div className="album-pic cover" style={{ backgroundImage: `url(${picUrl})` }}>
            <div className="media-title">
                <div className="card-title">{info?.name}</div>
            </div>
        </div>
    </div>
};

export default SAlbumItem;