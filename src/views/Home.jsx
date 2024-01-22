import React, { useEffect, useState } from "react";
import ActionItem from "../components/Home/ActionItem";
import api from "../api";
import ScrollItem from "../components/Home/ScrollItem";
import './Home.less';
import { connect } from 'react-redux';
import action from "../store/action";

/**
 * @abstract Home主页面
 * @returns 
 */
const Home = function Home(props) {

    /* 定义所需要的状态 */
    let [recomList, setRecomList] = useState([]),
        [newMusicList, setNewMusicList] = useState([]),
        [mvList, setMvList] = useState([]);

    let { queryUserPlaylist } = props;
    /* 请求推荐歌单数据 */
    useEffect(() => {
        (async () => {
            try {
                await api.queryRecommendList().then(response => {
                    let { result } = response;
                    setRecomList(result);
                }).catch(error => {
                    console.log(error);
                });
            } catch (_) { };

        })();
    }, []);

    /* 请求最新音乐数据 */
    useEffect(() => {
        (async () => {
            try {
                await api.queryNewMusicList().then(response => {
                    let { albums } = response;
                    setNewMusicList(albums);
                }).catch(error => {
                    console.log(error);
                });
            } catch (_) { };

        })();

    }, []);

    /* 请求最新MV */
    useEffect(() => {
        (async () => {
            try {
                await api.queryNewMV().then(response => {
                    let { result } = response;
                    setMvList(result);
                }).catch(error => {
                    console.log(error);
                });
            } catch (_) { };

        })();
    }, []);

    /* 获取用户信息 */
    useEffect(() => {
        (async () => {
            try {
                // await api.login(15715841271, 'wwl001226').then(response => {
                //     // console.log(response);
                // })

            } catch (_) { }
        })()
    }, []);

    return <div className="home-box container">
        <ActionItem />
        {/* 通过条件判断来是否渲染 因为是异步请求 所以如果List为空则通过props给子组件传递信息则为空 */}
        {/* {recomList.length > 0 && <ScrollItem data={recomList[0]} />} */}
        <div className="mus-card ">
            <div className="header">推荐歌单</div>
            <div className="scroll-box">
                {recomList?.length > 0 ? recomList.map(item => {
                    let { id } = item;
                    return <ScrollItem key={id} data={item} type={1} />
                }) : null}
            </div>
        </div>
        <div className="mus-card">
            <div className="header">最新音乐</div>
            <div className="scroll-box">
                {newMusicList.length > 0 ? newMusicList.map(item => {
                    let { id } = item;
                    return <ScrollItem key={id} data={item} type={2} />
                }) : null}
            </div>
        </div>
        <div className="mus-card">
            <div className="header">推荐MV</div>
            <div className="scroll-box">
                {mvList.length > 0 ? mvList.map(item => {
                    let { id } = item;
                    return <ScrollItem key={id} data={item} type={3} />
                }) : null}
            </div>
        </div>
        <div className="block"></div>
    </div>
};

export default connect(
    state => state.base,
    action.store
)(Home);