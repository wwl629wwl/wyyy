import { applyMiddleware, createStore } from 'redux';
import reduxLogger from 'redux-logger';
import reduxThunk from 'redux-thunk';
import reducer from './reducer';
import reduxPromise from 'redux-promise';

/* 在这里合并reducer和action */
let middleWare = [reduxThunk, reduxPromise],
    env = process.env.NODE_ENV;

if (env === 'development') {
    middleWare.push(reduxLogger);
}

const store = createStore(
    reducer,
    applyMiddleware(...middleWare)
);

export default store;