<template>
    <div id="app">
        <mm-header/>
        <router-view class="router-view" />
        <audio ref="uCraftPlayer"></audio>
    </div>
</template>
<script>
    import {mapMutations,mapActions} from 'vuex'
    import {topList} from 'api'
    import uHeader from 'components/mm-header/mm-header'
    import {getVersion, setVersion} from "assets/js/storage"
    export default {
        name: "app",
        components: {
            uHeader
        },
        created() {
            topList(defaultSheetId)
            .then((res) => {
                if (res.status === 200) {
                    let list = this._formatSongs(res.data.playlist.tracks.slice(0,100));
                    this.setPlaylist({list})
                }
            });
            this.$nextTick(() => {
                this.setAudioele(this.$refs.uCraftPlayer)
            });
            //首次加载完成后移除动画
            const loadDOM = document.querySelector('#appLoading');
            if (loadDOM) {
                const animationendFunc = function () {
                    loadDOM.removeEventListener('animationend', animationendFunc);
                    loadDOM.removeEventListener('webkitAnimationEnd', animationendFunc);
                    document.body.removeChild(loadDOM);
                    const version = getVersion();
                    if (version !== null) {
                        setVersion(VERSION);
                        if (version !== VERSION) {
                            this.$refs.versionDialog.show()
                        }
                    } else {
                        setVersion(VERSION);
                        this.$refs.versionDialog.show()
                    }
                }.bind(this);
                loadDOM.addEventListener('animationend', animationendFunc);
                loadDOM.addEventListener('webkitAnimationEnd', animationendFunc);
                loadDOM.classList.add('removeAnimate')
            }
        },
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
