import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import api from "../../api";
import districts from "../../api/district";
import './PerAbout.less';

const computeCity = (code) => {
    if (code < 100) return null;
    let result = '';
    const c0 = 100000;
    const c1 = Math.trunc(code / 10000) * 10000;
    const r1 = districts[c0][c1];
    if (!r1) return result;
    result += r1;
    const c2 = Math.trunc(code / 100) * 100;
    const r2 = districts[c1][c2];
    if (!r2) return result;
    result += ' ' + r2;
    const r3 = districts[c2][code];
    if (!r3) return result;
    result += ' ' + r3;
    return result;
}

const computeBirth = (code) => {
    if (code <= -2209017600000) return null;
    const dt = new Date(code + 8 * 3600 * 1000);
    const m = dt.getUTCMonth() + 1;
    const d = dt.getUTCDate();
    const a = '魔羯水瓶双鱼牡羊金牛双子巨蟹狮子处女天秤天蝎射手魔羯'.substr(m * 2 - (d < '102123444543'[m - 1] - -19) * 2, 2);
    const y = Math.floor(dt.getUTCFullYear() % 100 / 10) * 10;
    return `${y || '00'} 后 ${a}座`;
}

const PerAbout = function PerAbout(props) {
    let { uid } = props;

    let [detail, setDetail] = useState({}),
        [city, setCity] = useState(''),
        [birth, setBirth] = useState(''),
        [level, setLevel] = useState();

    /* 请求用户的详情 */
    useEffect(() => {
        (async () => {
            try {
                let { profile, level } = await api.queryUserDetail(uid);
                let city = computeCity(profile.city);
                let birth = computeBirth(profile.birthday);
                setCity(city);
                setDetail(profile);
                setBirth(birth);
                setLevel(level);
            } catch (_) { };
        })();
    }, []);

    return <div className="personal-about-box">
        <h2 className="subhead">个人信息</h2>
        {level && <p className="para">等级：{level}</p>}
        {birth && <p className="para">生日：{birth}</p>}
        {city && <p className="para">城市：{city}</p>}
    </div>
}

PerAbout.defaultProps = {
    uid: 0
}

PerAbout.propTypes = {
    uid: PropTypes.number
}

export default PerAbout;
