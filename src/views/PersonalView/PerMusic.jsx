import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import api from "../../api";
import RelatedItem from "../../components/PlayList/RelatedItem";

const PerMusic = function PerMusic(props) {
    let { uid } = props;

    let [userPlaylist, setUserPlaylist] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                let { playlist } = await api.queryUserAlbum(uid);
                setUserPlaylist(playlist);
            } catch (_) { }
        })()
    }, []);

    return <div className="personal-music-box">

        <div className="header" style={{
            marginTop: '8px',
            height: '40px',
            width: '100%',
            fontSize: '14px',
            color: 'rgba(0, 0, 0, 0.54)',
            lineHeight: '24px',
            paddingLeft: '16px'

        }}>我创建的歌单</div>
        <div className="myfollow-list">
            {userPlaylist.length > 0 ? userPlaylist.map(item => {
                let { id, userId } = item;
                return (userId === uid && <RelatedItem info={item} key={`${id}+permusic`} type={2} />)
            }) : null}
        </div>
        <div className="header" style={{
            marginTop: '8px',
            height: '40px',
            width: '100%',
            fontSize: '14px',
            color: 'rgba(0, 0, 0, 0.54)',
            lineHeight: '34px',
            paddingLeft: '16px'

        }}>我收藏的歌单</div>
        <div className="myfollow-list">
            {userPlaylist.length > 0 ? userPlaylist.map(item => {
                let { id, userId } = item;
                return (userId !== uid && <RelatedItem info={item} key={`${id}+permusic`} type={2} />)
            }) : null}
        </div>

    </div>
};


/* 对perMusic 做属性验证 */
PerMusic.defaultProps = {
    uid: 0
}

PerMusic.propTypes = {
    uid: PropTypes.number
}


export default PerMusic;