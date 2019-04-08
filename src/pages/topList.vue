<template>
    <!--排行榜-->
    <div class="topList">
        <uloading v-model="uLoadShow"/>
        <template v-if="!uLoadShow">
            <div class="topList-head">
                云音乐特色榜
            </div>
            <div class="topList-content">
                <div class="list-item" v-for="(item,index) in list" :key="index"
                     :title="item.name+item.updateFrequency">
                    <router-link :to="{path:`/music/details/${item.id}`}" tag="div" class="topList-item">
                        <img class="cover-img" v-lazy="`${item.coverImgUrl}?param=200y200`"/>
                        <h3 class="name">{{item.name}}</h3>
                    </router-link>
                </div>
            </div>
            <div class="topList-head">
                热门歌单
            </div>
            <div class="topList-content">
                <div class="list-item" v-for="(item,index) in hotList" :key="index"
                     :title="item.name+item.updateFrequency">
                    <router-link :to="{path:`/music/details/${item.id}`}" tag="div" class="topList-item">
                        <img class="cover-img" v-lazy="`${item.picUrl}?param=200y200`"/>
                        <h3 class="name">{{item.name}}</h3>
                    </router-link>
                </div>
            </div>
        </template>
    </div>
</template>

<script>
    import {getToplistDetail, getPersonalized} from 'api'
    import ucraftLoading from 'base/uloading/uloading'
    import {loadMixin} from "assets/js/mixin"
    
    export default {
        name: "play-list",
        mixins: [loadMixin],
        components: {
            ucraftLoading
        },
        data() {
            return {
                list: [],//云音乐特色榜
                hotList: []//热门歌单
            }
        },
        created() {
            // 获取排行榜列表   
            }
    }
</script>

<style lang="less" scoped>
  
</style>
