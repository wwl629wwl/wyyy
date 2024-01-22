import React, { useEffect, useRef, useState } from "react";
import { CloudOutlined, CustomerServiceOutlined, HeartFilled, MenuUnfoldOutlined, SearchOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import './NavBar.less';
import { AutoComplete, Avatar, Button, Drawer, Input, List, Modal, Form, message } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../../api";
import { handleArray } from "../../api/method";
import _ from '../../assets/utils.js';
import { connect } from 'react-redux';
import action from '../../store/action';



const NavBar = function NavBar(props) {


    let { base: { info: userInfo }, queryUserInfoAsync, store: { list }, song: { songAarry },
        queryUserPlaylist, queryMylistSongId } = props;

    /* 定义所需要的状态 */
    let [value, setValue] = useState(''),
        [searchIsShow, setSearchIsShow] = useState(false),
        searchRef = useRef(null),
        [open, setOpen] = useState(false),
        [options, setOptions] = useState([]);

    let backgroundImage = userInfo ? `${userInfo.backgroundUrl}?param600y400` : '';


    const onSelect = (data) => {
        console.log('onSelect', data);
    };

    /* 创建一个navigate用来跳转 */
    const navigate = useNavigate(),
        location = useLocation();


    /* 点击搜索的方法 */
    const handleSearch = () => {
        setSearchIsShow(true)
    };

    /* 点击弹出抽屉的方法 */
    const handleDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    }

    /* Drawer里面每一项的方法 */
    const personalClick = () => {
        setOpen(false);
        console.log('个性推荐');
        navigate('/')
    }

    const searchResult = () => {
        setOpen(false);
        console.log('搜索结果')
    }

    const mineCollect = () => {
        setOpen(false);
        console.log('我的收藏')
        navigate('/store')
    }

    const musicCloud = () => {
        setOpen(false);
        console.log('音乐云盘')
    }

    const setting = () => {
        setOpen(false);
        console.log('应用设置')
    }

    /* input的value change方法 */
    const searchSomething = (data) => {
        setValue(data);
    }

    /* 回车搜索按钮 */
    const onPressEnter = (event) => {
        // 确保事件对象存在以及包含 'key' 属性
        if (event && event.key === 'Enter') {
            /* 将value值传递过去 */
            navigate('/search', {
                state: { params: value }
            });

            // 导航后刷新页面
            window.location.reload();
        }
    }


    /* List数据 */
    const data = [{
        title: '个性推荐',
        icon: <CustomerServiceOutlined />,
        method: personalClick
    }, {
        title: '搜索结果',
        icon: <SearchOutlined />,
        method: searchResult
    }, {
        title: '我的收藏',
        icon: <HeartFilled />,
        method: mineCollect
    }, {
        title: '音乐云盘',
        icon: <CloudOutlined />,
        method: musicCloud
    }, {
        title: '应用设置',
        icon: <SettingOutlined />,
        method: setting
    }];

    useEffect(() => {
        // 给input输入框设定自动获得焦点
        searchRef.current.focus();
    })

    /* 获取用户数据 */
    useEffect(() => {
        (async () => {
            if (!userInfo) {
                let { info } = await queryUserInfoAsync();
                userInfo = info;
            }
            if (userInfo && list.length === 0) {
                /* 表明已经登录 但是list没有信息 */
                await queryUserPlaylist();
            }
            if (userInfo && list && songAarry.length === 0) {
                /* 表明已经登录list有信息 但是歌单id给空 */
                await queryMylistSongId();
            }
        })()
    }, []);


    /* 如果输入框有输入了则发送请求 请求数据 */
    useEffect(() => {
        (async () => {
            try {
                await api.querySearchSuggest(value).then(response => {
                    let { result } = response;
                    // 如果Result为undefined 则讲options 置空
                    if (result === undefined) {
                        setOptions([]);
                        return;
                    }
                    let { albums, artists, playlists, songs } = result;
                    // 处理数据
                    let alb = handleArray(albums);
                    let art = handleArray(artists);
                    let play = handleArray(playlists);
                    let song = handleArray(songs);
                    let results = [...alb, ...art, ...play, ...song];
                    setOptions(results);
                })
            } catch (_) { };
        })();
    }, [value]);

    useEffect(() => {
        onPressEnter();
    }, [value])

    const handleLogin = () => {
        navigate(`/login?to=${location.pathname}`, { replace: true });
        setOpen(false);
    }

    const toPersonal = () => {
        navigate('/personal');
        setOpen(false);
    }

    return <div className="navbar-box">
        <div className="left-box" onClick={handleDrawer}>
            <MenuUnfoldOutlined />
        </div>
        <div className="text-box">My Cloud Music</div>
        <div className="right-box" onClick={handleSearch} style={{ display: !searchIsShow ? 'block' : 'none' }}>
            <Button ><SearchOutlined /></Button>
        </div>

        <div className="search-box" style={{ display: searchIsShow ? 'block' : 'none' }}>
            <AutoComplete value={value}
                placeholder="搜索单曲、歌手、专辑、用户..."
                prefix={< SearchOutlined />}
                ref={searchRef}
                allowClear
                onChange={searchSomething}
                onBlur={() => {
                    setSearchIsShow(false);

                }}
                options={options}
                onSelect={onSelect}
                onKeyDown={onPressEnter}
            />

        </div>

        {/* 点击显示左侧的抽屉 */}

        <Drawer placement="left"
            onClose={onClose}
            open={open}
            closable={false}
        >
            <div className="avatar-box" style={{ backgroundImage: `url(${backgroundImage})` }}>
                <div className="avatar" >
                    <Avatar size={72} icon={<UserOutlined />}
                        src={userInfo ? userInfo.avatarUrl : null} />
                </div>
                {!userInfo ?
                    <div className="title" style={{ cursor: 'pointer' }} onClick={handleLogin}>
                        <span className="username">点击登录</span>
                    </div> :
                    <div className="title" style={{ cursor: 'pointer' }} onClick={toPersonal}>
                        <span className="username">{userInfo?.nickname}</span>
                        <Button type="text" style={{ color: '#fff' }}>签到</Button>
                    </div>}

            </div>
            {/* 通过循环创建List的子项，并且通过数组的每一项设置不同的方法 */}
            <List>
                {data.map(item => {
                    let { title, icon, method } = item;
                    return <List.Item key={title} onClick={method}>{icon}{title}</List.Item>
                })}
            </List>
        </Drawer>

    </div>
};

export default connect(
    state => {
        return {
            base: state.base,
            store: state.store,
            song: state.song
        }
    },
    { ...action.base, ...action.store, ...action.song }
)(NavBar);