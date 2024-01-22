import React from "react";
import { Tabs } from "antd";
import './TabsComponent.less';
import PropTypes from 'prop-types';


const TabsComponent = function TabsComponent(props) {
    /* 通过传入不同的items可以实现组件的复用 */
    let { items, onChange, defaultActiveKey } = props;
    /* 通过children属性 去自定义组件 */
    return <>
        <Tabs defaultActiveKey={defaultActiveKey}
            centered
            items={items}
            onChange={onChange}
        />
    </>
};

/* 做属性验证 */
TabsComponent.defaultProps = {
    items: [],
    onChange: null,
    defaultActiveKey: '1'
};

TabsComponent.propTypes = {
    info: PropTypes.array,
    onChange: PropTypes.func,
    defaultActiveKey: PropTypes.string
}

export default TabsComponent;