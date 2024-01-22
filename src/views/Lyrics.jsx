import React, { useEffect, useMemo, useRef, useState } from "react";
import './Lyrics.less';
import { connect } from 'react-redux';
import { Lrc } from 'lrc-kit';
import api from "../api";
import needle from '../assets/imgs/needle.webp';
import discdefault from '../assets/imgs/disc_default.webp';
import disc from '../assets/imgs/disc.webp';
import { Button } from 'antd';


const Lyrics = function Lyrics(props) {
    // console.log(props);
    /* 从props中结构出store中的数据 */
    let { play: { playinfo, tag } } = props;

    let [lyrics, setLyrics] = useState([]),
        [currentLyricIndex, setCurrentLyricIndex] = useState(-1);

    /* 创建ref数组 */
    const linesRef = useRef([]);

    // console.log(playinfo)
    /* 请求歌词数据 */
    useEffect(() => {
        (async () => {
            let { lrc } = await api.queryLyric(playinfo?.id);
            let result = Lrc.parse(lrc.lyric);
            // console.log(result);
            setLyrics(result.lyrics);
            // 实现循环添加ref 不能够使用useRef
            // 这是因为 React 依赖于 hooks 被调用的顺序来正确地工作，这需要保证在组件的每一次渲染中，
            // hooks 都在顶层以相同的顺序被调用。
            linesRef.current = result.lyrics.map(() => React.createRef())
        })()
    }, []);

    const lyricScrollStyle = useMemo(() => {
        if (currentLyricIndex === -1 || !linesRef.current || linesRef.current.length === 0) {
            return { transform: 'translateY(164px)' };
        }
        const currentEle = linesRef.current[currentLyricIndex];
        const offset = 150 - currentEle.current.offsetTop - currentEle.current.clientHeight;
        return { transform: `translateY(${offset}px)` };
    }, [currentLyricIndex]);

    useEffect(() => {
        if (tag) {
            listenAudioToUpdate();
        }
    }, [tag]);

    const listenAudioToUpdate = () => {
        // console.log(typeof linesRef.current[0].current.dataset.time);
        const audio = document.querySelector('#audioPlay');
        // console.log(linesRef.current.length);
        audio.addEventListener('timeupdate', ev => {
            // loop form current index. if current index equals -1, loop from 0
            let loopStart = currentLyricIndex === -1 ? 0 : currentLyricIndex;
            // 如果用户拖动进度条
            if (ev.target.currentTime < +linesRef.current[loopStart].current.dataset?.time) {
                loopStart = 0;
            }
            // loop and find the smallest whose time larger than currentTime
            for (let i = loopStart; i < linesRef.current.length; i++) {
                if (ev.target.currentTime < +linesRef.current[i].current.dataset?.time) {
                    setCurrentLyricIndex(i - 1);
                    return;
                }
            }
            // 没有找到 
            setCurrentLyricIndex(linesRef.current.length - 1);
        })

    }

    return <div className="lyrics-box play">
        <div className="bkg">
            <canvas width='1000' height='600'></canvas>
        </div>
        <div className="phonograph">
            <img src={needle} width={100} height={142.5} className={`styleus ${tag ? 'playing' : ''}`} />
            <div className={`vinyl ${tag ? 'playing' : ''}`} id="vinyl">
                <img src={playinfo?.al?.picUrl || discdefault} className="cover" />
                <img src={disc} className="borde" />
            </div>

        </div>
        <div className="info">
            <div className="title">
                <span className="name">{playinfo?.name || '暂无歌曲'}</span>
            </div>
            <p className="source">
                <span className="source-artist">
                    <span>歌手：{playinfo?.ar[0].name}</span>
                </span>
                <span className="source-album">
                    <span>专辑：{playinfo?.al?.name}</span>
                </span>
            </p>
            <div className="lyric">
                <div className="scroll-wrapper">
                    <div className="scroll" style={lyricScrollStyle}>
                        {lyrics.length > 0 ? lyrics.map((item, index) => {
                            let { timestamp } = item;
                            return <div className={`line ${currentLyricIndex === index ? 'active' : ''}`}
                                data-time={timestamp}
                                key={timestamp}
                                index={index}
                                ref={linesRef.current[index]}
                            >{item?.content}</div>
                        }) : <div>暂无歌词</div>}
                    </div>
                </div>
            </div>
        </div>

    </div>
}



export default connect(
    state => {
        return {
            play: state.play
        }
    },
    null
)(Lyrics);


// const canvasRef = useRef(null);

// /* canvas绘画的方法 */
// const paintCanvas = () => {
//     console.log(111);
//     setCanvasImageId(playinfo?.id);
//     let src;
//     const size = HiDpiPx(64);
//     if (playinfo?.al?.picUrl) {
//         src = sizeImg(playinfo?.al?.picUrl, size);
//     } else {
//         src = defaultcover;
//     }

//     const w = 1000;
//     const h = 600;
//     /** @type {CanvasRenderingContext2D} */
//     /* CanvasRenderingContext2D 接口是 Canvas API 的一部分，
//     可为 <canvas> 元素的绘图表面提供 2D 渲染上下文。它用于绘制形状，文本，图像和其他对象。 */
//     const context = canvasRef.current.getContext('2d');
//     console.log(context);
//     context.globalAlpha = 0.9;
//     // 是 Canvas 2D API 提供模糊、灰度等过滤效果的属性。它类似于 CSS filter 属性，并且接受相同的函数。
//     context.filter = 'blur(60px) brightness(0.75)'
//     /* Blob API中的blob()方法的作用是在Response对象中将响应体内容封装为Blob对象。
//     这个方法的返回值是一个Promise对象，因此可以使用then()方法来处理Blob对象的相关操作。
//     在上面的代码中，fetch(src).then(r => r.blob())语句就是使用了blob()方法获取了响应体的Blob`对象。 */
//     fetch(src).then(r => r.blob()).then(b => {

//     })
// }

// const determineBrightness = async () => {

// }