import * as TYPES from '../action-types';

const subscribeAction = {

    setMusicId(musicId) {

        return {
            type: TYPES.SUBSCRIBE_MUSIC_ITEM_ID,
            musicId
        }
    },
    setRelatedIndex(relatedIndex) {
        return {
            type: TYPES.SUBSCRIBE_RELATED_ITEM_INDEX,
            relatedIndex
        }
    }
}

export default subscribeAction;