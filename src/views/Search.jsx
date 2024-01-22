import React, { useState } from "react";
import './Search.less';
import TabsComponent from "../components/Singer/TabsComponent";
import SMusic from "./SearchView/SMusic";
import SSinger from "./SearchView/SSinger";
import SAlbum from "./SearchView/SAlbum";
import SSheet from "./SearchView/SSheet";
import SMV from "./SearchView/SMV";
import SUser from "./SearchView/SUser";


const Search = function Search(props) {

    let { location } = props;

    let [tabKey, setTabKey] = useState(1),
        [activeKey, setActiveKey] = useState('1');

    /* tabs的item的内容 加入children属性可以定义不同页面 */
    const items = [
        {
            key: '1',
            label: '单曲',
            children: <SMusic type={tabKey} keywords={location.state.params} />
        },
        {
            key: '100',
            label: '歌手',
            children: <SSinger type={tabKey} keywords={location.state.params} />
        },
        {
            key: '10',
            label: '专辑',
            children: <SAlbum type={tabKey} keywords={location.state.params} />
        },
        {
            key: '1000',
            label: '歌单',
            children: <SSheet type={tabKey} keywords={location.state.params} />
        },
        {
            key: '1014',
            label: '视频',
            children: <SMV type={tabKey} keywords={location.state.params} />
        },
        {
            key: '1002',
            label: '用户',
            children: <SUser type={tabKey} keywords={location.state.params} />
        }
    ];

    /* 自定义的change方法 每次切换tab进行不同的请求 */
    /* 你可以使用React的useCallback钩子来包装onChange函数，并将tabKey作为依赖项。这样，每次切换Tab时，
    onChange函数的引用不会改变，子组件仍然可以访问到之前的tabKey值。 */
    const onChange = (key) => {
        setTabKey(key);
        setActiveKey(key.toString());
    }

    /* 根据tabKey值的不同请求响应的数据 */
    return <div className="search-result-box">
        <div className="tabs-box">
            <TabsComponent items={items} onChange={onChange} defaultActiveKey={activeKey} />
        </div>
    </div>
}

export default Search;