import { Button, Modal, message } from "antd";
import React, { useState } from "react";
import './ListLeft.less';
import { useLocation, useNavigate } from "react-router-dom";
import RelatedItem from "./RelatedItem";
import { connect } from "react-redux";
import action from "../../store/action";
import api from "../../api";

const ListLeft = function ListLeft(props) {

    let { data, clearUserInfo } = props;

    let [modalOpen, setModalOpen] = useState(false);

    /* 创建一个navigate 用于路由跳转 */
    const navigate = useNavigate(),
        location = useLocation();

    const onBack = () => {
        navigate(-1);
    }

    const signOut = () => {
        setModalOpen(true);
    }

    const modalCancel = () => {
        setModalOpen(false);
    }

    const modalOk = () => {
        let { code } = api.logout;
        if (+code === 200) {
            message.success('退出成功');
        }
        clearUserInfo();
        setModalOpen(false);
        navigate('/', { replace: true });

    }

    return <div className="list-left-box">
        <div className="back-btn left-list">
            <Button onClick={onBack}><i className="iconfont" >&#xe918;</i>返回</Button>
        </div>
        {data ? <div className="related-list left-list">
            <div className="title">相关推荐</div>
            {data.length > 0 ? data.map(item => {
                let { id } = item;
                return <RelatedItem info={item} key={id} type={1} />
            }) : null}
        </div> : null}
        {location.pathname === '/dailysongs' ? <div className="daily-recommend">
            <div className="title">个性化推荐如何工作</div>
            <div className="desc">
                <p>它聪明、熟悉每个用户的喜好，从海量音乐中挑选出你可能喜欢的音乐。</p>
                <p>它通过你每一次操作来记录你的口味：</p>
            </div>
        </div> : null}
        {location.pathname === '/personal' ? <div className="setout" style={{ width: '100%', height: '44px', lineHeight: '22px', textAlign: 'center', fontSize: '20px' }}>
            <Button
                style={{ fontSize: '16px', width: '100%', height: '100%' }}
                type="text"
                onClick={signOut}
            >
                <i className="iconfont">&#xe60b;</i>
                退出登录
            </Button>
        </div> : null}
        <>
            <Modal title='退出登录' open={modalOpen} onOk={modalOk} onCancel={modalCancel}
            >
                <p>退出登录后将无法查看每日歌曲推荐，收藏的歌单等信息，确定吗？</p>
            </Modal>
        </>
    </div>
};

export default connect(
    null,
    action.base
)(ListLeft);