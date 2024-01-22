import { combineReducers } from 'redux';
import baseReducer from './base';
import storeReducer from './store';
import songReducer from './song';
import collectReducer from './collect';
import subscribeReducer from './subscribe';
import playReducer from './play';
import checkReducer from './check';

/* 合并reducer */
const reducer = combineReducers({
    base: baseReducer,
    store: storeReducer,
    song: songReducer,
    collect: collectReducer,
    subscribe: subscribeReducer,
    play: playReducer,
    check: checkReducer,
});

export default reducer;