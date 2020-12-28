<template>
    <div>
        <span>推荐歌单</span>
        <div class="box" v-loading="load">
            <div class="boxs" v-for="(item,index) in recommendedsong" :key="index" @click="goTo(item)" >
                <div class="playcount">
                    {{utils.tranNumber(item.playCount,0)}}
                </div>
                <div class="box-gedan">
                   <img :src="item.picUrl" alt="">
                </div>
                <div class="nametext">
                    {{item.name}}
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
            recommendedsong:[],
            load:false
        }
    },
    methods:{
        getSong(){
            this.load=true
            let url="http://localhost:3000/personalized?limit=21"
            let that=this
            axios.get(url).then(function(result){
                
                that.recommendedsong=result.data.result
                that.load=false
            })
     },
     goTo(item){
         this.$router.push({
                path: '/playlist-detail',
                query:{id:item.id}
			})
     }
    },
    mounted(){
      this.getSong()
    }
}
</script>
<style  scoped>
span{
    font-weight: 600;  
}
.box{
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
}
.boxs{
    width: 150px;
    height: 220px;
    margin: 10px;
    position: relative;
}
.box-gedan{
    
    width: 150px;
    height: 150px;
    border-radius: 5px;
    box-shadow: 1px 2px 10px  #e9e9e9;
    text-align: center;
    cursor: pointer;
    overflow: hidden;
    
}
.box-gedan img{
    width: 150px;
    height: 150px;
}
.box .box-gedan:hover{
    box-shadow: 1px 2px 10px pink;
}
.playcount{
    position: absolute;
    padding: 2px;
    background-color: black;
    color:white;
    margin-top: 5px;
    right: 10px;
    border-radius: 5px;
    font-size: 12px;
   
}
.nametext{
    margin-top: 10px;
    font-size: 14px;
    font-weight: 600;
}
</style>