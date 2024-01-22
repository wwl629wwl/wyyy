import React, { useState } from "react";
import { Button, message } from "antd";

/* 单独对<Button>进行封装 进行防抖效果的处理 
   在异步操作中的一种函数防抖「避免重复点击提交数据请求」
   点击按钮进行什么操作 都是基于onclick 来进行处理
*/
const ButtonAgain = function ButtonAgain(props) {
    // props包含了调用button组件时候的属性
    // 因为props是只读的 因此 需要进行一次浅克隆
    let options = { ...props };
    let { children, onClick: handle } = options;
    delete options.children;

    /* 创建loading状态 */
    let [loading, setLoading] = useState(false);

    // 在封装的组件中 点击事件触发之前 设置loading效果 结束之后 取消loading效果
    const handleClick = async () => {
        setLoading(true);
        try {
            await handle();
        } catch (_) { };
        setLoading(false);
    };
    if (handle) {
        options.onClick = handleClick;
    }

    return <Button {...options} loading={loading}>
        {children}
    </Button>
}

export default ButtonAgain