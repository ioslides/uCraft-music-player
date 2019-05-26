<template>
    <!--歌单详情-->
    <div class="details">
        <uloading v-model="uLoadShow"/>
        <music-list :list="list" @select="selectItem"/>
    </div>
</template>

<script>
    import {mapActions} from 'vuex'
    import {getPlaylistDetail} from 'api'
    import ucraftLoading from 'base/uloading/uloading'
    import MusicList from 'components/music-list/music-list'
    import {formatTopSongs} from 'assets/js/song'
    import {loadMixin} from "assets/js/mixin"
    
    export default {
        name: "detail",
        mixins: [loadMixin],
        components: {
            ucraftLoading,
            MusicList
        },
        data() {
            return {
                list: [],//列表
            }
        },
        created() {
            // 获取歌单详情
            getPlaylistDetail(this.$route.params.id)
            .then((res) => {
                if (res.data.code === 200) {
                    this.list = formatTopSongs(res.data.playlist.tracks);
                    document.title = `${res.data.playlist.name} - Player在线音乐播放器`;
                    this._hideLoad()
                }
            })
        },
        methods: {
            // 播放暂停事件
            selectItem(item, index) {
                this.selectPlay({
                    list: this.list,
                    index
                })
            },
            ...mapActions([
                'selectPlay'
            ])
        }
    }
</script>

<style lang="less" scoped>
    .details {
        position: relative;
        width: 100%;
        height: 100%;
        .musicList {
            width: 100%;
            height: 100%;
        }
    }
</style>
