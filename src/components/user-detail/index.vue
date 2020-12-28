<template>
    <div>
        <div class="banner">
            <div class="myindex">
                <div class="indexImg">
                    <img style="width:100%" :src="userList.backgroundUrl" alt="">
                </div>
                <div class="indexBox">
                    <div class="indexBox1">
                        <img :src="userList.avatarUrl" style="width:70px;height:70px;background:#ddd;margin-top:-40px;border-radius: 5px;" alt="">
                        <a style="font-weight: 600;">{{userList.nickname}}</a>
                        <div class="text3-box">签到</div>
                    </div>
                    <div class="indexBox2">
                        <ul>
                            <li>等级:&nbsp;{{userMenu.level}}</li>
                            <li>年龄:&nbsp;{{utils.getAstro(userList.birthday)}}</li>
                            <li>地区:&nbsp;{{userList.city}}</li>
                        </ul>
                    </div>
                    <div class="indexBox3">
                        <div class="box3-1">
                              <div>动态</div>                                             
                              <div>{{userList.djStatus}}</div>                                             
                        </div>
                        <div class="box3-1">
                              <div>关注</div>                                             
                              <div>{{userList.followeds}}</div>                                             
                        </div>
                        <div class="box3-1">
                              <div>粉丝</div>                                             
                              <div>{{userList.follows}}</div>                                             
                        </div>
                    </div>
                    <div class="indexBox4">
                        <button class="btn2">个人设置</button>
                        <button class="btn2">我的等级</button>
                    </div>
                </div>
            </div>
            <div class="musicRank">
                <div class="buidTitel">
                        <div class="Titelbox"></div>
                        <div class="Titeltext" style="display:flex;">
                            听歌排行
                            <div style="font-size:14px;font-weight: 400;color: rgb(155, 154, 154);">&nbsp;(累计听歌{{userMenu.listenSongs}}首)</div>
                        </div>
                        <div class="TitelRight">
                            <a @click="changebtn1" :class="{TitelRightbtn:btn1}"> 最近一周</a>
                            |
                            <a @click="changebtn2" :class="{TitelRightbtn:btn2}">所有时间</a>
                        </div>
                    </div>
                 <div class="t-box2">
                  <div class="twoBtn">
                    <el-button class="twoBtn1 el-icon-video-play" 
                    @click="boFan">播放全部</el-button>
                   
                  </div>
                  <div class="geDan" v-loading="load">
                    <el-table
                    :data="musicSongs"
                    style="width: 100%"
                    @row-click="goMusics"
                    stripe
                    >
                      <el-table-column
                        
                        label="序号"
                        width="70"
                        type="index"
                        :index="indexs"
                        :show-overflow-tooltip="true"
                        >
                        <!-- <template slot-scope="scope"  >
                          {{ utils.formatZero(scope.row.index)}}
                        </template> -->
                      </el-table-column>
                      <el-table-column
                        label="歌曲"
                        width="250"
                        :show-overflow-tooltip="true"
                        label-class-name="lolt">
                        <template slot-scope="scope" class="scopeds" >
                          <img :src="scope.row.al.picUrl"  style="width:35px;height:35px;border-radius:5px" alt="">
                          {{ scope.row.name }}
                        </template>
                      </el-table-column>

                      <el-table-column
                        prop="ar[0].name"
                        label="歌手"
                        
                        :show-overflow-tooltip="true"
                        >
                      </el-table-column>
                      <el-table-column
                        prop="al.name"
                        label="专辑"
                        width="100"
                        :show-overflow-tooltip="true">
                      </el-table-column>
                      <el-table-column
                      
                        label="时长"
                        width="70"
                        :show-overflow-tooltip="true">
                        <template slot-scope="scope"  >
                          {{ utils.formatTime(scope.row.dt )}}
                        </template>
                      </el-table-column>
                  </el-table>
                  </div>
                  <div class="fenyi">
                      <!-- <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="pageInfo.pageIndex"
                        :page-sizes="[30]"
                        :page-size="pageInfo.pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="pageInfo.total"> -->
                      <!-- </el-pagination> -->
                  </div>
                </div>
            </div>
            <div class="myMusic">
                <div class="buidMusic">
                    <div class="buidTitel">
                        <div class="Titelbox"></div>
                        <div class="Titeltext">我创建的歌单</div>
                    </div>
                    <div class="buidMusicbox">
                        <div class="buidMusicbox1" @click="goTo(item)" v-for="(item,index) in userBuidsongs" :key="index">
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
                <div class="CollectionMusic">
                     <div class="buidTitel">
                        <div class="Titelbox"></div>
                        <div class="Titeltext">我收藏的歌单</div>
                    </div>
                    <div class="buidMusicbox">
                        <div class="buidMusicbox1" @click="goTo(item)" v-for="(item,index) in userCollection" :key="index">
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
        </div>
    </div>
</template>
<script>
import axios from 'axios'

