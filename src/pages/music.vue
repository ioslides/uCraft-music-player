<template>
    <div class="music">
        <div class="music-content">
            <div class="music-left">
                <music-btn/>
                <keep-alive>
                    <router-view v-if="$route.meta.keepAlive"
                                 class="music-list"/>
                </keep-alive>
                <router-view :key="$route.path"
                             v-if="!$route.meta.keepAlive"
                             class="music-list"/>
            </div>
            <ucraftLyric class="music-right"
                   :lyric="lyric"
                   :nolyric="nolyric"
                   :lyricIndex="lyricIndex"/>
        </div>
        
        <!--播放器-->
        <div class="music-bar"
             :class="{disable:!musicReady||!currentMusic.id}">
            <div class="music-bar-btns">
                <i class="bar-icon btn-prev"
                   title="上一曲 Ctrl + Left"
                   @click="prev"></i>
                <i class="bar-icon btn-play"
                   :class="{'btn-play-pause':playing}"
                   title="播放暂停 Ctrl + Space"
                   @click="play"></i>
                <i class="bar-icon btn-next"
                   title="下一曲 Ctrl + Right"
                   @click="next"></i>
            </div>
            <div class="music-music">
                <div class="music-bar-info">
                    <template v-if="currentMusic&&currentMusic.id">
                        {{currentMusic.name}}
                        <span> - {{currentMusic.singer}}</span>
                    </template>
                    <template v-else>Welcome to use uCraft music player</template>
                </div>
                <div class="music-bar-time"
                     v-if="currentMusic.id">{{currentTime | format}}/{{(currentMusic.duration % 3600) | format}}
                </div>
                <ucraftProgress class="music-progress"
                             :percent="percentMusic"
                             :percentProgress="currentProgress"
                             @percentChange="progressMusic"/>
            </div>
            <i class="bar-icon btn-mode"
               :class="modeClass"
               :title="modeTitle"
               @click="modeChange"></i>
            <i class="bar-icon btn-comment"
               @click="openComment"></i>
            <div class="music-bar-volume"
                 title="音量加减 [Ctrl+Up/Down]">
                <i class="bar-icon btn-volume"
                   :class="{'btn-volume-no':isMute}"
                   @click="switchMute"></i>
                <ucraftProgress @percentChange="volumeChange"
                             :percent="volume"/>
            </div>
        </div>
        
        <!--遮罩-->
        <div class="uPlayer-bg"
             :style="{backgroundImage: picUrl}"></div>
        <div class="uPlayer-mask"></div>
    </div>
</template>

<script>
    import {getLyric} from 'api'
    import uPlayerMusic from './ucraftPlayer'
    import {randomSortArray, parseLyric, format} from 'assets/js/util'
    import {playMode, defaultBG} from "@/config"
    import {mapGetters, mapMutations, mapActions} from 'vuex'
    import MusicBtn from 'components/ubtn/ubtn'
    import ucraftLyric from 'components/lyric/lyric'
    import ucraftProgress from 'base/uprogress/uprogress'
    import ucraftDialog from 'base/udialog/udialog'
    
    export default {
        name: "music",
        components: {
            ucraftLyric,
            MusicBtn,
            ucraftDialog,
            ucraftProgress
        },
        data() {
            return {
                musicReady: false,//是否可以使用播放器
                currentTime: 0,//当前播放时间
                currentProgress: 0,//当前缓冲进度
                lyric: [],//歌词
                nolyric: false,//是否有歌词
                lyricIndex: 0,//当前播放歌词下标
                isMute: false,//是否静音
                volume: 1,//默认音量大小
            }
        },
        computed: {
            picUrl() {
               
            },
            modeClass() {

            },
            modeTitle() {
      
            },
            percentMusic() {

            },
            ...mapGetters([
                'audioEle',
                'mode',
                'playing',
                'playlist',
                'orderList',
                'currentIndex',
                'currentMusic',
                'historyList'
            ])
        },
        watch: {
            currentMusic() {
  
            },
            playing() {
            },
            currentTime() {
        },
        mounted() {
        },
        methods: {
            //按键事件
            initKeyDown() {
                
            },
            //上一曲
            prev() {
            },
            //播放暂停
            play() {
             
            },
            //下一曲
            next() {
              
            },
            //循环
            loop() {
              
            },
            //修改音乐进度
            progressMusic() {
               
            },
            //切换播放顺序
            modeChange() {
               
            },
            //打开音乐评论
            openComment() {
                
            },
            //修改音量大小
            volumeChange(percent) {
               
            },
            //是否静音
            switchMute() {
               
            },
            //获取歌词
            _getLyric() {
                
            },
            ...mapMutations({
                setPlaying: 'SET_PLAYING',
                setPlaylist: 'SET_PLAYLIST',
                setCurrentIndex: 'SET_CURRENTINDEX'
            }),
            ...mapActions([
                'setHistory',
                'setPlayMode'
            ])
        },
        filters: {
            //时间格式化
            format
        }
    }
</script>

<style lang="less">
     
</style>
