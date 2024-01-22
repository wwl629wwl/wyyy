import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.less';
import App from './App';


/* 国际化处理 */
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import './assets/iconfont/iconfont.css';

/* react-redux */
import store from './store';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));

if (window.global === undefined) {
    window.global = window;
}

root.render(
    <ConfigProvider locale={zhCN}>
        {/* provider 提供一个上下文 */}
        <Provider store={store}>
            <App />
        </Provider>
    </ConfigProvider>
);