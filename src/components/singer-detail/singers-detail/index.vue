<template>
    <div>
        <div class="singer">
            <div class="name">简介
                <div class="box"></div>
            </div>
            <div class="singerText">
                {{singerList.briefDesc}}
            </div>
            <div class="singerHave">
                <div class="singers" v-for="(item,index) in singerList.introduction" :key="index">
                    <div class="ti">{{item.ti}}</div>
                    <div>{{item.txt}}</div>
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
            singerList:[]
        }
    },
    methods:{
        getSingers(){
           let url='http://localhost:3000/artist/desc?id='+this.$route.query.id
            let that=this
            axios.get(url).then(function(result){
               console.log(result);
               that.singerList=result.data
            }) 
        },
    },
    mounted(){
        this.getSingers()
    }
}
</script>
<style scoped>
.singer{
    width:100%;
    line-height:25px;
    
}
.name{
    font-size: 18px;
    font-weight: 600;
    text-align: center;
}
.box{
    margin: auto;
    width: 40px;
    border-bottom:2px solid red ;
    margin-top:5px;
}
.singerText{
    margin-top: 30px;
    width: 100%;
    font-size: 14px;
    text-align: center;
}
.singerHave{
    margin-top: 20px;
    font-size: 14px;
     white-space: pre-wrap;
}
.singers{
    margin-top: 20px;
}
.ti{
    font-size: 15px;
    font-weight: 600;
    
}
</style>