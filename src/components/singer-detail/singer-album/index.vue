<template>
    <div>
       <div class="buidMusicbox">
                        <div class="buidMusicbox1" @click="goTo(item)" v-for="(item,index) in singerAlbum" :key="index">
                            <div class="playcount">
                                <i class="el-icon-caret-right"></i>
                                {{(item.subType)?(item.subType):(item.type)}}
                            </div>
                            <div class="box-b1">
                                <img :src="item.picUrl" style="width:200px;height:200px" alt="">
                            </div>
                            <div class="text">
                                {{item.name}} 
                            </div>
                            <div class="textName">
                                {{item.artist.name}}
                            </div>
                            <div class="textDete">
                                {{utils.dateFormat(item.publishTime, 'YYYY-MM-DD')}}
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
            singerAlbum:[]
        }
    },
    methods:{
         getAlbum(){
           let url='http://localhost:3000/artist/album?limit=60&id='+this.$route.query.id
            let that=this
            axios.get(url).then(function(result){
               console.log(result);
               that.singerAlbum=result.data.hotAlbums
            }) 
        },
        goTo(item){

        }
    },
    mounted(){
        this.getAlbum()
    }
}
</script>
<style scoped>
.buidMusicbox{
    width: 100%;
    display: flex;
    justify-content:left;
    flex-wrap: wrap;
    margin-top: -10px;
    margin-bottom: 30px;
}
.buidMusicbox1{
   position: relative;
   margin-left: 21px;
}
.playcount{
    position: absolute;
    padding: 2px;
    background-color: black;
    color:white;
    margin-top: 25px;
    right: 20px;
    border-radius: 5px;
    font-size: 12px;
    z-index: 2;
    font-weight: 600;
    display: flex;
    align-items: center;
}
.text{
    width: 200px;
    font-size: 15px;
    font-weight: 600;
    margin-top: 10px;
}
.textName{
    font-size: 12px;
    margin-top: 8px;
    color: rgb(109, 109, 109);
}
.textDete{
    font-size: 12px;
    margin-top: 5px;
    color: rgb(109, 109, 109);
}
.box-b1{
    width: 200px;
    height: 200px;
    overflow: hidden;
    border-radius: 5px;
    position: relative;
    margin-top: 20px;
    box-shadow: 1px 2px 10px  #e9e9e9;
}
.box-b1:hover{
    box-shadow: 1px 2px 10px  pink;
}
</style>