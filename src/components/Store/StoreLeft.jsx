import { Collapse } from "antd";
import React from "react";
import ContextItem from "./ContextItem";
import './StoreLeft.less';

const mapListToRealtedItem = (array) => {
    return <div className="store-album-list">
        {array.map(item => {
            let { id } = item;
            return <ContextItem info={item} key={`${id}+mystore`} />

        })}
    </div>
}

const StoreLeft = function StoreLeft(props) {

    /* 从属性中结构出父组件传递来的信息 */
    let { playlist } = props;

    /* 从playlist中过滤出 我创建的歌单 和 我收藏的歌单 */
    let mineCreateList = playlist.filter(item => item.subscribed === false);
    let followList = playlist.filter(item => item.subscribed === true);
    const mineList = mapListToRealtedItem(mineCreateList);
    const followsList = mapListToRealtedItem(followList);

    const items = [
        {
            key: '1',
            label: '创建的歌单',
            children: mineList,
        },
        {
            key: '2',
            label: '收藏的歌单',
            children: followsList
        }
    ];
    const onChange = (key) => {

    };

    return <div className="store-left-box">
        <div className="collapse-box" style={{ overflow: 'auto', height: '100%' }}>
            <Collapse items={items} defaultActiveKey={['1', '2']} onChange={onChange} />;
        </div>

    </div>
};

export default StoreLeft;