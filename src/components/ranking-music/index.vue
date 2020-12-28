<template>
    <div>
        <div>
            <Feature></Feature>
        </div>
        <div class="box">
        <Media></Media>
        </div>
    </div>
</template>
<script>
import Feature from '@/components/ranking-music/Feature-list/index.vue'
import Media from '@/components/ranking-music/media-list/index.vue'
export default {

    data(){
        return{}
    },
    components:{
        Feature,
        Media
    }
}
</script>
<style scoped>
.box{
   margin-bottom: 20px;
}
</style>