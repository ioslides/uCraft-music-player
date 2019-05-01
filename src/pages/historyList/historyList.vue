<template>
    <div class="historyList">
        <ucraftMusicList :list="historyList" :listType="1" @select="selectItem" @del="deleteItem">
            <div slot="listBtn" class="list-btn">
                <span @click="$refs.dialog.show()">清空列表</span>
            </div>
        </ucraftMusicList>
        <ucraftDialog ref="dialog" @confirm="clearList" bodyText="是否清空播放历史列表" confirmBtnText="清空"/>
    </div>
</template>

<script>
    import {mapGetters, mapMutations, mapActions} from 'vuex'
    import ucraftMusicList from 'components/musiclist/musiclist'
    import ucraftDialog from 'base/udialog/udialog'
    
    export default {
        name: "history-list",
        components: {
            ucraftMusicList,
            ucraftDialog
        },
        computed: {
            ...mapGetters([
                'historyList',
                'playing',
                'currentMusic',
            ])
        },
        methods: {
            // 清空列表事件
            clearList() {
                this.clearHistory();
                this.$uToast('列表清空成功')
            },
            // 播放事件
            selectItem(item,index){
                this.selectPlay({
                    list: this.historyList,
                    index
                })
            },
            // 删除事件
            deleteItem(index){
                let list = [...this.historyList];
                list.splice(index,1);
                this.removeHistory(list);
                this.$uToast('删除成功')
            },
            ...mapMutations({
                setPlaying: 'SET_PLAYING'
            }),
            ...mapActions([
                'selectPlay',
                'clearHistory',
                'removeHistory'
            ])
        }
    }
</script>

<style lang="less" scoped>
    .historyList {
        width: 100%;
        height: 100%;
        .musicList {
            width: 100%;
            height: 100%;
            .list-btn {
                display: flex;
                justify-content: center;
                align-items: center;
                height: 50px;
                span{
                    padding: 5px 20px;
                    cursor: pointer;
                    user-select: none;
                    &:hover {
                        color: @text_color_active;
                    }
                }
            }
        }
    }
</style>
