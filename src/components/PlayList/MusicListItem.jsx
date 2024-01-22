import React, { useState } from "react";
import PropTypes from 'prop-types';
import { message, notification } from "antd";
import './MusicListItem.less';
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import ButtonAgain from "../ButtonAgain";
import api from "../../api";
import action from "../../store/action";
import _ from '../../assets/utils.js';


/**
 * format millisecond to `mm:ss`
 * @description 处理时间的方法
 * @param {number} ms
 */
const handleDuration = (ms) => {
    if (typeof ms !== 'number') return '00:00';
    const t = ms / 1000;
    const m = Math.floor(t / 60);
    const mm = m > 9 ? `${m}` : `0${m}`;
    const s = Math.floor(t % 60);
    const ss = s > 9 ? `${s}` : `0${s}`;
    return `${mm}:${ss}`;
}

const MusicListItem = function MusicListItem(props) {
    let { info, index, score } = props;
    let { ar, artists, id } = info;
    // console.log(id)

    // 专辑的id 点击需要跳转
    let albumId = info?.al?.id;

    const backgroundColor = `#F48FB1`;
    const scoreValue = `${score}%`;
    const gradientStyle = `linear-gradient(90deg, ${backgroundColor} ${scoreValue}, transparent ${scoreValue})`
    // console.log(gradientStyle);

    /* --------------------------------------------*/
    /* 从props中 解构出redux容器中的数据 */
    let { base: { isLogin }, store: { list }, play: { playlist, playinfo }, setCollectPopUpShow,
        setMusicId, addPlayMusicInfoToList, setPlayMusicInfo, setPlayTag, setPlaySongName } = props;
    let myList = list.filter(item => item.subscribed === false);
    let localPlaylist = _.storage.get('playlist');
    let localPlayInfo = _.storage.get('playinfo');
    /* 定义所需的状态 */
    const [napi, contextHolder] = notification.useNotification();

    /* 点击收藏按钮的方法 */
    const subscribe = async () => {
        /* 判断是否登录 */
        if (isLogin === false) {
            message.error('请先登录');
            return;
        }
        /* 登录了点击收藏按钮 */
        setMusicId(id);
        setCollectPopUpShow();
    };

    /* 双击播放的方法 */
    const doublePlay = () => {
        setPlayTag(false);
        if (localPlayInfo !== null && localPlayInfo?.id === info?.id) {
            setPlayTag(false)
            let audioPlay = document.querySelector('#audioPlay');
            setPlayTag(true);
            audioPlay.play();
            return;
        }
        /* 将这些信息存到本地localstorage中 */
        _.storage.set('playinfo', info);
        setPlayMusicInfo(info);
        // 设置播放标识
        setPlayTag(true);
        setPlaySongName(info.id);
        // 1. localstorage为空 那么表示本地没有缓存 则新创建一个数组来存储数据
        if (localPlaylist === null) {
            let templist = [];
            templist.unshift(info);
            localPlaylist = templist;
            _.storage.set('playlist', localPlaylist);
            // /* 同步到store容器中 */
            setPlayMusicInfo(info);
            addPlayMusicInfoToList(localPlaylist);
            return;
        }
        // 2. localstorage不为空 需要判断localstorage中是否有这一项 如果有则不存储 也不派发
        let isHave = localPlaylist.some(item => item?.al?.id === info?.al?.id);
        console.log(isHave);
        // 3. localstorage中有这一项 则直接返回不做任何处理
        if (isHave === true) {
            return;
        }
        // 4. localstorage中没有这一项 怎加入到localstorage中
        localPlaylist.unshift(info);
        _.storage.set('playlist', localPlaylist);
        /* 同步到store容器中 */
        addPlayMusicInfoToList(localPlaylist);
    }

    /* 添加下一首播放 */
    const addNextPlay = () => {
        // Array.splice(索引，删除个数，插入的值)会改变原数组
        /* 1. 先判断播放列表中是否含有这一项 */
        let isHave = playlist.some(item => item.id === info.id);
        console.log(isHave);
        if (isHave) {
            napi.open({
                description: '已经在播放列表中了',
                duration: 1,
                placement: 'bottom',
                closeIcon: false
            })
            return;
        }
        /* 1. 先判断现在播放歌曲的index */
        let index = playlist.findIndex(item => item.id === playinfo.id);
        /* 2. 将需要添加的歌曲的信息 并加入到playlist相对应的index之后 并同步到store容器中 */
        // 进行一次深拷贝
        let newPlayList = Array.from(playlist);
        /* 判断播放列表是否已经加入了这首歌 如何已经加入了 则不做任何处理 */
        console.log(isHave);
        newPlayList.splice(index + 1, 0, info);
        _.storage.set('playlist', newPlayList);
        addPlayMusicInfoToList(newPlayList);
        napi.open({
            description: '已添加到播放列表',
            duration: 1,
            placement: 'bottom',
            closeIcon: false
        })
    }


    return <div className="music-list-item"
        onDoubleClick={doublePlay}
        style={{ backgroundImage: `${score !== undefined ? gradientStyle : {}}` }}>
        <div className="item-box">
            <div className="track-col index">{index + 1}</div>
            <div className="track-col name">{info.name}</div>
            {/* <div className="track-col artist"><NavLink to={isArtists ? '' : `/artists/${id}`} className='click' >{info?.ar[0]?.name}</NavLink></div> */}
            <div className="track-col artist">
                {/* 因为这个组件要复用 在歌单详情的时候 传入的数据中是ar 但是在搜索的时候 传入的数据是artists 
                    因此判断 如何ar不为空 则表明是artists为空 因此对ar进行map映射 反之相同
                */}
                {ar ? ar.map((item, index) => {
                    let length = ar.length;
                    let { id, name } = item;
                    return <NavLink to={`/artists/${id}`} key={`${id}+${name}`} className='click' >{`${item.name}${index === (length - 1) ? '' : ' / '}`}</NavLink>
                }) : artists.map((item, index) => {
                    let length = artists.length;
                    let { id, name } = item;
                    return <NavLink to={`/artists/${id}`} key={`${id}+${name}`} className='click' >{`${item.name}${index === (length - 1) ? '' : ' / '}`}</NavLink>
                })}

            </div>
            <div className="track-col album"><NavLink to={`/album/${albumId}`} className='click'>{info?.al?.name}</NavLink></div>
            <div className="track-col duration">{handleDuration(info?.dt || info?.duration)}</div>
            <div className="track-col buttons">
                <ButtonAgain size='small' onClick={subscribe}><i className="iconfont">&#xe61b;</i></ButtonAgain>
                <ButtonAgain size='small' onClick={addNextPlay}><i className="iconfont">&#xea72;</i></ButtonAgain>
            </div>
            <>
                {contextHolder}
            </>
        </div>
    </div>
};

/* 做属性验证 */
MusicListItem.defaultProps = {
    info: null,
    index: 0
};

MusicListItem.propTypes = {
    info: PropTypes.object,
    index: PropTypes.number
};


export default connect(
    state => {
        return {
            base: state.base,
            store: state.store,
            play: state.play
        }
    },
    { ...action.collect, ...action.subscribe, ...action.play }
)(MusicListItem);