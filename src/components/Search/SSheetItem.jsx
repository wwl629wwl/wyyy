import React from "react";
import { NavLink } from "react-router-dom";

const SSheetItem = function SSheetItem(props) {
    let { info } = props;
    let { coverImgUrl, creator, playCount, trackCount, id } = info;
    let coverUrl = `${coverImgUrl}?param=400y320`
    return <NavLink style={{ display: 'block' }} className='search-sheet-box item' >

        <div className="cover-box cover" style={{ backgroundImage: `url(${coverUrl})` }}>
            <div className="media-title">
                <div className="card-title">{info?.name}</div>
            </div>
        </div>
        <div className="card-header">
            <div className="card-header-title">
                <div className="card-header-title">
                    <div className="header-title">
                        {creator?.nickname}
                    </div>
                    <div className="header-sub-title">
                        {trackCount}首, {playCount}播放
                    </div>
                </div>
            </div>
        </div>
    </NavLink>
};

export default SSheetItem;