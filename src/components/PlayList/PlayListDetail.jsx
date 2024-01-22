import React, { useEffect, useMemo, useState } from "react";
import './PlayListDetail.less';
import { Button, Collapse, Image, Input, message } from "antd";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import MusicListItem from "./MusicListItem";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import api from "../../api";
import action from "../../store/action";

/* 处理时间的方法 */
const formatDate = (time) => {
    const dt = new Date(time);
    return dt.toLocaleDateString('zh', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    });
};
const delay = (interval = 1000) => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, interval);
    });
}


const PlayListDetail = function PlayListDetail(props) {

    /* 结构出 react-redux 的东西 */
    let { store: { list }, base: { info: userInfo },
        removeSheetById, subscribeSheet } = props;
    let { desc = null, songs, type, subCount = 0 } = props;
    // 如果desc对象中没有name属性，那么name将被设置为null。否则，name将被赋值为desc.name的值。
    /* 因为要实现组件的复用 因此传入的desc不同 有请求到的数据中没有一些属性 因此先做一个预处理 */
    let { name = null, createTime = null, creator = null, commentCount = null,
        subscribedCount = null, description, picUrl,
        blurPicUrl = null, coverImgUrl = null, artist = null, publishTime = null, id: sheetId, info: decInfo } = desc;

    /* 因为要实现组件的复用 传入的desc对象里面的属性不同 因此需要做判断 */
    let imageUrl = blurPicUrl || coverImgUrl || picUrl,
        avatarUrl = creator?.avatarUrl || artist?.img1v1Url,
        time = createTime || publishTime;

    /* 创建navigate 导航 和Location */
    const navigate = useNavigate(),
        location = useLocation();

    /* Collapse的元素 */
    const descript = (
        <>
            <div className="tags">
                {desc.tags ? <p>{desc?.tags?.join('，')}</p> : null}
            </div>
            <div className="descriptiion">
                {description}
            </div></>
    );

    /* 定义Collapse所用的数据 */
    const item = [{
        key: '1',
        label: '歌单详情',
        children: descript
    }]

    /* useMemo的作用是用来缓存计算结果，只有在依赖项发生变化时才重新计算。
        这样可以避免在每次渲染时都重新计算耗时的操作，提高组件的性能。
        useMemo接受两个参数：一个是计算函数，另一个是依赖项数组。
        计算函数会在每次渲染时执行，返回的结果会被缓存起来。只有当依赖项数组中的值发生变化时，才会重新执行计算函数。
    */
    const isStoreSheet = useMemo(() => {
        if (!list) return false;
        return list.some(item => {
            return +item.id === +sheetId;
        })
    }, [sheetId, list])

    /* ---------------------------------------------------------------------- */
    /* 定义两个按钮的方法 */
    const handleSubscribe = async () => {
        if (!userInfo) {
            message.error('您还没有登录！');
            navigate(`/login?to=${location.pathname}`, { replace: true });
            return;
        }
        // 表明已经登录 判断是否收藏
        if (isStoreSheet === true) {
            // 移除收藏
            let sheetItem = list.find(item => {
                return item.id === sheetId;
            })
            if (!sheetItem) return;
            let { code } = await api.subscribeSheet(2, sheetItem.id);
            if (+code !== 200) {
                message.error('移除失败');
            }
            message.error('移除成功');
            // 同步redux 删除这一项
            removeSheetById(sheetId);
            return;
        }
        // 收藏
        try {
            let { code } = await api.subscribeSheet(1, sheetId);
            if (+code !== 200) {
                message.error('收藏失败');
            }
            message.success('收藏成功');
            // 同步redux容器
            subscribeSheet(desc);
        } catch (_) { }

    }


    /* ---------------------------------------------------------------------- */


    return <div className="play-list-detail">
        <div className="header">
            <Image src={`${imageUrl}?param320y320`} preview={false} placeholder={true} />
            <div className="desc" >
                <div className="author-info">
                    <div className="name">{name}</div>
                    <div className="create-info">
                        <NavLink className='creator'>
                            <div className="creator-avatar" >
                                <Image src={avatarUrl}
                                    placeholder={true} preview={false}
                                    style={{ width: '40px', height: '40px', borderRadius: '20px' }}
                                />
                            </div>
                            <span className="create-name">{creator?.nickname}</span>
                        </NavLink>
                        <span className="create-time">{publishTime ? '发布于' : '创建于'}{formatDate(time)}</span>
                    </div>
                </div>

                <div className="action-btn">
                    <Button style={{ marginRight: '8px' }}
                        className={isStoreSheet && type !== 3 ? 'stored' : ''}
                        onClick={handleSubscribe}
                        disabled={type === 3 ? true : false}
                    >
                        <i className="iconfont">&#xe644;</i>
                        <span className="btn-content">收藏
                            ({(isStoreSheet && type !== 3 && type !== 4 ? subscribedCount + 1 : subscribedCount)
                                || (type === 4 && subCount)})
                        </span>
                    </Button>
                    <Button >
                        <i className="iconfont">&#xe606;</i>
                        <span className="btn-content">
                            评论{commentCount || decInfo?.commentCount}
                        </span>
                    </Button>
                </div>
                <div className="comment" >
                    <Collapse items={item} bordered={false} />
                </div>
            </div>
        </div>
        <div className="play-list">
            <div className="play-list-header">
                <Button> <i className="iconfont">&#xe931;</i> 播放全部</Button>
                {/* 在专辑页面不需要显示搜索框 因此做一个简单的判断  */}
                {artist ? null : <div className="search-input">
                    <Input placeholder="查找歌曲" />
                </div>}
            </div>
            <div className="music-list">
                <div className="music-scroll">
                    {songs.length > 0 ? songs.map((item, index) => {
                        let { id } = item;
                        return <MusicListItem index={index} info={item} key={id} />
                    }) : null}
                </div>
            </div>
        </div>

    </div>
};

/* 做属性验证 */
PlayListDetail.defaultProps = {
    desc: null,
    songs: [],
    type: 1
};

/* 因为这个playlistDetail组件要被复用 因此需要根据这个type值来判断是被谁复用的
 type = 1 PlayList
 type = 2 AlbumDetail
 type = 3 StoreAlbum
 type = 4 StoreSheet
*/

PlayListDetail.propTypes = {
    desc: PropTypes.object,
    songs: PropTypes.array,
    type: PropTypes.number
};

export default connect(
    state => {
        return {
            base: state.base,
            store: state.store
        }
    },
    { ...action.store }
)(PlayListDetail);