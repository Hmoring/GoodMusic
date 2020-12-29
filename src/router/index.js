import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/login.vue'
import Index from '@/components/index.vue'
// 发现音乐
import Findmusic from '@/components/find-music/index.vue'

// 排行榜
import Rankingmusic from '@/components/ranking-music/index.vue'
//歌单
import Songmusic from '@/components/song-music/index.vue'
//歌手
import Singermusic from '@/components/singer-music/index.vue'
//视频
import Videomusic from '@/components/video-music/index.vue'
//MV
import Likemusic from '@/components/like-music/index.vue'
//歌单详情页
import Playlist from '@/components/playlist-detail/index.vue'
//个人主页
import Userlist from '@/components/user-detail/index.vue'
//歌手详情
import Singerdetail from '@/components/singer-detail/index.vue'
Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            name: 'HelloWorld',
            redirect: '/find-music'
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/index',
            name: 'index',
            component: Index,
            children: [{
                    path: '/find-music',
                    name: 'find-music',
                    component: Findmusic
                },
                {
                    path: '/ranking-music',
                    name: 'ranking-music',
                    component: Rankingmusic
                },
                {
                    path: '/song-music',
                    name: 'song-music',
                    component: Songmusic
                },
                {
                    path: '/singer-music',
                    name: 'singer-music',
                    component: Singermusic
                },
                {
                    path: '/video-music',
                    name: 'video-music',
                    component: Videomusic
                },
                {
                    path: '/like-music',
                    name: 'like-music',
                    component: Likemusic
                },
                {
                    path: '/playlist-detail',
                    name: 'playlist-detail',
                    component: Playlist
                },
                {
                    path: '/user-detail',
                    name: 'user-detail',
                    component: Userlist
                },
                {
                    path: '/singer-detail',
                    name: 'singer-detail',
                    component: Singerdetail,
                    // children: [{
                    //         path: '/singer-detail/singer-album',
                    //         name: 'singer-album',
                    //         component: Singeralbum,
                    //     },
                    //     {
                    //         path: '/singer-detail/singer-like',
                    //         name: 'singer-like',
                    //         component: Singerlike,
                    //     },
                    //     {
                    //         path: '/singer-detail/singer-mv',
                    //         name: 'singer-mv',
                    //         component: Singermv,
                    //     },
                    //     {
                    //         path: '/singer-detail/singer-zuoping',
                    //         name: 'singer-zuoping',
                    //         component: Singerzuoping,
                    //     },
                    //     {
                    //         path: '/singer-detail/singers-detail',
                    //         name: 'singers-detail',
                    //         component: Singersdetail,
                    //     }
                    // ]
                },
            ]
        }
    ]
})