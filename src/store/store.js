import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
export default new Vuex.Store({
    state: {
        //播放歌曲的id
        songId: 22,
        userId: ''
    },
    getters: {

    },
    actions: {
        getChangeId(count, num) {
            count.commit('changeId', num)
        },
        getChangeuserId(counts, nums) {
            counts.commit('changeuserId', nums)
        }
    },
    mutations: {
        changeId(state, musicId) {
            state.songId = musicId
        },
        changeuserId(state, userId) {
            state.userId = userId
        }

    }
})