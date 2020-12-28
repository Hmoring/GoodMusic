<template>
  <div class="box">
      <div class="Navigation">
          <div class="Navigation-logo">
              <img src="../assets/images/logo-a.png" width="30px" height="30px" alt="">
              <a>GoodMusic</a>
          </div>
          <div class="Navigation-fl">
              <div class="fl" 
              v-for="(item,index) in flList" 
              :key="index" 
              
              @click="toPage(item,index)">
                  <div class="fl-1" :class="{active:item.path === currentIndex}">
                    {{item.name}}
                  </div>
                  <div class="fl-2" :class="{active:item.path === currentIndex}"></div>
              </div>
          </div>
          <div class="Navigation-login">
              <el-button type="text" class="btn" icon="el-icon-search"></el-button>
              <a @click="gotoLogin" style="font-size:14px" :style="{display:display}">登录</a>
              <div class="loginBox">
                  <img :style="{display:display1}" :src="userPlist.avatarUrl" style="width:40px;height:40px;background:#ddd;border-radius:50%;margin-right:10px" alt="">
                  <el-dropdown trigger="click" @command="handleCommand" :style="{display:display1}">
                  <span class="el-dropdown-link">
                        {{userPlist.nickname}}<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item icon="el-icon-user" command="gotoUser">个人主页</el-dropdown-item>
                        <el-dropdown-item icon="el-icon-circle-plus">狮子头</el-dropdown-item>
                        <el-dropdown-item icon="el-icon-circle-plus-outline">螺蛳粉</el-dropdown-item>
                        <el-dropdown-item icon="el-icon-check">双皮奶</el-dropdown-item>
                        <el-dropdown-item icon="el-icon-circle-check" command="signOutlogin">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                    </el-dropdown>
              </div>
          </div>
      </div>
      <div class="content">
          <div class="boxs">
                <div class="boxLeft1"></div>
                <div class="boxLeft2"></div>
                <div class="boxRight1"></div>
                <div class="boxRight2"></div>
          </div>
          <div  class="banner">
              <img style="margin-top:-150px"  src="../../src/assets/images/personal.jpg" v-if="this.$route.path==='/user-detail'" alt="">
          </div>
          <div  class="banner1" v-if="this.$route.path==='/singer-detail'">
              <img style="margin-top:-270px;width:100%"  src="../../src/assets/images/top-bg.jpg"  alt="">
          </div>
              <img class="imgBnn" v-if="this.$route.path==='/singer-detail'" src="../../src/assets/images/arrow-lr.png"  alt="">
              <div class="banners" v-if="this.$route.path==='/singer-detail'"></div>
          <div class="con">
				<router-view  />
          </div>
          <div class="bottom">
              <div class="bottom-text">
                  <div class="text1"></div>
                  <a>GoodMusic</a>
              </div>
              <div class="text2">
                  GoodMusic
              </div>
              <div class="text3">
                  <div class="text3-1">Copyright © 2012-2020nicemusic 演示站. Designed by至一科技.</div>
              </div>
          </div>
	  </div>
      <div class="foot" v-for="(item,index) in bofanMusics" :key="index">
          <div class="foot-img">
              <img :src="item.al.picUrl" style="width:60px;height:60px" alt="">
          </div>
          <div class="foot-text">
              <div class="foot-name">{{item.al.name}}</div>
              <div class="foot-nickname">{{item.ar[0].name}}</div>
          </div>
          <div class="foot-caozuo">
              <div class="foot-left"><i class="el-icon-d-arrow-left"></i></div>
              <div class="foot-zhong" @click="changeBofan">
                  <div :style="{display:ax}"><i class="el-icon-video-play "></i></div>
                  <div :style="{display:ab}"><i class="el-icon-video-pause"></i></div>
              </div>
              <div class="foot-right"><i class="el-icon-d-arrow-right"></i></div>
          </div>
          <div class="sider-time">
              <audio 
              ref="audios"
              :src="musicUrl[0].url" 
               id="audio"
               @timeupdate="onTimeupdate"
               @loadedmetadata="onLoadedmetadata"
               autoplay="" ></audio>
              <span class="demonstration" >{{utils.formatSecondTime(audios.currentTime)}}</span>
          </div>
          <div class="block">
            <el-slider v-model="sliderTime" 
            :show-tooltip="false"
            @change="changeCurrentTime"
             ></el-slider>
          </div>
          <div class="sider-time1">
              <span class="demonstration">{{utils.formatTime(item.dt)}}</span>
          </div>
          <div class="font-shengyin">
              <i class="el-icon-headset"></i>
          </div>
          <div class="block1">
            <el-slider v-model="volumes" 
            :show-tooltip="false"
            @change="onChangeyinl"></el-slider>
          </div>
          <div class="foot-biaoqian">
              <i class="el-icon-connection"></i>
              <el-popover
                    placement="bottom"
                    title="标题"
                    width="350"
                    trigger="manual"
                    content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。"
                    v-model="visible">
              <a slot="reference"  style="margin-left:35px;font-size:18px">词</a>
              </el-popover>
              <i class="el-icon-set-up"></i>
          </div>
      </div>
  </div>