export default {
    data(){
        return{
            userList:[],
            userMenu:[],
            playMusic:[],
            load:false,
            userBuidsongs:[],
            userCollection:[],
            musicPlist:[],
            musictype:1,
            musicSongs:[],
            btn1:true,
            btn2:false,
            pageInfo:{
                pageIndex:1,
                pageSize:40,
                total:0,
          }, 
        }
    },
    methods:{
        //获取用户基本信息
        getUser(){
            let url='http://localhost:3000/user/detail?uid='+this.$store.state.userId
            let that=this
            axios.get(url).then(function(result){
               
                that.userList=result.data.profile
                that.userMenu=result.data
            })
        },
        //获取用户的歌单
        getUsermation(){
            let url='http://localhost:3000/user/playlist?uid='+this.$store.state.userId
            let that=this
            axios.get(url).then(function(result){
                
                that.userBuidsongs=result.data.playlist.filter(item=>{
                    if(item.userId===that.$store.state.userId){
                        return item
                    }
                })
                that.userCollection=result.data.playlist.slice(that.userBuidsongs.length,result.data.playlist.length) 
            })
        },
        //获取听歌排行
        getMusicPlist(){
            let url='http://localhost:3000/user/record?uid='+this.$store.state.userId+'&type='+this.musictype
            let that=this
            axios.get(url).then(function(result){
                console.log(result);
                if(result.data.weekData){
                    that.musicSongs=result.data.weekData.map(item=>{
                        return item.song
                    })
                }else if(result.data.allData){
                    that.musicSongs=result.data.allData.map(item=>{
                        return item.song
                    })
                }
                // that.pageInfo.total=that.musicSongs.length
                // that.idss=that.idss.slice((that.pageInfo.pageIndex - 1) * that.pageInfo.pageSize, that.pageInfo.pageIndex * that.pageInfo.pageSize)
                
            })
        },
        goMusics(item){
            this.$store.dispatch('getChangeId',item.id)
            console.log(item);
        },
         goTo(item){
         this.$router.push({
                path: '/playlist-detail',
                query:{id:item.id}
			})
     },
        changebtn1(){
            this.btn1=true
            this.btn2=false
            this.musictype=1
            this.getMusicPlist()
        },
        changebtn2(){
            this.btn2=true
            this.btn1=false
            this.musictype=0
            this.getMusicPlist()
        },
        handleSizeChange(){},
        handleCurrentChange(val){
            console.log(val);
        },
        boFan(){

        },
        goMusic(){

        },
        indexs(index){
           return  this.utils.formatZero(index+1,2)
    }
    },
    mounted(){
        this.getUser()
        this.getUsermation()
        this.getMusicPlist()
    }
}
</script>

<style scoped>
.banner{
    width: 100%;
    height: 100%;
    position: relative;
    margin-top: 250px;
    display: flex;
    justify-content: space-between;
}
.myindex{
    width: 345px;
    height: 450px;
    background: white;
    box-shadow: 1px 2px 15px rgb(231, 231, 231);
    margin-top: -100px;
    border-radius: 5px;
    overflow: hidden;
}
.indexImg{
    width:100%;
    height: 150px;
    overflow: hidden;
}
.indexBox{
    width: 85%;
    height: 300px;
    margin: auto;
    
}
.indexBox1{
    width: 100%;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.text3-box{
  padding: 5px;
  padding-left: 15px;
  padding-right: 15px;
  background: red;
  color: white;
  margin-left: 10px;
  border-radius: 20px;
  font-size: 13px;
}
.indexBox2{
    width: 100%;
    height: 80px;
}
.indexBox2 ul{
    padding: 0;
    margin: 0;
    padding-left: 25px;
}
.indexBox2 ul li{
    padding-top: 5px;
    font-size: 14px;
}
.indexBox3{
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    text-align: center;
    font-size: 15px;
    margin-top: 20px;
    color: rgb(125, 196, 230);
}
.indexBox4{
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-top:20px;
}
.btn2{
    width:120px;
    height:40px;
    font-size: 15px;
    border-style: none;
    background:rgb(248, 61, 61);
    color:white;
    border-radius: 5px;
    outline-style: none;
}
.musicRank{
    width: 640px;
    height: 100%;
    background: white;
    box-shadow: 1px 2px 15px rgb(231, 231, 231);
    border-radius: 5px;
    overflow: hidden;
    margin-bottom: 30px;
}
.t-box2{
    width:96%;
    margin: auto;
    padding:10px;
}
.myMusic{
   width: 345px;
    height:100%;
}
.buidMusic{
    width: 100%;
    height: 100%;
    background: white;
    box-shadow: 1px 2px 15px rgb(231, 231, 231);
    border-radius: 5px;
    overflow: hidden;
    
}
.buidTitel{
    width: 100%;
    height: 40px;
    display: flex;
    align-items: center;
}
.Titelbox{
    width:3px;
    height:25px;
    background:red;
    margin-left: 12px;
}
.Titeltext{
    font-size: 15px;
    font-weight: 600;
    margin-left: 15px;
}
.TitelRight{
    margin-left: 300px;
    font-size: 13px;
    color: rgb(143, 143, 143);
    cursor: pointer;
}
.TitelRightbtn{
    
    color: red;
}
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
}
.CollectionMusic{
    width: 100%;
    background: white;
    box-shadow: 1px 2px 15px rgb(231, 231, 231);
    border-radius: 5px;
    overflow: hidden;
    margin-top: 30px;
    margin-bottom: 30px;
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
.fenyi{
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 20px;
    margin-bottom: 20px;
    position: relative;
}
.twoBtn{
  float:right;
  margin-bottom: 10px;
}
.twoBtn1{
  padding: 8px;
  padding-left: 10px;
  padding-right: 10px;
  background: red;
  border-radius: 20px;
  font-size: 14px;
  color:white;
  outline: none;
}
.scopeds{
    display: flex;
    align-items: center;
}
</style>