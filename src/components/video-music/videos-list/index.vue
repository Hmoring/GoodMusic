<template>
    <div :style="{display:bujianle}">
        <div class="boxbb">
            <el-button class="btn" @click="dis">{{firstName}}&nbsp;&nbsp;<i class="el-icon-arrow-down"></i></el-button>
            <div class="box-text">
                <a>热门标签:</a>
                <div class="box-text1" 
                v-for="(item,index) in biaoqian" 
                :key="index"
                :class="{active1:countbiaoqian===index}"
                @click="changeBiao(item,index)">
                    {{item.name}}
                </div>
                <div class="btns">
                    <el-button size="small"  :class="{btn1:count1}" @click="btn1">热门</el-button>
                    <el-button size="small"  :class="{btn1:count2}" @click="btn2">最新</el-button>
                </div>
            </div>
        </div>
            <div :style="{display:disp}" :class="{active:countIndex}">
                <div :class="{d3:countIndex}"  >
                        <div 
                            :class="{d2:countIndex,moring:dd2===item.name}" 
                            v-for="(item,index) in fenleibiaoqian" 
                            :key="index"
                            @click="changeName(item)">
                                {{item.name}}
                            </div>
                </div>
            </div>
       <div class="box" >
           <div class="box-b" v-loading="load">
                <div class="boxs" v-for="(item,index) in Allvideo" :key="index">
                    <div class="playcount">
                        <i class="el-icon-caret-right"></i>
                        {{utils.tranNumber(item.playTime,0)}}
                    </div>
                    <div class="newBox">
                        {{item.creator.nickname}}
                    </div>
                    <div class="box-b1">
                        <img :src="item.coverUrl" style="width:300px;height:170px" alt="">
                    </div>
                    <div class="text">
                        <!-- {{item.title}} -->
                        {{item.title}}
                    </div>
                </div>
           </div>
           <div class="fenyi">
               <el-button :style="{disabled}" size="small" @click="shang" type="danger" >上一页</el-button>
               <el-button size="small" @click="xai" type="danger" >下一页</el-button>
        </div>
       </div>
    </div>
</template>
<script>
import axios from 'axios'

