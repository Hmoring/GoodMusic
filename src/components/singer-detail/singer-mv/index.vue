<template>
    <div>
     <div class="box-b" v-loading="load">
                <div class="boxs" v-for="(item,index) in singerMv" :key="index">
                    <div class="playcount">
                        <i class="el-icon-caret-right"></i>
                        {{utils.tranNumber(item.playCount,0)}}
                    </div>
                    <div class="newBox">
                        {{item.artistName}}
                    </div>
                    <div class="box-b1">
                        <img :src="item.imgurl" style="width:300px;height:170px" alt="">
                    </div>
                    <div class="text">
                        <!-- {{item.title}} -->
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
            load:false,
            singerMv:[],
        }
    },
    methods:{
        getAlbum(){
           let url='http://localhost:3000/artist/mv?id='+this.$route.query.id
            let that=this
            axios.get(url).then(function(result){
               console.log(result);
               that.singerMv=result.data.mvs
            }) 
        },
    },
    mounted(){
        this.getAlbum()
    }
}
</script>
<style  scoped>
.box-b{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content:left;
    flex-wrap: wrap;
}
.boxs{
     position: relative;
     padding-left: 14px;
    
}
.playcount{
    position: absolute;
    padding: 2px;
    background-color: black;
    color:white;
    margin-top: 15px;
    right: 20px;
    border-radius: 5px;
    font-size: 12px;
    z-index: 2;
    font-weight: 600;
    display: flex;
    align-items: center;
}
.text{
    width: 300px;
    margin-left: 10px;
    font-size: 15px;
    font-weight: 600;
}
.newBox{
    width:290px;
    height:40px;
    background:rgb(29, 29, 29,0.5);
    position: absolute;
    margin-top: 140px;
    margin-left: 10px;
    color: white;
    line-height: 40px;
    padding-left: 10px;
    z-index: 8;
    font-size: 14px;
}
.box-b1{
    width: 300px;
    height: 170px;
    margin: 10px;
    overflow: hidden;
    border-radius: 5px;
    position: relative;
    box-shadow: 1px 2px 10px  #e9e9e9;
}
.box-b1:hover{
    box-shadow: 1px 2px 10px  pink;
}
</style>