<template>
    <div>
        <div class="bigBox">
            <div class="small">
                <div class="text1" 
                :class="{textAll:lang===item.value}" 
                v-for="(item,index) in langs" 
                :key="index"
                @click="changeLang(item)">
                    {{item.label}}
                </div>
            </div>
            <div class="small">
                <div class="text1" 
                :class="{textAll:classify===item.value}" 
                v-for="(item,index) in classifys" 
                :key="index"
                @click="changClassifys(item)">
                    {{item.label}}
                </div>
            </div>
            <div class="small">
                <div class="text1" 
                :class="{textAll:en===item.value}" 
                v-for="(item,index) in ens" 
                :key="index"
                @click="changeEn(item)">
                    {{item.label}}
                </div>
            </div>
        </div>
        <div class="box" v-loading="load">
            <div v-for="(item,index) in singer" :key="index" @click="goTo(item)" class="box-a">
                <div class="box-m">
                    <img :src="item.img1v1Url" alt="">
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
        <div class="fenyi">
               <el-button :style="{disabled}" size="small" @click="shang" type="danger" >上一页</el-button>
               <el-button size="small" @click="xai" type="danger" >下一页</el-button>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    data(){
        return{
            singerlist:[],
            load:false,
            lang: -1,
            langs: [
                {
                value: -1,
                label: '全部'
                },
                {
                value: 7,
                label: '华语'
                },
                {
                value: 96,
                label: '欧美'
                },
                {
                value: 8,
                label: '日本'
                },
                {
                value: 16,
                label: '韩国'
                },
                {
                value: 0,
                label: '其他'
                }
            ],
            // 分类
            classify: -1,
            classifys: [
                {
                value: -1,
                label: '全部'
                },
                {
                value: 1,
                label: '男歌手'
                },
                {
                value: 2,
                label: '女歌手'
                },
                {
                value: 3,
                label: '乐队'
                }
            ],
            // 字母A_Z
            en: -1,
            ens: [],
            singer:[],
            seach:{
                limit:33,
                offset:0,
                initial:'',
                type:-1,
                area:-1
            },
            pageInfo:{
                pageIndex:1,
                pageSize:33,
                total:0,
            },
            disabled:false
        }
    },
    methods:{
        getFenl(){
            this.load=true
            let url='http://localhost:3000/artist/list?limit='+this.seach.limit+'&offset='+this.seach.offset+'&initial='+this.seach.initial+'&type='+this.seach.type+'&area='+this.seach.area
            let that=this
            axios.get(url).then(function(result){
                that.singer=result.data.artists
                that.pageInfo.total=that.singer.length
                that.load=false
            })
        },
        goTo(item){
         this.$router.push({
                path: '/singer-detail',
                query:{id:item.id}
			})
     },
        shang(){
            let a=this.pageInfo.pageIndex-1
            if(a<=0){
                this.disabled=true
                this.$message({
                    type:'error',
                    message:'不能在点了!'
                })
            }else{
            this.seach.offset=(a-1)*33
            this.getFenl()
            this.pageInfo.pageIndex--
            }
        },
        xai(){
            let a=this.pageInfo.pageIndex+1
            this.seach.offset=(a-1)*33
            this.getFenl()
            this.pageInfo.pageIndex++
        },
        getEn() {
            let ens = []
            for (let i = 0; i < 26; i++) {
                ens.push({
                value: String.fromCharCode(97 + i),
                label: String.fromCharCode(65 + i)
                })
            }
            ens.unshift({
                value: -1,
                label: '热门'
            })
            this.ens = ens
        },
        changeEn(item){
            this.en=item.value
            this.seach.initial=item.label
            this.getFenl()
        },
        changeLang(item){
            this.lang=item.value
            this.seach.area=item.value
            console.log(this.seach.area);
            this.getFenl()
        },
        changClassifys(item){
            this.classify=item.value
            this.seach.type=item.value
            this.getFenl()
        }
    },
    mounted(){
        this.getFenl()
        this.getEn()
    }
}
</script>
<style scoped>
.bigBox{
    width: 100%;
    height: 150px;
    
    margin-top: 20px;
   
}
.small{
    width: 100%;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
}
.text1{
    height: 20px;
    margin-top:15px;
    margin-left: 10px;
    font-size: 13px;
    padding: 5px;
    padding-left: 15px;
    padding-right: 15px;
    border-radius: 20px; 
    text-align: center;
    line-height: 20px;
    cursor: pointer;
}
.text1:hover{
    color: white;
    background: red;
    transition-duration:0.5s;

}
.textAll{
    color: white;
    background: red;
}
.box{
    display:flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-top: 10px;
    margin-bottom: 10px;
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
.fenyi{
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 20px;
    margin-bottom: 20px;
    position: relative;
}
</style>