import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import api from "../../api";
import { Empty } from "antd";

const PerEvent = function PerEvent(props) {
    let { uid } = props;

    let [event, setEvent] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                let { events } = api.queryUserEvent(uid);
                setEvent(events);
            } catch (_) { }
        })();
    }, []);

    return <div className="personl-event-box" style={{minHeight: `calc(100vh - 176px)`}}>
        {event ? <div>events</div> : <Empty />}
    </div>
};

PerEvent.defaultProps = {
    uid: 0
}

PerEvent.propTypes = {
    uid: PropTypes.number
}


export default PerEvent;