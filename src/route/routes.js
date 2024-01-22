import { lazy } from "react";
import { Navigate } from "react-router-dom";
import Home from "../views/Home";


/**  
 * @name routes
 * @description 自定义的routes数组 用于循环创建页面 数组的每一项 有path name component以及meta
*/
const routes = [{
    path: '/',
    component: () => <Navigate to='/home' />
}, {
    path: '/home',
    name: 'home',
    component: Home,
    meta: {
        title: '网易云-首页'
    }
}, {
    path: '/store',
    name: 'store',
    component: lazy(() => import('../views/Store.jsx')),
    meta: {
        title: '网易云-收藏'
    }
}, {
    path: '/personal',
    name: 'personal',
    component: lazy(() => import('../views/Personal.jsx')),
    meta: {
        title: '网易云-个人中心'
    }
}, {
    path: '/personfm',
    name: 'personfm',
    component: lazy(() => import('../views/HomeView/PersonFM.jsx')),
    meta: {
        title: '网易云-私人FM'
    }
}, {
    path: '/dailysongs',
    name: 'dailysongs',
    component: lazy(() => import('../views/HomeView/DailyRec.jsx')),
    meta: {
        title: '网易云-每日推荐'
    }
}, {
    path: '/login',
    name: 'login',
    component: lazy(() => import('../views/Login.jsx'))
}, {
    path: '*',
    name: '404',
    component: lazy(() => import('../views/404.jsx')),
    meta: {
        title: '404页面'
    }
}, {
    path: '/playlist/:id',
    name: '播放详情',
    component: lazy(() => import('../views/PlayList.jsx')),
    meta: {
        title: '播放详情'
    }
}, {
    path: '/artists/:id',
    name: '歌手详情',
    component: lazy(() => import('../views/SingerView/SingerDetail.jsx')),
    meta: {
        title: '歌手详情'
    }
}, {
    path: '/album/:id',
    name: '专辑详情',
    component: lazy(() => import('../views/AlbumView/AlbumDetail.jsx')),
    meta: {
        title: '专辑详情'
    }
}, {
    path: '/search',
    name: '搜索结果',
    component: lazy(() => import('../views/Search.jsx')),
    meta: {
        title: '搜索结果'
    }
}, {
    path: '/video/:id',
    name: '视频',
    component: lazy(() => import('../views/VideoView/Video.jsx')),
    meta: {
        title: '视频'
    }
}, {
    path: '/test',
    name: '测试',
    component: lazy(() => import('../views/test.jsx')),
    meta: {
        title: '测试'
    }
}, {
    path: '/lyrics',
    name: '歌词详情',
    component: lazy(() => import('../views/Lyrics.jsx')),
    meta: {
        title: '歌词详情'
    }
}
];

export default routes;