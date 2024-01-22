import React, { useEffect, useState } from "react";
import './SingerRight.less';
import { Button } from "antd";
import TabsComponent from "./TabsComponent";
import PropTypes from 'prop-types';
import HotSongs from "./TabsView/HotSongs";
import AllAlbum from "./TabsView/AllAlbum";
import RelatedMV from "./TabsView/RelatedMV";
import SingerInfo from './TabsView/SingerInfo';

const SingerRight = function SingerRight(props) {
    let { info: { artist }, id, info: sInfo } = props;
    let singerUrl = `${sInfo.picUrl}?param=640y300`;
    let imgUrl = (`${artist?.picUrl}?param=640y300`);
    let resultUrl = '';
    if (singerUrl === undefined) {
        resultUrl = imgUrl;
    } else {
        resultUrl = singerUrl;
    }
    let [items, setItems] = useState([
        {
            key: '1',
            label: '热门单曲',
            children: <HotSongs id={id} />
        },
        {
            key: '2',
            label: '所有专辑',
            children: <AllAlbum id={id} />,
        },
        {
            key: '3',
            label: '相关 MV',
            children: <RelatedMV id={id} />,
        },
        {
            key: '4',
            label: '歌手介绍',
            children: <SingerInfo id={id} />
        },
    ])

    /* 更新items 数组中每一项的id */
    useEffect(() => {
        const updatedItems = items.map(item => ({
            ...item,
            children: React.cloneElement(item.children, { id }),
        }));
        setItems(updatedItems);
    }, [id])

    // console.log(artist);
    return <div className="singer-right-box">
        <div className="header">
            <div className="inner" style={{ backgroundImage: `url(${resultUrl})` }}>
                <div className="name-wrapper">
                    <span className="left">
                        <span className="shadow-name">{artist?.name}</span>
                        <span className="shadow-name alias">{artist?.alias[0]}</span>
                        <span className="shadow-name alias">{artist?.alias[1]}</span>
                    </span>
                    <Button><i className="iconfont">&#xe61c;</i>个人主页</Button>
                    <Button><i className="iconfont">&#xe639;</i>收藏</Button>
                </div>
            </div>
        </div>
        <div className="tabs-box">
            <TabsComponent items={items} />
        </div>
    </div>
};
/* 做属性验证 */
SingerRight.defaultProps = {
    info: null
};

SingerRight.propTypes = {
    info: PropTypes.object
}


export default SingerRight;