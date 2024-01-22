import React, { useEffect, useState } from "react";
import './StoreSheet.less';
import api from "../../api";
import SingerItem from "../../components/Store/SingerItem";
import PlayListDetail from "../../components/PlayList/PlayListDetail";

export const SheetContext = React.createContext();

const StoreSheet = function StoreSheet() {

    let [data, setData] = useState([]),
        [sheetId, setSheetId] = useState(8401),
        [songs, setSongs] = useState([]),
        [songDetail, setSongDetail] = useState({}),
        [subCount, setSubCount] = useState(0);

    const handleDataFromItem = (data) => {

        setSheetId(data);
    }

    /* 请求数据 请求用户收藏的歌单 用于渲染左侧数据 */
    useEffect(() => {
        (async () => {
            try {
                let { data } = await api.queryUserFollowSheet();

                setData(data);
            } catch (_) { }
        })()
    }, []);

    /* 获取专辑歌曲 */
    useEffect(() => {
        (async () => {
            try {
                let { songs, album } = await api.queryAlbumInfo(sheetId);
                setSongs(songs);
                setSongDetail(album);
            } catch (_) { }
        })()
    }, [sheetId])

    /* 获取歌单详情 */
    useEffect(() => {
        (async () => {
            try {
                let { subCount } = await api.queryAlbumDynamicInfo(sheetId);
                setSubCount(subCount);
            } catch (_) { }
        })()
    }, [sheetId])


    return <div className="store-sheet-box">
        <div className="store-sheet-left">
            {data.length > 0 ? data.map(item => {
                let { id } = item;
                return <SingerItem info={item} key={`${id}+store`} id={id} type={2} method={handleDataFromItem} />
            }) : null}
        </div>
        <div className="store-sheet-right">
            {(songs.length > 0 && songDetail) && <PlayListDetail
                desc={songDetail}
                songs={songs} type={4}
                subCount={subCount} />}
        </div>
    </div>

}

export default StoreSheet;