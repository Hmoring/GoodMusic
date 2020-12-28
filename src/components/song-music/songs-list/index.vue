<template>
    <div>
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
                <div  v-for="(item,index) in typeList" :key="index">
                     <div :class="{d1:countIndex}">
                        <i :class="item.icon"></i>{{item.value}}
                    </div>
                        <div :class="{d3:countIndex}"  v-for="(items,indexs) in item.list" :key="indexs">
                            <div 
                            :class="{d2:countIndex,moring:dd2===itemss.name}" 
                            v-for="itemss in items" 
                            :key="itemss.name"
                            @click="changeName(itemss)">
                                {{itemss.name}}
                            </div>
                            
                        </div> 
                    
                </div>
                
            </div>
       <div class="box" >
           <div class="box-b" v-loading="load">
                <div class="boxs" v-for="(item,index) in munLists" :key="index" @click="goTo(item)">
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
           <div class="fenyi">
               <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="pageInfo.pageIndex"
                :page-sizes="[49]"
                :page-size="pageInfo.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="pageInfo.total">
               </el-pagination>
           </div>
       </div>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    data(){
        return{
            munLists:[],
            load:false,
            pageInfo:{
                pageIndex:1,
                pageSize:49,
                total:0,
            },
            need:{
                order:'hot',
                cat:'',
                limit:49,
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
            typeList: [
        {
          key: 0,
          value: '语种',
          icon: 'el-icon-s-data',
          list:[]
        },
        {
          key: 1,
          value: '风格',
          icon: 'el-icon-wind-power',
          list:[]
        },
        {
          key: 2,
          value: '场景',
          icon: 'el-icon-hot-water',
          list:[]
        },
        {
          key: 3,
          value: '情感',
          icon: 'el-icon-sugar',
          list:[]
        },
        {
          key: 4,
          value: '主题',
          icon: 'el-icon-user',
          list:[]
        }
      ]}
        
        
        
    },
    methods:{
        getTese(){
            this.load=true
            let url='http://localhost:3000/top/playlist?order='+this.need.order+'&cat='+this.need.cat+'&limit='+this.need.limit+'&offset='+this.need.offset
            let that=this
            axios.get(url).then(function(result){
                
                that.munLists=result.data.playlists
                that.pageInfo.total=result.data.total
                that.load=false
            })
                
        },
        getbiao(){
            let url='http://localhost:3000/playlist/hot'
            let that=this
            axios.get(url).then(function(result){
                
                that.biaoqian=result.data.tags
                
            })
        },
        goTo(item){
         this.$router.push({
                path: '/playlist-detail',
                query:{id:item.id}
			})
     },
        getlist(){
            let url='http://localhost:3000/playlist/catlist'
            let that=this
            axios.get(url).then(function(result){
                console.log(result);
                that.typeList[0].list.push(result.data.sub.filter(item=>{
                    return item.category===0
                })) 
                that.typeList[1].list.push(result.data.sub.filter(item=>{
                    return item.category===1
                })) 
                that.typeList[2].list.push(result.data.sub.filter(item=>{
                    return item.category===2
                })) 
                that.typeList[3].list.push(result.data.sub.filter(item=>{
                    return item.category===3
                })) 
                that.typeList[4].list.push(result.data.sub.filter(item=>{
                    return item.category===4
                })) 
                console.log(that.typeList);
            })
        },
        changeBiao(item,index){
            this.countbiaoqian=index
            this.dd2=''
            this.firstName=item.name
            this.need.cat=item.name
            this.getTese()
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
            this.getTese()
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
        }
    },
    mounted(){
        this.getTese()
        this.getbiao()
        this.getlist()
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
    width: 150px;
    margin-left: 10px;
    font-size: 15px;
    font-weight: 600;
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
