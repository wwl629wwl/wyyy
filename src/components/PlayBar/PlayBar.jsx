import React, { useEffect, useRef, useState } from "react";
import './PlayBar.less';
import cover from '../../assets/imgs/cover_default.webp';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Favorite from '@material-ui/icons/Favorite';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import VolumeDownIcon from '@material-ui/icons/VolumeDown';
import QueueMusicIcon from '@material-ui/icons/QueueMusic';
import RepeatIcon from '@material-ui/icons/Repeat';
import RepeatOneIcon from '@material-ui/icons/RepeatOne';
import GetAppIcon from '@material-ui/icons/GetApp';
import ShuffleIcon from '@material-ui/icons/Shuffle';
import { Button, Popover, Slider, notification, message } from "antd";
import PauseIcon from '@material-ui/icons/Pause';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowRoundedIcon from '@material-ui/icons/PlayArrowRounded';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';
import { connect } from "react-redux";
import action from "../../store/action";
import _ from '../../assets/utils.js';
import { handleDuration } from '../../api/method.js';
import api from "../../api/index.js";
import PlayListItem from './PlayListItem';
import { getRandomInt } from "../../api/method.js";
import { useNavigate, useLocation } from 'react-router-dom';



const PlayBar = function PlayBar(props) {

    /* 定义需要的状态 */
    let [playValue, setPlayValue] = useState('sequence'),
        [currentTime, setCurrentTime] = useState(0),
        [musicUrl, setMusicUrl] = useState(''),
        [totalTime, setTotalTime] = useState(0),
        [volume, setVolume] = useState(100),
        [musicTimer, setMusicTimer] = useState(null),
        [checkVolume, setCheckVolume] = useState(false),
        [volumeOpen, setVolumeOpen] = useState(false),
        [likeMusic, setLikeMusic] = useState(false);

    /* 定义需要的路由 */
    const navigate = useNavigate();
    const location = useLocation();

    /* 定义audio的ref */
    let audioRef = useRef(null);

    /* 从redux容器中结构出需要的数据 */
    let { play: { playinfo, playlist, tag }, song: { songAarry }, base: { isLogin },
        addPlayMusicInfoToList, setPlayMusicInfo, setPlayTag, subscribeSongId, reomoveSongId } = props;
    // console.log(playinfo);

    /* 从props中结构出popover的一些状态和方法 */
    let { check: { listShow, listCheck }, setListPopoverHide, setListPopoverShow } = props;
    /* ----------------------------------------------------------------------------- */
    /* 在组件创建的时候，这时候localstorage中的playinfo和playlist存储着我们的需要的信息
       而store容器中的数据为空，因此我们需要从localstorage中获取信息，并将其同步到store中，
       如果localstorage为空则表明，播放缓存已经超过时间，我们需要重新选择我们需要播放的歌曲
    */


    useEffect(() => {
        let array = songAarry[0];
        setLikeMusic(array?.some(item => item === playinfo?.id));
    }, [songAarry])

    useEffect(() => {
        if (playinfo !== null) {
            setCurrentTime(0);
            setTotalTime(playinfo.dt);
            return;
        }
        if (playinfo === null) {
            let localPlayInfo = _.storage.get('playinfo');
            let localPlayList = _.storage.get('playlist');
            if (localPlayInfo !== null && localPlayList !== null) {
                playinfo = localPlayInfo;
                playlist = localPlayList;
                setTotalTime(playinfo.dt);
                setPlayMusicInfo(playinfo);
                addPlayMusicInfoToList(playlist);
                return;
            }
            return;
        }
    }, [playinfo])

    /* 请求歌曲播放url */
    useEffect(() => {
        (async () => {
            try {
                let { data } = await api.queryMusicUrl(playinfo?.id);
                // 音乐的url不存在
                if (data[0]?.url === null) {
                    setMusicUrl(preState => preState);
                    return;
                }
                setMusicUrl(data[0].url);
            } catch (_) { }
        })()
    }, [playinfo])

    useEffect(() => {
        return () => {
            if (musicTimer) {
                /* 在组件销毁的时候 清除定时器 */
                clearInterval(musicTimer);
                setMusicTimer(null);
            }
        }
    }, [])

    /* 监听定时器的变化来清除定时器 */
    useEffect(() => {
        if (musicTimer && !tag) {
            clearInterval(musicTimer);
            setMusicTimer(null);
        }
    }, [tag, musicTimer])

    /* 监听musicUrl的变化来播放 */
    useEffect(() => {
        if (audioRef === null) {
            return;
        }
        if (tag === true && musicUrl) {
            audioRef.current.play();
            watchMusicInfo();
        }
        if (tag === false) {
            audioRef.current?.pause();
            clearInterval(musicTimer);
            setMusicTimer(null);
        }
    }, [tag, musicUrl])


    /* notification通知 */
    const [notiApi, contextHolder] = notification.useNotification();
    const openNotification = (text) => {
        notiApi.info({
            description: `${text}`,
            placement: 'bottom',
            duration: 0.5
        })
    };

    /* 定义需要的按钮方法 */
    /* 点击播放进行切换的方法 */
    const playOnChange = () => {
        if (playValue === 'sequence') {
            setPlayValue('repeat');
            openNotification('单曲循环');
        } else if (playValue === 'repeat') {
            setPlayValue('random');
            openNotification('随机播放');
        } else {
            setPlayValue('sequence');
            openNotification('顺序播放');
        }
    }

    /* 点击上一首歌播放的方法 */
    const prePlay = () => {
        let index = playlist.findIndex(item => item.id === playinfo.id);
        // 要检查 <audio> 元素是否正在播放，你可以使用 audioRef.current.paused 属性。
        // 这个属性返回一个布尔值，如果音频正在播放，则为 false，否则为 true。
        /* 1. 先判断audio是否在播放 */
        if (audioRef.current?.paused) {
            // 表明此时是暂停的状态 没有播放
            /* 2. 判断播放歌曲的index */
            if (index === 0) {
                // 表明是第一首歌 那么要播放最后一首歌
                let length = playlist.length;
                /* 3. 拿到歌曲的信息 */
                let newPlayInfo = playlist[length - 1];
                _.storage.set('playinfo', newPlayInfo);
                /* 4. 切换成功 并播放 */
                setPlayTag(true);
                setPlayMusicInfo(newPlayInfo);
            }
            /* 2. 判断播放歌曲的index */
            // 表明不是第一首歌 那么直接找到index之前的那一项
            /* 3. 拿到歌曲的信息 */
            let newPlayInfo = playlist[index - 1];
            _.storage.set('playinfo', newPlayInfo);
            /* 4. 切换成功 并播放 */
            setPlayTag(true);
            setPlayMusicInfo(newPlayInfo);
        } else {
            /* 1. 判断audio是否在播放 此时表明audio正在播放 */
            // 先暂停播放
            setPlayTag(false);
            /* 2.判断播放歌曲的index */
            if (index === 0) {
                // 表明是第一首歌 那么要播放最后一首歌
                let length = playlist.length;
                /* 3. 拿到歌曲的信息 */
                let newPlayInfo = playlist[length - 1];
                _.storage.set('playinfo', newPlayInfo);
                /* 4. 切换成功 并播放 */
                setPlayTag(true);
                setPlayMusicInfo(newPlayInfo);
            }
            /* 2. 判断播放歌曲的index */
            // 表明不是第一首歌 那么直接找到index之前的那一项
            /* 3. 拿到歌曲的信息 */
            let newPlayInfo = playlist[index - 1];
            _.storage.set('playinfo', newPlayInfo);
            /* 4. 切换成功 并播放 */
            setPlayTag(true);
            setPlayMusicInfo(newPlayInfo);
        }
    }

    const nextPlay = () => {
        let index = playlist.findIndex(item => item.id === playinfo.id);
        /* 1. 判断audio是否正在播放 */
        if (audioRef.current?.paused) {
            // 表明此时没有播放 处于暂停状态
            /* 2. 判断歌曲的index值 */
            if (index === playlist.length - 1) {
                // 表明此时是最后一首歌 那么直接播放第一首歌
                /* 3. 拿到歌曲的信息 */
                let newPlayInfo = playinfo[0];
                _.storage.set('playinfo', newPlayInfo);
                /* 4. 切换成功 并播放 */
                setPlayTag(true);
                setPlayMusicInfo(newPlayInfo);

            } else {
                /* 2. 判断歌曲的index值 */
                // 表明此时不是最后一首 那么直接播放下一首
                /* 3. 拿到歌曲的信息 */
                let newPlayInfo = playlist[index + 1];
                _.storage.set('playinfo', newPlayInfo);
                /* 4. 切换成功 并播放 */
                setPlayTag(true);
                setPlayMusicInfo(newPlayInfo);
            }
        } else {
            // 表明此时正在播放 处于播放状态
            // 1. 先暂停播放
            setPlayTag(false);
            if (index === playlist.length - 1) {
                // 表明此时是最后一首歌 那么直接播放第一首歌
                /* 3. 拿到歌曲的信息 */
                let newPlayInfo = playinfo[0];
                _.storage.set('playinfo', newPlayInfo);
                /* 4. 切换成功 并播放 */
                setPlayTag(true);
                setPlayMusicInfo(newPlayInfo);

            } else {
                /* 2. 判断歌曲的index值 */
                // 表明此时不是最后一首 那么直接播放下一首
                /* 3. 拿到歌曲的信息 */
                let newPlayInfo = playlist[index + 1];
                _.storage.set('playinfo', newPlayInfo);
                /* 4. 切换成功 并播放 */
                setPlayTag(true);
                setPlayMusicInfo(newPlayInfo);
            }
        }
    }

    /* 播放或暂停的按钮方法 控制音乐播放 */
    const pauseOrplay = () => {
        if (tag === false) {
            // 此时是暂停播放的状态 让audio播放并设置tag为true
            if (!volume) {
                audioRef.current.volume = 0.3;
                setVolume(0.3);
            }
            audioRef.current.play();
            watchMusicInfo();
            setPlayTag(true);
        } else {
            audioRef.current.pause();
            setPlayTag(false);
            clearInterval(musicTimer);
            setMusicTimer(null);
        }
    }

    /* 监听音乐播放信息 */
    const watchMusicInfo = () => {
        clearInterval(musicTimer);

        const theTimer = setInterval(() => {
            setMusicTimer(theTimer);
            //   如果音乐暂停了，结束定时器
            if (audioRef.current.paused) {
                clearInterval(musicTimer)
            }
            //   如果音乐播放结束了，结束定时器
            if (audioRef.current.ended) {

                clearInterval(musicTimer)
                setPlayTag(false);
                // 根据现在是顺序播放 循环播放还是随机播放
                if (playValue === 'sequence') {
                    // 相当于直接点击下一首播放 顺序播放
                    nextPlay();
                } else if (playValue === 'repeat') {
                    // 循环播放 则直接设置
                    audioRef.current.value = 0;
                    setPlayTag(true);
                    audioRef.current.play();
                } else {
                    // 随机播放
                    let index = playlist.findIndex(item => item.id === playinfo.id);
                    let length = playlist.length - 1;
                    let randomIndex = getRandomInt(0, length);
                    let newPlayInfo = {};
                    if (randomIndex === index) {
                        // 生成的随机数等于现在正在播放歌曲的索引
                        if (index === length) {
                            // 表明此时播放的是最后一首歌
                            randomIndex = getRandomInt(0, length - 1);
                            // 获取歌曲信息 并同步到storage和store中
                            newPlayInfo = playlist[randomIndex];
                            _.storage.set('playinfo', newPlayInfo);
                            setPlayMusicInfo(newPlayInfo);
                            // 播放
                            setPlayTag(true);
                            audioRef.current.play();
                        }
                        // 表明此时播放的不是最后一首歌
                        randomIndex = getRandomInt(index + 1, length);
                        // 获取歌曲信息 并同步到storage和store中
                        newPlayInfo = playlist[randomIndex];
                        _.storage.set('playinfo', newPlayInfo);
                        setPlayMusicInfo(newPlayInfo);
                        // 播放
                        setPlayTag(true);
                        audioRef.current.play();
                    }
                    // 生成的随机数不等于现在正在播放的索引
                    newPlayInfo = playlist[randomIndex];
                    _.storage.set('playinfo', newPlayInfo);
                    setPlayMusicInfo(newPlayInfo);
                    // 播放
                    setPlayTag(true);
                    audioRef.current.play();
                }

                return;
            }
            setCurrentTime(audioRef.current.currentTime);
        }, 500);
    };


    /* 滑动滚动条的方法 */
    const changeMusicTime = (value) => {
        clearInterval(musicTimer);

        audioRef.current.currentTime = value;
        if (audioRef.current.paused) audioRef.current.play();
        setPlayTag(true);
        watchMusicInfo();
    }

    /* checkbox的点击方法 */
    const hanldeCheckBox = (event) => {
        // console.log(event.target.checked);
        if (event.target.name === '音量') {
            setCheckVolume(event.target.checked);
            console.log(event.target.name);
            setVolumeOpen(true);
        } else if (event.target.name === '播放列表') {
            setListPopoverShow();
        }
    }

    /* VolumePopover的Openchange方法 */
    const handleOpenChange = (newOpen) => {
        setVolumeOpen(newOpen);
        setCheckVolume(false);
    }
    /* ListPopover的Openchange方法 */
    const handleListOpenChange = () => {
        setListPopoverHide();

    }

    /* 跳转到歌词页面 */
    const toLyrics = () => {
        if (location.pathname !== '/lyrics') {
            navigate('/lyrics');
        } else {
            navigate(-1);
        }
    }

    // let { store: { list: storeList } } = props;
    // let myList = storeList.filter(item => item.userId === 341128295);
    // console.log(myList);

    /* 添加歌曲到喜欢列表 */
    const addMusicToLikeList = async () => {
        if (!isLogin) {
            /* 如何还没有登录 那么要提示登录 */
            openNotification('你还没有登录，请先登录');
        } else {
            // 代表已经登录
            if (!likeMusic) {
                // 代表没有收藏 那么将歌曲添加到喜欢列表，在此之前需要判断是否登录
                try {
                    let { body } = await api.addOrDelSongToSheet('add', 477328563, playinfo?.id);
                    if (+body.code === 200) {
                        openNotification('添加歌曲成功');
                    }
                } catch (_) { }
                setLikeMusic(true);
                // 将信息同步到redux容器之中
                subscribeSongId(playinfo?.id, 0);

            } else {
                // 代表已经收藏 那么就是将歌曲从喜欢歌单中移除掉
                try {
                    let { body } = await api.addOrDelSongToSheet('del', 477328563, playinfo?.id);
                    if (+body.code === 200) {
                        openNotification('删除成功');
                    }
                } catch (_) { }
                setLikeMusic(false);
                // 将信息同步到redux容器之中
                reomoveSongId(playinfo?.id);
            }
        }
    }

    return <div className="play-bar-box">
        <>
            {contextHolder}
        </>
        {musicUrl && <audio src={musicUrl} ref={audioRef} id="audioPlay"></audio>}
        <div className="cover" onClick={toLyrics}>
            <img src={playinfo !== null ? `${playinfo?.al?.picUrl}?param=128y128` : cover} style={{ 'width': '64px', 'height': '64px' }} className="img" />
            <i className="iconfont" style={{
                userSelect: 'none', fontSize: '48px',
                width: '48px', height: '48px'
            }}>&#xe794;</i>
        </div>
        <div className="info">
            <div className="desc">
                <div className="name">
                    <span className="track">{playinfo?.name || '暂无歌曲'}</span>
                    <span className="artist">{playinfo?.ar[0]?.name || '王文龙'}</span>
                </div>
                <div className="shortcut">
                    <FormControlLabel
                        control={<Checkbox icon={<FavoriteBorder />} checked={likeMusic} onChange={addMusicToLikeList} checkedIcon={<Favorite />} name="喜欢" />}
                    />
                    {/* popover的宽度是由里面内容的宽度撑开的 */}
                    <Popover trigger='click' style={{ width: '100px' }}
                        className="volume-popover"
                        open={volumeOpen}
                        onOpenChange={handleOpenChange}
                        content={() => {
                            return <Slider value={volume} max={100} style={{ width: '100px' }}
                                onChange={(value) => {
                                    setVolume(value);
                                    audioRef.current.volume = value / 100;
                                }}
                                onAfterChange={() => {
                                    /* 在slider的值改变之后将checkbox的选中状态取消 并隐藏popover */
                                    setCheckVolume(false);
                                    setVolumeOpen(false);
                                }}
                            />
                        }}>
                    </Popover>
                    <FormControlLabel
                        control={<Checkbox icon={volume === 0 ? <VolumeOffIcon /> : <VolumeDownIcon />}
                            checked={checkVolume} onChange={hanldeCheckBox}
                            checkedIcon={volume === 0 ? <VolumeOffIcon /> : <VolumeUpIcon />} name="音量" />}
                    />
                    {playValue === 'sequence' && <FormControlLabel
                        onClick={playOnChange}
                        control={<Checkbox icon={<RepeatIcon />} checkedIcon={<RepeatIcon />} name="播放" />}
                    />}
                    {playValue === 'repeat' && <FormControlLabel
                        onClick={playOnChange}
                        control={<Checkbox icon={<RepeatOneIcon />} checkedIcon={<RepeatOneIcon />} name="播放" />}
                    />}
                    {playValue === 'random' && <FormControlLabel
                        onClick={playOnChange}
                        control={<Checkbox icon={<ShuffleIcon />} checkedIcon={<ShuffleIcon />} name="播放" />}
                    />}
                    <FormControlLabel
                        control={<Checkbox icon={<GetAppIcon />} checkedIcon={<GetAppIcon />} name="下载" />}
                    />

                    <Popover content={<PlayListItem />} trigger='click'
                        className="list-popover"
                        open={listShow}
                        onOpenChange={handleListOpenChange}
                    >

                    </Popover>
                    <FormControlLabel
                        control={<Checkbox icon={<QueueMusicIcon />} checked={listCheck} onChange={hanldeCheckBox} checkedIcon={<QueueMusicIcon />} name="播放列表" />}
                    />

                </div>
            </div>
            <div className="progress">
                <Slider value={currentTime} max={totalTime / 1000} style={{ width: '100%' }} tooltip={{ formatter: null }}
                    onChange={(value) => setCurrentTime(value)} onAfterChange={changeMusicTime} />
                <span className="time">{handleDuration(currentTime * 1000)} / {handleDuration(totalTime)}</span>
            </div>
        </div>
        <div className="control">
            <Button className="btn" onClick={prePlay}>
                <SkipPreviousIcon />
            </Button>
            <Button onClick={pauseOrplay}>
                {tag === false ? <PlayArrowRoundedIcon /> : <PauseIcon />}
            </Button>
            <Button onClick={nextPlay}>
                <SkipNextIcon />
            </Button>
        </div>

    </div>
};

export default connect(
    state => {
        return {
            play: state.play,
            check: state.check,
            song: state.song,
            base: state.base,
            store: state.store
        }
    }, { ...action.play, ...action.check, ...action.song }
)(PlayBar); 