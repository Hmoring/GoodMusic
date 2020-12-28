<template>
    <div>
       <div class="box">
           <div class="box-a">
               <div class="box-a1"></div>
               <a>云音乐特色榜</a>
           </div>
           <div class="box-b" v-loading="load">
                <div class="boxs" v-for="(item,index) in munList" :key="index" @click="goTo(item)">
                    <div class="playcount">
                        <i class="el-icon-caret-right"></i>
                        {{utils.tranNumber(item.playCount,0)}}
                    </div>
                    <div class="box-b1">
                        <img :src="item.coverImgUrl" style="width:150px;height:150px" alt="">
                    </div>
                    <div class="text">
                        {{item.name}}
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
            munList:[],
            load:false,
        }
    },
    methods:{
        getTese(){
            this.load=true
            let url='http://localhost:3000/toplist/detail'
            let that=this
            axios.get(url).then(function(result){
                that.munList=result.data.list.slice(0,4)
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
        this.getTese()
    }
}
</script>
<style scoped>
.box{
    width: 100%;
    height: 200px;
    margin-top: 20px;
    
}
.boxs{
     position: relative;
}
.box-a{
    width: 200px;
    height: 30px;
    display: flex;
    align-items: center;
}
.box-a1{
    width: 3px;
    height: 25px;
    background-color: red;
    border-radius: 3px;
}
.box-a a{
    font-size: 16px;
    font-weight: 600;
    margin-left: 10px;
}
.box-b{
    width: 56%;
    height: 150px;
    display: flex;
    justify-content: space-between;
    
}
.box-b1{
    width: 150px;
    height: 150px;
    margin: 10px;
    overflow: hidden;
    border-radius: 5px;
    position: relative;
    box-shadow: 1px 2px 10px  #e9e9e9;
}
.box-b1:hover{
    box-shadow: 1px 2px 10px  pink;
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
    margin-left: 10px;
    font-size: 15px;
    font-weight: 600;
}
</style>
