<template>
    <div>
        <span>推荐歌手</span>
        <div class="box" v-loading="load">
            <div v-for="(item,index) in singer" :key="index" class="box-a">
                <div class="box-m">
                    <img :src="item.picUrl" alt="">
                </div>
                <div class="box-text">
                    <div class="text-1">
                        {{item.name}}
                    </div>
                    <div class="text-2">
                        单曲数{{item.musicSize}}
                    </div>
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
            singer:[],
            load:false
        }
    },
    methods:{
        getSinger(){
            this.load=true
            let url="http://localhost:3000/top/artists?offset=0&limit=33"
            let that=this
            axios.get(url).then(function(result){
                
                that.singer=result.data.artists
                that.load=false
            })
     }
    },
    mounted(){
        this.getSinger()
    }
}
</script>
<style scoped>
span{
    font-weight: 600;
}
.box{
    display:flex;
    justify-content: space-between;
    flex-wrap: wrap;
}
.box-a{
    width: 100px;
    height: 150px;
    margin: 10px;
}
.box-m{
    width: 100px;
    height:100px;
    border-radius: 50%;
  
    overflow: hidden;
}
.box-m img{
    width: 110px;
    height:100px;
}
.box-text{
    width: 100px;
    height: 50px;
    text-align: center;   
}
.text-1{
    margin-top: 5px;
    font-size: 15px;
    font-weight: 600;
}
.text-2{
    margin-top: 5px;
    font-size: 12px;
    color:red
}
</style>