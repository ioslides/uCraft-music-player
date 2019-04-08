<template>
    <!--我的歌单-->
    <div class="userList">
        <ucarftLoading v-model="uLoadShow"/>
        <template v-if="list.length>0">
            <div class="list-item" v-for="item in list" v-if="item.trackCount>0" :key="item.id" :title="item.name">
                <router-link :to="{path:`/music/details/${item.id}`}" tag="div" class="userList-item">
                    <img class="cover-img" v-lazy="`${item.coverImgUrl}?param=200y200`"/>
                    <h3 class="name">{{item.name}}</h3>
                </router-link>
            </div>
        </template>
        <ucarftNoResult v-else title="none"/>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import {getUserPlaylist} from 'api'
    import {loadMixin} from "assets/js/mixin"
    import ucarftLoading from 'base/uloading/uloading'
    import ucarftNoResult from 'base/unoresult/unoresult'
    
    export default {
        name: "play-list",
        mixins: [loadMixin],
        components: {
            ucraftLoading,
            ucarftNoResult
        },
        data() {
            return {
                list: [],//列表
            }
        },
        computed: {
            ...mapGetters(['uid'])
        },
        watch: {
             
        },
        methods: {
            // 获取我的歌单详情
        }
    }
</script>

<style lang="less" scoped>
    
</style>
