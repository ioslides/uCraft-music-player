<template>
    <div id="app">
        <uheader/>
        <router-view class="router-view" />
        <ucraftDialog ref="versionDialog"
                   type="alert"
                   headText="更新提示"
                   :bodyText="versionBody" />
        <audio ref="ucraftPlayer"></audio>
    </div>
</template>
<script>
    import {mapMutations,mapActions} from 'vuex'
    import {topList} from 'api'
    import {defaultSheetId, VERSION} from '@/config'
    import {createTopList} from 'assets/js/song'
    import ucraftHeader from 'components/uheader/uheader'
    import ucraftDialog from 'base/udialog/udialog'
    
    export default {
        name: "app",
        components: {
            ucraftHeader, ucraftDialog
        },
        created() {
            this.versionBody = VERSIONBODY;

            topList(defaultSheetId)
            .then((res) => {
                if (res.status === 200) {
                    let list = this._formatSongs(res.data.playlist.tracks.slice(0,100));
                    this.setPlaylist({list})
                }
            });

            //设置title
            let OriginTitile = document.title, titleTime;
            document.addEventListener('visibilitychange', function () {
                if (document.hidden) {
                    document.title = 'uCraft Music Player';
                    clearTimeout(titleTime);
                } else {
                    document.title = 'Music';
                    titleTime = setTimeout(function () {
                        document.title = OriginTitile;
                    }, 2000);
                }
            });
            
            //设置audio元素
            this.$nextTick(() => {
                this.setAudioele(this.$refs.ucraftPlayer)
            });
            
            const loadDOM = document.querySelector('#appLoading');
            if (loadDOM) {
                const animationendFunc = function () {
                    loadDOM.removeEventListener('animationend', animationendFunc);
                    loadDOM.removeEventListener('webkitAnimationEnd', animationendFunc);
                    document.body.removeChild(loadDOM);
                }.bind(this);
                loadDOM.addEventListener('animationend', animationendFunc);
                loadDOM.addEventListener('webkitAnimationEnd', animationendFunc);
                loadDOM.classList.add('removeAnimate')
            }
        },
        methods: {
            _formatSongs(list) {
                let ret = [];
                list.forEach((item) => {
                    const musicData = item;
                    if (musicData.id) {
                        ret.push(createTopList(musicData))
                    }
                });
                return ret
            },
            ...mapMutations({
                setAudioele: 'SET_AUDIOELE'
            }),
            ...mapActions([
                'setPlaylist'
            ])
        }
    }
</script>
<style lang="less">
    #app {
        position: relative;
        width: 100%;
        height: 100%;
        color: @text_color;
        font-size: @font_size_medium;
        .router-view {
            width: 100%;
            height: 100%;
        }
        audio{
            position: fixed;
        }
    }
</style>
