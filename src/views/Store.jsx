import React from "react";
import './Store.less';
import { Tabs } from "antd";
import { SearchOutlined } from '@ant-design/icons';
import StoreSearch from "./StoreView/StoreSearch";
import StoreAlbum from "./StoreView/StoreAlbum";
import StoreSinger from "./StoreView/StoreSinger";
import StoreSheet from "./StoreView/StoreSheet";
import StoreVideo from "./StoreView/StoreVideo";
import StoreDJ from "./StoreView/StoreDJ";

const Store = function Store() {

    const onChange = (key) => {
        console.log(key);
    };
    const items = [
        {
            key: '1',
            label: <SearchOutlined />,
            children: <StoreSearch />,
        },
        {
            key: '2',
            label: '歌单',
            children: <StoreAlbum />,
        },
        {
            key: '3',
            label: '专辑',
            children: <StoreSheet />,
        },
        {
            key: '4',
            label: '歌手',
            children: <StoreSinger />,
        },
        {
            key: '5',
            label: '视频',
            children: <StoreVideo />,
        },
        {
            key: '6',
            label: '电台',
            children: <StoreDJ />,
        },
        {
            key: '7',
            label: '',
            children: 'Content of Tab Pane 3',
            disabled: true
        },
    ];

    return <Tabs defaultActiveKey="1" items={items} onChange={onChange} className="store-box" />;
};

export default Store;