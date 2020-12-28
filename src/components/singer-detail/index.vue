<template>
    <div>
        <div class="singer">
            <div class="singerImg">
                <img style="width: 130px;height: 130px;border-radius: 50%;" :src="singerList.cover" alt="">
            </div>
            <div class="singerName">
                {{singerList.name}}
            </div>
            <div class="singerBox">
               <button class="singerBtn">+&nbsp;&nbsp;关注TA</button>
            </div>
            <div class="singerText">
                {{singerList.briefDesc}}
            </div>
            <div class="singerBiao">
                <div class="danqu">
                    <a>{{singerList.musicSize}}</a><br>
                    <a style="font-size:15px;color: rgb(179, 179, 179);">单曲数</a>
                </div>
                <div class="danqu">
                    <a>{{singerList.albumSize}}</a><br>
                    <a style="font-size:15px;color: rgb(179, 179, 179);">专辑数</a>
                </div>
                <div class="danqu">
                    <a>{{singerList.mvSize}}</a><br>
                    <a style="font-size:15px;color:rgb(179, 179, 179));">MV数</a>
                </div>
            </div>
        </div>
        <div class="singerRoute" >
            <div class="routeName" 
            v-for="(item,index) in singerRoute" 
            :key="index" 
            :class="{routeNames:item.name===countIndex}"
            @click="goToChind(item)">
                {{item.name}}
            </div>
        </div>
        <div class="singerLink" >
           <Singeralbum v-if="countIndex==='专辑'"></Singeralbum>
           <Singerlike v-if="countIndex==='相似歌手'"></Singerlike>
           <Singermv v-if="countIndex==='MV'"></Singermv>
           <Singerzuoping v-if="countIndex==='作品'"></Singerzuoping>
           <Singersdetail v-if="countIndex==='歌手详情'"></Singersdetail>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
//歌手专辑
import Singeralbum from '@/components/singer-detail/singer-album/index.vue'
//相似歌手
import Singerlike from '@/components/singer-detail/singer-like/index.vue'
//歌手MV
import Singermv from '@/components/singer-detail/singer-mv/index.vue'
//歌手作品
import Singerzuoping from '@/components/singer-detail/singer-zuoping/index.vue'
//歌手个人详情介绍
import Singersdetail from '@/components/singer-detail/singers-detail/index.vue'
export default {
    components:{
        Singeralbum,
        Singerlike,
        Singermv,
        Singerzuoping,
        Singersdetail
    },
    data(){
        return{
            singerList:[],
            singerRoute:[
                {path:'/singer-detail/singer-zuoping',name:'作品'},
                {path:'/singer-detail/singer-album',name:'专辑'},
                {path:'/singer-detail/singer-mv',name:'MV'},
                {path:'/singer-detail/singers-detail',name:'歌手详情'},
                {path:'/singer-detail/singer-like',name:'相似歌手'},
            ],
            countIndex:'作品',
        }
    },
    methods:{
        getSinger(){
            let url='http://localhost:3000/artist/detail?id='+this.$route.query.id
            let that=this
            axios.get(url).then(function(result){
                // console.log(result);
                that.singerList=result.data.data.artist
                console.log(that.singerList);
            })
        },
        goToChind(item){
            // if (this.$route.path === item.name) {
			// 	return
            // }
            this.countIndex=item.name
			
        }
    },
    mounted(){
        this.getSinger()
    }
}
</script>
<style  scoped>
.singer{
    width: 60%;
    height: 400px;
    position:relative;
    margin: auto;
    margin-top: -500px;
}
.singerImg{
    width: 130px;
    height: 130px;
    background: white;
    border-radius: 50%;
    margin: auto;
    overflow: hidden;
}
.singerName{
    width: 100%;
    margin: auto;
    text-align: center;
    font-size: 25px;
    font-weight: 600;
    color: white;
    margin-top: 10px;
}
.singerBox{
    width: 100%;
    display: flex;
    justify-content: center;
}
.singerBtn{
    width: 100px;
    height: 35px;
    margin: auto;
    border-radius: 20px;
    font-size: 14px;
    border-color: white;
    border-style: solid;
    outline-style: none;
    background:transparent;
    color: white;
    margin-top: 20px;
}
.singerText{
    width: 100%;
    height: 40px;
    display: flex;
    text-align: center;
    color: rgb(179, 179, 179);
    margin-top: 40px;
    justify-content: center;
    flex-wrap: wrap;
    font-size: 14px;
    font-weight: 600;
   word-break: break-all;
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}
.singerBiao{
    width: 50%;
    margin: auto;
    display: flex;
    justify-content: space-around;
    margin-top: 20px;
    color: white;
    font-size: 25px;
}
.danqu{
    text-align: center;
}
.singerRoute{
    width: 100%;
    height: 50px;
    margin-top: 120px;
    display: flex;
    text-align: center;
    align-items: center;
    justify-content: center;
    
}
.routeName{
    font-size: 15px;
    font-weight: 600;
    margin-left: 40px;
}
.routeNames{
    color: red;
}
.singerLink{
    width: 100%;
    height: 100%;
    margin-top: 20px;
    margin-bottom: 30px;
}
</style>