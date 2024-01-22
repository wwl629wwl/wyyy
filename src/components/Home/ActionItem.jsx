import React from "react";
import './ActionItem.less';
import { NavLink } from "react-router-dom";
import { connect } from 'react-redux';
import { message } from "antd";

const ActionItem = function ActionItem(props) {

    let { info } = props;

    const navlinkClick = () => {
        if (!info) {
            message.error('请先登录');
        }
    }

    return <div className="actions-box">

        <NavLink className='action-item' to='/personfm' onClick={navlinkClick}>
            <div className="item-icon text-color">
                <i className="iconfont" style={{ fontSize: '48px', width: '48px', height: '48px' }}>
                    &#xe64e;
                </i>
            </div>
            <p className="title">私人 FM</p>
        </NavLink>
        <NavLink className='action-item' to='/dailysongs' onClick={navlinkClick}>
            <div className="item-icon text-color">
                <i className="iconfont" style={{ fontSize: '48px', width: '48px', height: '48px' }}>
                    &#xe600;
                </i>
            </div>
            <p className="title">每日推荐</p>
        </NavLink>
        <NavLink className='action-item'>
            <div className="item-icon text-color">
                <i className="iconfont" style={{ fontSize: '48px', width: '48px', height: '48px' }}>
                    &#xe6bf;
                </i>
            </div>
            <p className="title">歌单</p>
        </NavLink>
        <NavLink className='action-item'>
            <div className="item-icon text-color">
                <i className="iconfont" style={{ fontSize: '48px', width: '48px', height: '48px' }}>
                    &#xe601;
                </i>
            </div>
            <p className="title">排行榜</p>
        </NavLink>
    </div>
};

export default connect(
    state => state.base
)(ActionItem);