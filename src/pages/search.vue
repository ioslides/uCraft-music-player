<template>
    <!--搜索-->
    <div class="search">
        <ucraftLoading v-model="uLoadShow" />
        <div class="search-head">
            <span v-for="(item,index) in Artists.slice(0,5)"
                  :key="index"
                  @click="clickHot(item.first)">{{item.first}}</span>
            <input class="search-input"
                   type="text"
                   placeholder="音乐/歌手"
                   v-model.trim="searchValue"
                   @keyup.enter="onEnter">
        </div>
        <ucraftMusicList ref="musicList"
                    :list="list"
                    :listType="2"
                    @select="selectItem"
                    @pullUp="pullUpLoad" />
    </div>
</template>

<script>
    import {mapGetters, mapActions, mapMutations} from 'vuex'
    import {search, searchHot, getMusicDetail} from 'api'
    import formatSongs from 'assets/js/song'
    import ucraftLoading from 'base/uloading/uloading'
    import ucraftMusicList from 'components/musiclist/musiclist'
    import {loadMixin} from "assets/js/mixin";
    
    export default {
        name: "search",
        mixins: [loadMixin],
        components: {
            ucraftLoading,
            ucraftMusicList
        },
        data() {
            return {
                Artists: [],//热搜数组
                list: [],//搜索数组
                page: 0,//分页
                lockUp: true,//是否锁定上拉加载事件,默认锁定
            }
        },
        computed: {
            ...mapGetters([
                'playing',
                'currentMusic',
            ])
        },
        watch: {

        },
        created() {
            // 获取热搜
            searchHot()
            .then()
        },
        methods: {
            // 点击热搜
            clickHot(name) {

            },
            // 搜索事件
            onEnter() {
               
            },
            //滚动加载事件
            pullUpLoad() {
             
            },
            //播放歌曲
            async selectItem() {
    
            },
            // 获取歌曲详情
            _getMusicDetail() {

            },
            ...mapMutations({
                setPlaying: 'SET_PLAYING'
            }),
            ...mapActions([
                'selectAddPlay'
            ])
        }
    }
</script>

<style lang="less" scoped>
    
</style>