export default {
    data(){
        return{
            disabled:false,
            munLists:[],
            bujianle:'none',
            pageInfo:{
                pageIndex:1,
                pageSize:8,
                total:0,
            },
            need:{
                order:'hot',
                cat:'',
                limit:8,
                offset:0
            },
            countIndex:false,
            countbiaoqian:'',
            dd2:'',
            firstName:'全部',
            count1:true,
            count2:false,
            biaoqian:[],
            fenleibiaoqian:[],
            disp:'none',
            Allvideo:[],
            offset:0,
            fenleiId:[],
            load:false,
        }
        
    },
    methods:{
        //获取视频标签
        getlist(){
            let url='http://localhost:3000/video/group/list'
            let that=this
            axios.get(url).then(function(result){
                // console.log(result);
                
                that.fenleibiaoqian=result.data.data
                // console.log(that.fenleibiaoqian);
                
            })
        },
        //获取视频分类
        getFenlei(){
            
            let url='http://localhost:3000/video/category/list'
            let that=this
            axios.get(url,{withCredentials: true}).then(function(result){
                // console.
                // log(result);
                that.biaoqian=result.data.data
                
            })
        },
        //由分类/标签的id来获取视频
        getFenleiVideo(){
            this.Allvideo=[]
            this.load=true
            let url='http://localhost:3000/video/group?id='+this.fenleiId+'&offset='+this.offset
            let that=this
            axios.get(url,{withCredentials: true}).then(function(result){
                console.log(result);
                // that.biaoqian=result.data.data
                that.Allvideo=result.data.datas.map(item=>{
                    return item.data
                })
                that.load=false
            })
        },
        //获取推荐的视频
        getAllvidedo(){
            this.load=true
            let url='http://localhost:3000/video/timeline/all?offset='+this.offset
            let that=this
            axios.get(url,{withCredentials: true }).then(function(result){
                // console.log(result);
                that.Allvideo=result.data.datas.map(item=>{
                    return item.data
                })
                // console.log(that.Allvideo);
                // that.biaoqian=result.data.data
               that.load=false
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
            this.offset=(a-1)*8
            if(this.fenleiId){
                this.getFenleiVideo()
            }else if(!this.fenleiId){
                this.getAllvidedo()
            }
            this.pageInfo.pageIndex--
            }
        },
        xai(){
            let a=this.pageInfo.pageIndex+1
            this.offset=(a-1)*8
            if(this.fenleiId){
                this.getFenleiVideo()
            }else if(!this.fenleiId){
                this.getAllvidedo()
            }
            this.pageInfo.pageIndex++
        },
        changeBiao(item,index){
            this.countbiaoqian=index
            this.dd2=''
            this.firstName=item.name
            this.need.cat=item.name
            console.log(item);
            this.fenleiId=item.id
            this.getFenleiVideo()
        },
        handleSizeChange(){

        },
        handleCurrentChange(val){
            this.pageInfo.pageIndex = val
            this.need.offset = (val - 1) * this.pageInfo.pageSize
            console.log(this.need);
            this.getTese()
        },
        changeName(itemss){
            this.dd2=itemss.name
            this.need.cat=itemss.name
            this.countIndex=false
            this.disp='none'
            this.firstName=itemss.name
            this.countbiaoqian=''
            this.fenleiId=itemss.id
            this.getFenleiVideo()
        },
        dis(){
            this.countIndex=!this.countIndex
            if(this.disp==='inline'){
                this.disp='none'
            }else{
                this.disp='inline'
            }
            
        },
        btn1(){
            if(this.count1){
                this.count1=true
            }else{
                this.count1=!this.count1
                this.count2=false
                this.need.order='hot'
                this.getTese()
            }
        },
        btn2(){
            if(this.count2){
                this.count2
            }else{
                this.count2=!this.count2
                this.count1=false
                this.need.order='new'
                this.getTese()
            }
        },
         testingUser(){
            if(this.list){
                 this.bujianle='inline'
                 this.getAllvidedo()
            }else{
                this.$confirm('此操作需要登录您的网易云音乐账号, 是否登录?', '提示', {
                    confirmButtonText: '登录',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true
                }).then(() => { 
                     this.$router.push({
                        path: '/login'
                    })
                }).catch(() => {
                    this.bujianle='none'
                    this.$message({
                        type: 'info',
                        message: '已取消登录'
                    });
                });
            
        }
        }
    },
    computed:{
        list(){
            return this.$store.state.userId
            
        }
    },
    watch:{
        list(){
            this.testingUser()
        }
    },
    mounted(){
        this.getlist()
        this.getFenlei()
       
        this.testingUser()
        // this.getFenleiVideo()
        
    }
}
</script>
<style scoped>

.box{
    width: 100%;
    height: 100%;
    padding-top: 80px;  
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
    width: 100%;
    height: 100%;
    display: flex;
    justify-content:space-between;
    flex-wrap: wrap;
}
.ax{
    display: none;
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
.fenyi{
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 20px;
    margin-bottom: 20px;
    position: relative;
}
.boxbb{
    width: 100%;
    height: 45px;
    position: absolute;
    margin-top: 20px;
    box-shadow: 1px 2px 20px #e7e7e7;
    display: flex;
    align-items: center;
}
.btn{
    height: 45px;
    background-color: red;
    color: white;
    border:none;
}

.active{
    width: 50%;
    height: 400px;
    position: absolute;
    top: 75px;
    border-radius: 5px;
    box-shadow: 1px 2px 20px #e7e7e7; 
    background: white; 
    z-index: 11;
   overflow-y: scroll;
   overflow-x: hidden;

}
.box-text{
    display: flex;
    align-items: center;
}
.box-text a{
    font-size: 14px;
    line-height: 45px;
    margin-left: 15px;
}
.box-text1{
    margin-left: 20px;
    font-size: 14px;
    line-height: 45px;
    cursor: pointer;
}
.box-text1:hover{
    color:red;
}
.box-text1.active1{
    color:red;
}
.btns{
    position:absolute;
    right: 20px;
}
.btn1{
    background-color: red;
    color: white;
    outline: none;
}
.d1{
   font-size: 15px;
   font-weight: 600;
    margin: 15px;
}
.d1 i{
    font-size: 16px;

}
.d3{
    width: 100%;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    flex-direction:row;
    margin-bottom: 20px;
}
.d2{
    height: 25px;
    background: rgb(233, 233, 233);
    font-size: 12px;
    margin: 8px;  
    border-radius: 20px;
    text-align: center;
    line-height: 25px;
    padding: 5px;
    padding-left: 15px;
    padding-right: 15px;     
}
.d2:hover{
    background-color: red;
    color: white;
    transition-duration:0.5s;
}
.moring{
    background-color: red;
    color: white;
}
</style>
