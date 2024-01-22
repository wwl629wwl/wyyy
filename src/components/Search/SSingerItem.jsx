import React from "react";
import './SSingerItem.less';

const SSingerItem = function SSingerItem(props) {
    let { info: { picUrl, name } } = props;
    let bgcUrl = `${picUrl}?param400y320`
    return <div className="search-singer-item item" >
        <div className="bgc-box cover" style={{ backgroundImage: `url(${bgcUrl})` }}>
            <div className="title">
                <div className="singer-title">{name}</div>
            </div>
        </div>
    </div>
};

export default SSingerItem;