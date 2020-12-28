<template>
    <div>
        <div class="banner">
           <Banner></Banner>
        </div>
        <div class="Recommended">
           <Recommended></Recommended>
        </div>
        <Newsongs></Newsongs>
        <Newsinger></Newsinger>
    </div>
</template>
<script>
import Banner from '@/components/find-music/banner/index.vue'
import Recommended from '@/components/find-music/Recommended-song/index.vue'
import Newsongs from '@/components/find-music/new-songs/index.vue'
import Newsinger from '@/components/find-music/new-singer/index.vue'

export default {
    components:{
        Banner,
        Recommended,
        Newsongs,
        Newsinger
    },
    data(){
        return{

        }
    }
}
</script>
<style  scoped>
.banner{
   padding-top:20px;
}
.Recommended{
    padding-top:5px;
}
</style>