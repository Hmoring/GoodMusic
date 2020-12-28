<template>
    <div>
        <div class="t-box2">
                  <div class="twoBtn">
                    <el-button class="twoBtn1 el-icon-video-play" 
                    @click="boFan">播放全部</el-button>
                   
                  </div>
                  <div class="geDan" v-loading="load">
                    <el-table
                    :data="singerZuopin"
                    style="width: 100%"
                    @row-click="goMusic"
                    stripe
                    >
                      <el-table-column
                        
                        label="序号"
                        width="100"
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
                  
        </div>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    data(){
        return{
            singerZuopin:[],
            load:false,
        }
    },
    methods:{
        getZuopin(){
           let url='http://localhost:3000/artists?id='+this.$route.query.id
            let that=this
            axios.get(url).then(function(result){
               console.log(result);
               that.singerZuopin=result.data.hotSongs
            }) 
        },
        boFan(){

        },
         goMusic(item){
            this.$store.dispatch('getChangeId',item.id)
            
        },
        indexs(index){
             return  this.utils.formatZero(index+1,2)
        }
    },
    mounted(){
        this.getZuopin()
    }
}
</script>
<style  scoped>
.t-box2{
    width:100%;
}
.twoBtn{
  float:right;
  margin-top: 10px;
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
</style>