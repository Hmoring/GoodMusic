<template>
    <div>
       <div class="box" v-loading="load">
            <div v-for="(item,index) in singerLike" :key="index" @click="goTo(item)" class="box-a">
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
            singerLike:[],
            load:false,
        }
    },
    methods:{
         getLike(){
           let url='http://localhost:3000/simi/artist?id='+this.$route.query.id
            let that=this
            axios.get(url).then(function(result){
               console.log(result);
               that.singerLike=result.data.artists
            }) 
        },
        goTo(item){

        }
    },
    mounted(){
        this.getLike()
    }
}
</script>
<style  scoped>
.box{
    display:flex;
    justify-content: left;
    flex-wrap: wrap;
    margin-top: 10px;
    margin-bottom: 10px;
    padding-left: 15px;
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