</template>
<script>
import axios from 'axios'
import {mapState, mapGetters, mapMutations} from 'vuex'


export default {
    data(){
        return{
            msg:'你大爷',
            currentIndex:'/find-music',
            bofanMusics:[],
            songIds:[],
            musicUrl:[],
            isPlaying:'',
            isStore:true,
            progress:'0%',
            ax:'none',
            ab:'inline',
            sliderTime:[],
            volumes:[],
            userPlist:[],
            display:'inline',
            display1:'none',
            userIds:[],
            userpp:'',
            audios:{
                currentTime:0,
                maxTime:'',
                volume:'',
            },
            flList:[
                { path: '/find-music',name:'发现音乐'},
                { path: '/ranking-music',name:'排行榜'},
                { path: '/song-music',name:'歌单'},
                { path: '/singer-music',name:'歌手'},
                { path: '/video-music',name:'视频'},
                { path: '/like-music',name:'喜欢的音乐'},
                ]
        }   
    },
    methods:{
        //获取用户登录后信息
        getUser(){
            let url='http://localhost:3000/user/detail?uid='+this.$store.state.userId
            let that=this
            axios.get(url).then(function(result){
                // console.log(result);
                that.userPlist=result.data.profile
                that.display='none'
                that.display1='inline'
            }).catch(function(){
                that.display='inline'
                that.display1='none'
            })
        },
        //退出登录
         handleCommand(command){
            // this.$store.dispatch('getChangeuserId','')
            if(command==='signOutlogin'){
            let url='http://localhost:3000/logout'
            let that=this
            axios.get(url).then(function(result){
                console.log(result);
                that.$store.dispatch('getChangeuserId','')
                that.getUser()
                that.$message({
                        type:'error',
                        message:'已退出登录!'
                   }) 
            })
         }else if(command==='gotoUser'){
             console.log(command);
            //  if(this.$route.path==='/user-detail'){
                //  this.userpp='usermm'
                 this.$router.push({
                      path:'/user-detail'
                 })
                 this.currentIndex=''
            //  
         }
        },
        //导航路由跳转
        toPage(item,index){
            if (this.$route.path === item.path) {
				return
            }
            this.currentIndex=item.path
			this.$router.push({
				path: item.path
			})
        },
        //跳转登录页面
        gotoLogin(){
            this.$router.push({
				path: '/login'
			})
        },
        //播放音乐
        changeBofan(){
            if(this.ax==='inline'){
                this.ax='none'
                this.ab='inline'
                this.plays() 
                
            }else if(this.ax==='none'){
                this.ax='inline'
                this.ab='none'  
               this.staup()               
            }
        },
        staup(){
            let audio=document.querySelector("#audio")
            audio.pause();
        },
        plays(){
             let audio=document.querySelector("#audio")
             audio.play()
        },
        formatTooltip(val) {
         return val / 100;
        },
        //改变歌曲当前播放时间
        changeCurrentTime(index) {
            let that=this
            that.audios.currentTime = parseInt(index / 100 * this.audios.maxTime)
            that.$nextTick(function(){
                let audio=document.querySelector("#audio")
                audio.currentTime=that.audios.currentTime
            })
            },
        //改变进度条的位置
        onTimeupdate(res) {
            this.audios.currentTime = res.target.currentTime
            this.sliderTime =parseInt(this.audios.currentTime / this.audios.maxTime * 100)
            },
        //改变播放音乐的音量大小
        onChangeyinl(index){
            let that=this
            that.$nextTick(function(){
                let audio=document.querySelector("#audio")
                audio.volume=index/100
            })
        },
        //获取歌曲时长以及当前的音量大小
        onLoadedmetadata(res) {
            this.audios.maxTime = parseInt(res.target.duration)
            this.volumes= parseInt(res.target.volume*100)
            }
        },
        computed:{
            //监听当前歌曲Id
            fanhui(){
                return this.songIds=this.$store.state.songId                      
            }
    },
    watch:{
        //获取当前歌曲ID下的歌曲信息以及歌曲的URL地址
        fanhui(){
            let url='http://localhost:3000/song/detail?ids='+this.songIds
            let that=this
            axios.get(url).then(function(result){
                
                that.bofanMusics=result.data.songs
               
            })
            let url1='http://localhost:3000/song/url?id='+this.songIds
            
           axios.get(url1).then(function(result){
                
                that.musicUrl=result.data.data
                console.log(that.musicUrl);
                that.ax='none'
                that.ab='inline'
               
            })
            
           
        },
        
    },
    mounted(){
        // this.music()
        // this.changeProgress()
        this.getUser()
    }
}
</script>
<style scoped>
.box{
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    
}
.content{
    position: absolute;
    top: 70px;
    right: 0;
    left: 0;
    bottom: 0;   
   
}
.con{
    position: relative;
    margin: auto;
    width: 80%;
    z-index: 9;
    min-height: 517px;
}
.Navigation{
    width: 100%;
    height: 70px;
    background-color: white;
    box-shadow: 0 1px 25px #cac9c9;
    position: fixed;
    display: flex;
    align-items: center;
    z-index: 10;
}
.Navigation-logo{
    display: flex;
    line-height: 32px;
    font-size: 20px;
    font-weight: 800;
    margin-left: 170px;
}
.Navigation-fl{
    display: flex;
    font-size: 14px;
    padding-left: 30px;
    margin-top: 10px;
    justify-content: center;
}
.Navigation-login{
    height: 50px;
    width: 250px;
    margin-left: 486px;
    display: flex;
    align-items: center;   
}
.loginBox{
    display: flex;
    align-items: center;
}
.btn{
    margin-right: 10px;
}
.fl-1{
    width: 80px;
    text-align: center;
    cursor: pointer;
}
.fl-1:hover{
    color:red;
}
.fl-1.active{
    color:red;
}
.fl-2{
    width: 20px;
    height: 5px;
    margin-left: 31px;
    border-radius: 20px;
    margin-top: 5px;
}
.fl-2.active{
    width: 20px;
    height: 5px;
    margin-left: 31px;
    border-radius: 20px;
    background: red;
    margin-top: 5px;
}
.bottom{
    position: relative;
    bottom: 0;
    width: 100%;
    height: 250px;
    background-color: #161e27;
}
.bottom-text{
    color: white;
    font-size: 12px;
    margin-left: 170px;
    padding-top: 50px;
    display: flex;
    
}
.bottom .text1{
    width: 3px;
    height: 18px;
    border-radius: 1px;
    background-color: red;
}
.bottom-text a{
    line-height: 20px;
    margin-left: 10px;
}
.text2{
    margin-left: 170px;
    font-size: 12px;
    color: rgb(116, 116, 116);
    margin-top: 10px;
}
.text3{
    width: 100%;  
    font-size: 12px;
    color: rgb(116, 116, 116);
    margin-top: 70px;
    border-top:1px solid rgb(59, 59, 59);
}
.text3-1{
    margin-top: 20px;
    margin-left: 170px;
}
.boxs{
    position: fixed;
     top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    z-index: 8;
}
.foot{
    width: 100%;
    height: 70px;
    position: fixed;
    background:white;
    box-shadow: 0 1px 15px #cac9c9;
    bottom: 0;
    z-index: 12;
    display: flex;
    align-items: center;
}
.foot-img{
    width: 60px;
    height: 60px;
    background:#ddd;
    border-radius: 5px;
    margin-left: 20px;
    overflow: hidden;
}
.foot-text{
    width: 150px;
    margin-left: 20px;
}
.foot-name{
    font-size: 14px;
    margin-bottom: 5px;
    font-weight: 600;
     overflow: hidden;
     white-space: nowrap;
     text-overflow: ellipsis;
}
.foot-nickname{
    font-size: 12px;
    margin-top: 10px;
    color: rgb(170, 170, 170);
}
.foot-caozuo{
    display: flex;
    align-items: center;
    margin-left: 10px;
}
.foot-left{
    font-size: 20px;
}
.foot-zhong{
    font-size: 45px;
    margin-left: 20px; 
    display: flex;
}

