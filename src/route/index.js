import { Suspense } from "react";
import routes from "./routes";
import { Route, Routes, useNavigate, useLocation, useSearchParams, useParams } from "react-router-dom";
import { Empty } from "antd";


/* 统一渲染的组件：在这里可以做一些处理「例如：权限/登录态校验，传递路由信息的属性」.... */
const Element = function Element(props) {
    let { component: Component, meta } = props;

    let { title = '网易云App' } = meta || {};
    document.title = title;

    // 把路由信息先获取到，最后基于属性传递给组件：只要是基于<Route>匹配渲染的组件，都可以基于属性获取路由信息
    const navigate = useNavigate(),
        location = useLocation(),
        params = useParams(),
        [usp] = useSearchParams();
    
    
    // 最后对component 进行渲染
    return <Component navigate={navigate} location={location} params={params} usp={usp} />
}


/* 递归创建Route */
const createRoute = function createRoute(routes) {
    return <>
        {routes.map((item, index) => {
            let { path, name } = item;
            // 每一次路由匹配成功，不直接渲染我们设定的组件，而是渲染Element；
            // 在Element做一些特殊处理后，再去渲染我们真实要渲染的组件！！
            return <Route key={name + index} path={path} element={<Element {...item} />}>
    
            </Route>
        })}
    </>
}


/* Suspense 与 lazy 搭配使用，实现组件的懒加载 */
const RouterView = function RouterView() {
    return <Suspense fallback={
        <Empty />
    }>
        <Routes>
            {createRoute(routes)}
        </Routes>
        
    </Suspense>
};

export default RouterView;