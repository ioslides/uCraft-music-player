<template>
    <!--正在播放-->
    <div class="playList">
        <ucraftMusicList :list="playlist"
                    :listType="1"
                    @select="selectItem"
                    @del="deleteItem">
            <div slot="listBtn"
                 class="list-btn">
                <span @click="$refs.dialog.show()">清空列表</span>
            </div>
        </ucraftMusicList>
        <ucraftDialog ref="dialog"
                   @confirm="clearList"
                   bodyText="是否清空正在播放列表"
                   confirmBtnText="清空" />
    </div>
</template>

<script>
    import {mapGetters, mapMutations, mapActions} from 'vuex'
    import ucraftMusicList from 'components/musiclist/musiclist'
    import ucraftDialog from 'base/udialog/udialog'
    
    export default {
        name: "play-list",
        data() {
            return {
                show: false,
            }
        },
        components: {
            ucraftMusicList,
            ucraftDialog
        },
        computed: {
            ...mapGetters([
                'playing',
                'playlist',
                'currentMusic'
            ])
        },
        methods: {
            // 清空列表事件
            clearList() {
            },
            // 播放暂停事件
            selectItem(item, index) {
            },
            // 删除事件
            deleteItem() {
            },
            ...mapMutations({
                setPlaying: 'SET_PLAYING',
                setCurrentIndex: 'SET_CURRENTINDEX',
                clearPlaylist: 'CLEAR_PLAYLIST'
            }),
            ...mapActions([
                'removerPlayListItem',
                'clearPlayList'
            ])
        }
    }
</script>

<style lang="less">
  
</style>
