import { Button, Empty } from "antd";
import React from "react";
import './404.less';

const NotFound = function NotFound(props) {
    let { navigate } = props;
    console.log(props);

    const handleHome = () => { 
        navigate('/', { replace: true });
    };

    const handleUp = () => { 
        navigate(-1);
    };
    return <div className="empty-box">
        <Empty />
        <div className="back-btn">
            <Button type="primary" onClick={handleHome}>返回首页</Button>
            <Button type="primary" className="backup" onClick={handleUp}>返回上页</Button>
            
        </div>
    </div>
};

export default NotFound;