.foot-right{
    font-size: 20px;
    margin-left: 20px;
}
.sider-time{
    font-size: 14px;
    margin-left: 90px;
}
.sider-time1{
    font-size: 14px;
    margin-left: 30px;
}
.block{
    width:650px;
    margin-left: 30px;
}
.block1{
    width: 100px;
    margin-left: 20px;
}
.font-shengyin{
    margin-left: 30px;
    font-size: 25px;
}
.foot-biaoqian{
    font-size: 20px;
    margin-left: 50px; 
}
.foot-biaoqian i{
    margin-left: 35px;
}
.banner{
    width: 100%;
    margin-bottom: 0;
    position: fixed;
    overflow: hidden;
}
.banner1{
    width: 100%;
    height:600px;
    margin-bottom: 0;
    position: relative;
    overflow: hidden;
}
.imgBnn{
    position: absolute;
    width: 100%;
    margin-top: -115px;
    z-index: 2;
}
.banners{
    width: 100%;
    height:600px;
    position: relative;
    background: rgba(7, 8, 12, 0.7);
    margin-top: -600px;
}
.boxLeft1{
    margin-top:100px;
    margin-left: 40px;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background: linear-gradient(to right, rgba(100,84,239,0.07) 0%, rgba(48,33,236,0.04) 100%);
    -webkit-animation: move 2.5s linear infinite;
    animation: move 2.5s linear infinite;
    animation-direction:alternate;
}
@keyframes move
{
	from {margin-top: 100px;}
	to {margin-top: 150px;}
}
.boxLeft2{
    margin-top:150px;
    margin-left: 40px;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background: linear-gradient(to right, rgba(100,84,239,0.07) 0%, rgba(48,33,236,0.04) 100%);
    -webkit-animation: move1 3s linear infinite;
    animation: move1 3s linear infinite;
    animation-direction:alternate;
    
}
@keyframes move1
{
	from {margin-top: 150px;}
	to {margin-top: 0px;}
}
.boxRight1{
    margin-top: -400px;
    margin-right: 40px;
    float: right;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background: linear-gradient(to right, rgba(100,84,239,0.07) 0%, rgba(48,33,236,0.04) 100%);
    -webkit-animation: move2 5s linear infinite;
    animation: move2 5s linear infinite;
    animation-direction:alternate;
}
@keyframes move2
{
	from {margin-top: 0;}
	to {margin-top: -100px;}
}
.boxRight2{
    margin-top: -300px;
    margin-right: 60px;
    float: right;
    width: 150px;
    height: 150px;
    border-radius: 50%;
    background: linear-gradient(to right, rgba(100,84,239,0.07) 0%, rgba(48,33,236,0.04) 100%);
    -webkit-animation: move3 5s linear infinite;
    animation: move3 5s linear infinite;
    animation-direction:alternate;
}
@keyframes move3
{
	from {margin-top: -100px;}
	to {margin-top: 0;}
}
</style>