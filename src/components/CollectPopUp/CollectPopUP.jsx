import { Modal } from "antd";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import action from "../../store/action";
import RelatedItem from "../PlayList/RelatedItem";
import './CollectPopUp.less';

const CollectPopUp = function CollectPopUp(props) {
    /* 从props中结构出 redux容器的数据 */
    let { store: { list }, collect: { isShow }, setCollectPopUpHide } = props;

    let myList = list.filter(item => item.userId === 341128295);


    const handleClose = () => {
        setCollectPopUpHide();
    }
    


    return <>
        {
            list.length > 0 ? <Modal className="collect-pop-up" title='收藏歌单'
                open={isShow} cancelText='关闭'
                okButtonProps={{ style: { display: 'none' } }}
                onCancel={handleClose}
            >
                {myList.map((item, index) => {
                    let { id } = item;
                    return <RelatedItem info={item} type={3} key={`${id}+collectsdas`}
                        index={index} />
                })}
            </Modal>
                : null
        }</>
};

export default connect(
    state => {
        return {
            song: state.song,
            store: state.store,
            collect: state.collect
        }
    },
    { ...action.collect }
)(CollectPopUp);