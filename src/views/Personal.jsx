import React, { useEffect, useState } from "react";
import './Personal.less';
import ListLeft from '../components/PlayList/ListLeft';
import { connect } from 'react-redux';
import { Button, Image, Tabs } from "antd";
import api from "../api";
import PerMusic from "./PersonalView/PerMusic";
import PerCharts from "./PersonalView/PerCharts";
import PerEvent from "./PersonalView/PerEvent";
import action from '../store/action';
import PerAbout from "./PersonalView/PerAbout";


const Personal = function Personal(props) {

    let { info, queryUserInfoAsync } = props;


    let [userDetail, setUserDetail] = useState({});

    const items = [
        {
            key: '1',
            label: '音乐',
            children: <PerMusic uid={info?.userId} />,
        },
        {
            key: '2',
            label: '排行',
            children: <PerCharts uid={info?.userId} />,
        },
        {
            key: '3',
            label: '动态',
            children: <PerEvent uid={info?.userId} />,
        },
        {
            key: '4',
            label: '关于',
            children: <PerAbout uid={info?.userId} />,
        },
    ];

    useEffect(() => {
        /* 为了避免用户刷新导致info为null的问题
        如果info 为null 在Personal页面在派发一次redux请求 在请求完成之后 在进行异步请求 
        如果info 不为null  则直接进行异步请求
        */
        if (!info) {
            queryUserInfoAsync()
        }
        (async () => {
            try {
                let { profile } = await api.queryUserDetail(info?.userId);
                setUserDetail(profile);
            } catch (_) { }
        })()
    }, [])

    return <div className="personal-box">
        <ListLeft />
        <div className="personal-detail-box">
            {userDetail ? <div className="user-bgi" style={{ backgroundImage: `url(${userDetail.backgroundUrl}?prama1280y600)` }}>
                <div className="user-avatar">
                    <Image src={`${userDetail.avatarUrl}?prama150y150`} preview={false} className="avatar-img" />
                </div>
                <div className="username">
                    {userDetail.nickname}
                    <span className="gender" style={{ color: `${userDetail.gender === 1 ? '#2196f3' : '#F06292'}` }}>{userDetail.gender === 1 ? <i className="iconfont">&#xe625;</i> : <i className="iconfont">&#xe676;</i>}</span>
                </div>
                <div className="user-follows">
                    关注  {userDetail.follows} |  粉丝 {userDetail.followeds}
                </div>
                <div className="user-update">
                    <Button type="text"><i className="iconfont">&#xea3f;</i>编辑资料</Button>
                </div>
            </div> : null}
            <Tabs defaultActiveKey="1" items={items} className="user-tabs" />
        </div>
    </div>
};

export default connect(
    state => state.base,
    action.base
)(Personal);