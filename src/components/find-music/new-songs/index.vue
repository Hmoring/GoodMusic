<template>
    <div>
        <span>推荐新歌曲</span>
        <div class="box" v-loading="load">
            <div v-for="(item,index) in songss" 
            :key="index" 
            @click="goMusic(item,index)" class="box-m">
                <div class="nubmers">
                 {{utils.formatZero(index + 1, 2)}}
                </div>
                 <div class="icon-i">
                    <i class="el-icon-video-play"></i>
                 </div>
                <div class="songimg">
                    <img :src="item.al.picUrl" alt="">
                </div>
                <div class="songtitle">
                    <div style="font-weight: 600; width: 80px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">{{item.name}}</div>
                    <div style="font-size:14px">{{item.ar[0].name}}</div>
                </div>
                <div class="title">
                    《{{item.name}}》
                </div>
                <div class="time">
                    {{utils.formatTime(item.dt)}}
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    data(){
        return{
            songss:[],
            load:false   
        }
    },
    methods:{
       getSongs(){
           this.load=true
            let url="http://localhost:3000/personalized/newsong"
            let list=[ ]
            let that=this
            axios.get(url).then(function(result){
                result.data.result.map(item=>{
                    list.push(item.id)
                })
                    that.getDetailSongs(list)
                    that.load=false
            })
     },
     getDetailSongs(lists){
            let url='http://localhost:3000/song/detail?ids='+lists
            let that=this
            axios.get(url).then(function(result){
                that.songss=result.data.songs
            })
     },
    goMusic(item,index){
        console.log(item.id);
        this.$store.dispatch('getChangeId',item.id)
    }
    },
    mounted(){
        this.getSongs()
       
    }
}
</script>
<style  scoped>
span{
    font-weight: 600;
}
.box{
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
}
.box-m{
    width: 650px;
    height: 90px;
    margin:10px;
    background-color: white;
    border-radius: 5px;
    box-shadow: 1px 2px 15px #e9e9e9;
    display: flex;
    align-items: center;
    position: relative;
}
.nubmers{
    position:absolute;
    margin-left: 30px;
    line-height: 90px;
}
.icon-i{
    position:absolute;
    font-size: 22px;
    margin-left: 28px;
    color: red;
    display: none;
}
.box-m:hover .icon-i{
    display: inline;
}
.box-m:hover .nubmers{
    display: none;
}
.songimg{
    width: 70px;
    height: 70px;
   
    margin-left: 70px;   
}
.songimg img{
    width: 70px;
    height: 70px;
}
.songtitle{
    width: 80px;
    height: 70px;
    margin-left: 30px;
    text-align: left;       
}
.songtitle div{
    margin-top: 10px;
}
.title{
    font-weight: 600;
    margin-left: 50px;
     width: 200px;
     overflow: hidden;
     white-space: nowrap;
     text-overflow: ellipsis;
}
.time{
    position: absolute;
    right: 50px;
    font-weight: 600;
}

</style>