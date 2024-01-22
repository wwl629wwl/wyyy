import baseAction from "./base";
import storeAction from "./store";
import songAction from "./song";
import collectAction from "./collect";
import subscribeAction from "./subscribe";
import playAction from "./play";
import checkAction from "./check";

/* 在这里合并Action */
const action = {
    base: baseAction,
    store: storeAction,
    song: songAction,
    collect: collectAction,
    subscribe: subscribeAction,
    play: playAction,
    check: checkAction
};

export default action;