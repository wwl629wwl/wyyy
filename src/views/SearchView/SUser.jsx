import React, { useEffect, useState } from "react";
import api from "../../api";
import { Image, Pagination } from "antd";
import './SUser.less';

const SUser = function SUser(props) {
    let { keywords, type } = props;

    let [userprofiles, setUserprofiles] = useState([]),
        [total, setTotal] = useState(0),
        [current, setCurrent] = useState(1);

    const onPageChange = (current) => {
        setCurrent(current)
    }

    /* 请求数据 */
    useEffect(() => {
        (async () => {
            try {
                await api.querySearchAllOfType(keywords, type, current).then(response => {
                    let { result: { userprofileCount, userprofiles } } = response;
                    setTotal(userprofileCount);
                    setUserprofiles(userprofiles);
                })
            } catch (_) { }
        })()
    }, [current]);

    return <div className="search-user-box">
        <ul className="mu-list u-list mu-list-two-line">
            {userprofiles.length > 0 ? userprofiles.map((item, index) => {
                let { userId, avatarUrl, signature, nickname, userType, gender } = item;
                return <li className="user-item" key={index}>
                    <div className="item-wrapper">
                        <div className="inner-item">
                            <div className="user-avatar">
                                <Image src={`${avatarUrl}?param=100y100`} preview={false} className="avatar-img" />
                                <div className="user-type-badge">
                                    {userType === 2 ?
                                        <i className="iconfont  material-icons" >&#xe619;</i> :
                                        <i className="iconfont  material-icons">&#xe72f;</i>}
                                </div>
                            </div>
                            <div className="item-content" title="认证音乐人">
                                <div className="item-title">
                                    {nickname}
                                    <span className="gender">{gender === 1 ? <i className="iconfont " style={{ color: '#2196f3' }}>&#xe625;</i> : <i className="iconfont" style={{ color: '#f06292' }}>&#xe676;</i>}</span>
                                </div>
                                <div className="subtitle">{signature}</div>
                            </div>
                        </div>
                    </div>
                </li>
            }) : null}
        </ul>
        <div className="pagination">
            {total > 20 ? <>
                <Pagination total={total} defaultCurrent={1} current={current} onChange={onPageChange} pageSize={20} />
            </> : null}
        </div>
    </div>
};

export default SUser;