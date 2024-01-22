import React, { useEffect, useState } from "react";
import api from "../../api";
import './StoreDJ.less';
import SingerItem from "../../components/Store/SingerItem";

const StoreDJ = function StoreDJ() {

    let [djData, setDjData] = useState([]);

    const handleDJFromChild = (data) => {
        console.log(data)
    }

    useEffect(() => {
        (async () => {
            try {
                let { djRadios } = await api.queryUserFollowDJ();
                console.log(djRadios);
                setDjData(djRadios);
            } catch (_) { }
        })()
    }, []);

    return <div className="store-dj-box">
        <div className="store-dj-left">
            {djData.length > 0 ? djData.map(item => {
                let { id } = item;
                return <SingerItem id={id} type={4} info={item} method={handleDJFromChild} key={`${id}+dj`} />
            }) : null}
        </div>
        <div className="store-dj-right">
            333
        </div>
    </div>
};

export default StoreDJ;