<template>
    <div>
        <div class="f-box" :style="{display:bujianle}">
            <div class="f-box1" >
                <div class="t-box1" v-loading="load">
                  <div class="box-img">
                    <img :src="playlists.coverImgUrl" style="width:200px;height:200px" alt="">
                  </div>
                  <div class="box-text">
                    <div class="text1">{{playlists.name}}</div>
                      <div class="text2">
                        <div class="text-img"> <img :src="creator.avatarUrl" style="width:30px;height:30px" alt=""> </div>
                        <div class="text-text">{{creator.nickname}}</div>
                        <div class="text-text1">{{utils.dateFormat(playlists.createTime,'YYYY-MM-DD')}}创建</div>
                      </div>
                  </div>
                </div>
                <div class="t-box2">
                  <div class="twoBtn">
                    <el-button class="twoBtn1 el-icon-video-play" 
                    @click="boFan">播放全部</el-button>
                   
                  </div>
                  <div class="geDan" v-loading="load">
                    <el-table
                    :data="playMusic"
                    style="width: 100%"
                    @row-click="goMusic"
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
                        width="500"
                        :show-overflow-tooltip="true"
                        label-class-name="lolt">
                        <template slot-scope="scope"  >
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
                        width="300"
                        :show-overflow-tooltip="true">
                      </el-table-column>
                      <el-table-column
                      
                        label="时长"
                        width="100"
                        :show-overflow-tooltip="true">
                        <template slot-scope="scope"  >
                          {{ utils.formatTime(scope.row.dt )}}
                        </template>
                      </el-table-column>
                  </el-table>
                  </div>
                  <div class="fenyi">
                      <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="pageInfo.pageIndex"
                        :page-sizes="[30]"
                        :page-size="pageInfo.pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="pageInfo.total">
                      </el-pagination>
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
          playlists:[],
          creator:'',
          load:false,
          countIndex:false,
          songsId:[],
          bujianle:'none',
          ids:[],
          idss:[],
          idlist:[],
          playMusic:[],
          pageInfo:{
                pageIndex:1,
                pageSize:30,
                total:0,
          }, 
           
        }
    },
    methods:{
       goMusic(item){
        this.$store.dispatch('getChangeId',item.id)
    },
    indexs(index){
      return  this.utils.formatZero(index+1,2)
    },
      getPlst(){
        this.load=true
       let url="http://localhost:3000/user/playlist?uid="+this.$store.state.userId
       let that=this
       axios.get(url).then(function(result){
         console.log(result);
         that.playlists=result.data.playlist[0]
         that.creator=result.data.playlist[0].creator
         that.songsId=that.playlists.id
         that.load=false
         that.getMusicId(that.songsId)
       }).catch(function(){
           this.bujianle='none'
       })
      },
      getMusicId(songsId){
          let url='http://localhost:3000/playlist/detail?id='+songsId
          let that=this
         axios.get(url).then(function(result){
         console.log(result);
         that.idlist=result.data.playlist.trackIds
         that.idss=that.idlist.map((item)=>{
          return item.id
        })
        that.pageInfo.total=that.idss.length
        that.idss=that.idss.slice((that.pageInfo.pageIndex - 1) * that.pageInfo.pageSize, that.pageInfo.pageIndex * that.pageInfo.pageSize)
         that.getMusic(that.idss)
         })
      },
      handleSizeChange(){

        },
      handleCurrentChange(val){
            this.pageInfo.pageIndex = val
            this.idss = this.idlist.slice((this.pageInfo.pageIndex - 1) * this.pageInfo.pageSize, this.pageInfo.pageIndex * this.pageInfo.pageSize)
            this.idss=this.idss.map((item=>{
              return item.id
            }))
            this.getMusic(this.idss)
            
      },
      boFan(){

      },
      getMusic(item){
        this.load=true
        let url="http://localhost:3000/song/detail?ids="+item
       let that=this
       axios.get(url).then(function(result){
         that.playMusic=result.data.songs
         that.load=false
       })
      },
      testingUser(){
            if(this.list){
                 this.bujianle='inline'
                 this.getPlst()
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
        this.testingUser()
    }

}
</script>
<style  scoped>
.f-box{
    width: 100%;
    height: 100%;
    margin-top:20px;
    display: flex;
    justify-content: space-between;
}
.f-box1{
    width: 100%;
    height:100%;
    background:white;
    box-shadow: 1px 2px 15px rgb(231, 231, 231);
    border-radius: 15px;
    margin-bottom: 30px;
}
.f-box2{
    width:25%;
}
.like{
  width: 100%;
  box-shadow: 1px 2px 15px rgb(231, 231, 231);
  border-radius: 15px;
  padding-bottom: 10px;
  background: white;
}
.like1{
  width: 95%;
  margin: auto;
  padding-top: 15px;
  display: flex;
  align-items: center;
}
.like1 span{
  font-size: 14px;
  font-weight: 600;
  margin-left: 10px;
}
.like-div{
  width: 3px;
  height: 20px;
  background: red;
}
.like2{
  width: 100%;
  height: 100%;
  margin: auto;
  margin-top:10px;
  display: flex;
  justify-content:left;
  flex-wrap: wrap;
  margin-bottom: 10px;
}
.like2-div{
  width: 40px;
  height:40px;
  background: #ddd;
  border-radius: 5px;
  margin: 4px;
  overflow: hidden;
}
.likes1{
  width: 100%;
  margin-top: 20px;
  border-radius: 10px;
  background: white;
  padding-bottom: 20px;
  box-shadow: 1px 2px 15px rgb(231, 231, 231);
}
.likes1-div{
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  margin-top: 10px;
}
.div-img{
  width: 55px;
  height:55px;
  border-radius: 5px;
  background: #ddd;
  overflow: hidden;
  margin-left: 8px;
}
.div-text{
  margin-left: 10px;
}
.likes2{
  width: 100%;
  margin-top: 20px;
  border-radius: 10px;
  background: white;
  padding-bottom: 20px;
  box-shadow: 1px 2px 15px rgb(231, 231, 231);
}
.likes2-div{
  width:100%;
  margin-top:15px;
  display: flex;
}
.div2-img{
  width: 45px;
  height: 45px;
  border-radius: 50%;
  overflow: hidden;
  background: #ddd;
  margin-left: 8px;
}
.div2-text{
  width:260px;
  margin-left: 10px;
}
.div2-text1{
  display: flex;
  align-items: center;
}
.div-text2{
  width: 100%;
  background: rgb(236, 236, 236);
  color:rgb(104, 104, 104);
  padding: 5px;
  box-sizing: border-box;
  font-size: 12px;
  margin-top: 10px;
  border-radius: 2px;
  white-space: wrap
}
.text1-name{
  font-size: 14px;
  font-weight: 600;
}
.text1-time{
  font-size: 12px;
  color:rgb(128, 128, 128) ;
}
.t-box1{
    width:97%;
    height: 200px;
    margin: auto;
    margin-top: 10px;
    border-radius: 5px;
    display: flex;
    justify-content: space-between;
}
.t-box2{
    width:97%;
    margin: auto;
    margin-top: 10px;
    border-radius: 5px;
}
.box-img{
  width: 200px;
  height: 200px;
  border-radius: 10px;
  box-shadow: 2px 2px 2px pink;
  overflow: hidden;
}
.box-text{
  width: 74%;
  height: 200px;
}
.text1{
  margin-top: 20px;
  font-size: 23px;
  font-weight: 600;
}
.text2{
  margin-top: 15px;
  display: flex;
  justify-content: left;
  align-items: center;
}
.text-img{
  width: 30px;
  height: 30px;
  border-radius: 50%;
  overflow: hidden;
}
.text-text{
  font-size: 14px;
  margin-left: 10px;
}
.text-text1{
  font-size: 14px;
  margin-left: 30px;
  color: rgb(128, 128, 128);
}
.text3{
  margin-top: 15px;
  display: flex;
  font-size: 14px;
  align-items: center;
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
.text4{
  margin-top: 15px;
  font-size: 14px;
  width: 100%;
  height: 40px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.twoBtn{
  float:right;
  margin-right: 30px;
  margin-bottom: 20px;
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
.twoBtn2{
  padding: 8px;
  padding-left: 10px;
  padding-right: 10px;
  background:rgb(224, 224, 224);
  border-radius: 20px;
  font-size: 14px;  
}
.twoBtn2:hover{
  color: white;
  background: red;
}
.active{
  background:red;
  color: white;
}
.geDan{
  margin-top: 10px;
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