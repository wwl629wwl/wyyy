import React, { useEffect, useState } from "react";
import './PlayListItem.less';
import _ from '../../assets/utils.js';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import LinkIcon from '@material-ui/icons/Link';
import ClearIcon from '@material-ui/icons/Clear';
import { Button, message, Tooltip } from 'antd';
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';
import DeleteIcon from '@material-ui/icons/Delete';
import { connect } from "react-redux";
import action from "../../store/action/index.js";
import api from "../../api/index.js";


const PlayListItem = function PlayListItem(props) {

    /* 从redux容器中解构出需要的数据和方法 */
    let { play: { playinfo, playlist },
        setPlayMusicInfo, setCollectPopUpShow, setListPopoverHide,
        setMusicId, addPlayMusicInfoToList, setPlayTag } = props;
    let { base: { isLogin } } = props;

    let localList = _.storage.get('playlist');

    /* 定义需要的状态 */
    let [urlList, setUrlList] = useState([]);

    /* 点击方法 */
    const listItemClick = (item) => {
        console.log(item);
        setPlayTag(false);
        if (item?.id === playinfo?.id) {
            setPlayTag(false)
            let audioPlay = document.querySelector('#audioPlay');
            setPlayTag(true);
            audioPlay.play();
            return;
        }
        _.storage.set('playinfo', item);
        setPlayMusicInfo(item);
        setPlayTag(true);
        let audioPlay = document.querySelector('#audioPlay');
        audioPlay.play();
    }

    console.log(playlist);

    /* 收藏歌曲的方法 */
    const storeSong = (id) => {
        if (isLogin === false) {
            message.error('您还未登录');
            return;
        } else {
            setCollectPopUpShow();
            setListPopoverHide();
            setMusicId(id);
        }
    }

    /* 删除方法 */
    const deleteSong = (id, event) => {
        // console.log(id);
        // 阻止事件冒泡，避免触发 listItemClick
        event.stopPropagation();
        /* 找到符合的对象的index */
        // const index = localList.findIndex(item => item.id === id);
        if (id === playinfo?.id) {
            /* 删除的是正在播放的歌曲 那么需要将后面一首歌作为正在播放的歌曲 */
            let index = localList.findIndex(item => item.id === id);
            let newPlayInfo = localList[index + 1];
            let newPlayList = localList.filter(item => item.id !== id);
            _.storage.set('playinfo', newPlayInfo);
            _.storage.set('playlist', newPlayList);
            setPlayMusicInfo(newPlayInfo);
            addPlayMusicInfoToList(newPlayList);
        } else {
            /* 删除的不是正在播放的歌曲，那么直接从list中删除即可 */
            let newPlayList = localList.filter(item => item.id !== id);
            _.storage.set('playlist', newPlayList);
            addPlayMusicInfoToList(newPlayList);
        }
    }

    /* 请求数据 */
    useEffect(() => {
        (async() => {
            let result = await Promise.all(playlist.map(async item => {
                let { id } = item;
                let { data } = await api.queryMusicUrl(id);
                return data[0].url;
            }));
            console.log(result);
            // setUrlList(result);
        })()
    }, [])


    return <div className="play-list">
        <div className="list-header">
            <span className="count">共 {playlist?.length} 首</span>
            <div className="buttons">
                <Button onClick={storeSong.bind(null, playinfo?.id)}><LibraryAddIcon style={{ fontSize: '14px' }} />收藏</Button>
                <Button><DeleteIcon style={{ fontSize: '14px' }} />清空</Button>
            </div>
        </div>
        {playlist.length > 0 ? playlist.map((item, index) => {
            let { id } = item;
            return <div className="play-list-item" key={id} onClick={listItemClick.bind(null, item)}>
                <div className="item-action">
                    {id === playinfo.id ? <VolumeUpIcon style={{ fontSize: '14px', color: '#F20056' }} /> : index + 1}
                    {/* {index + 1} */}
                </div>
                <div className="item-title">
                    {item?.name}  -  <span className="artist">{item?.ar[0]?.name}</span>
                </div>

                <div className="action-after">
                    <Tooltip title='来自歌单' placement="bottom" style={{ fontSize: '12px' }}>
                        <LinkIcon style={{ fontSize: '16px', marginRight: '8px' }} />
                    </Tooltip>
                    <Tooltip title='删除' placement="bottom">
                        <ClearIcon style={{ fontSize: '16px' }} onClick={(event) => deleteSong(id, event)} />
                    </Tooltip>

                </div>
                <div className="loading">
                    {urlList[index] ? '' : 'loading'}
                </div>
            </div>
        }) : null}

    </div>
}

export default connect(
    state => {
        return {
            play: state.play,
            base: state.base
        }
    },
    { ...action.play, ...action.collect, ...action.check, ...action.subscribe }
)(PlayListItem);