import React from "react";
import './StoreSearch.less';
import { Empty, Image, Input } from "antd";

const StoreSearch = function StoreSearch() {
    return <div className="store-search-box">
        <div className="input-box">
            <Input placeholder="搜索我的收藏" />
        </div>
        <div className="empty-box">
            <Empty description={<span>搜索收藏的歌单、歌手、歌曲</span>}  />
        </div>
    </div>
}

export default StoreSearch;