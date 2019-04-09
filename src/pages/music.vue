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
    import ucraftMusicBtn from 'components/ubtn/ubtn'
    import ucraftLyric from 'components/lyric/lyric'
    import ucraftProgress from 'base/uprogress/uprogress'
    import ucraftDialog from 'base/udialog/udialog'
    
    export default {
        name: "music",
        components: {
            ucraftLyric,
            ucraftMusicBtn,
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
                return this.currentMusic.id && this.currentMusic.image ? `url(${this.currentMusic.image}?param=300y300)` : `url(${defaultBG})`
            },
            modeClass() {
                switch (this.mode) {
                    case playMode.listLoop:
                        return 'mode-listLoop';
                    case playMode.order:
                        return 'mode-order';
                    case playMode.random:
                        return 'mode-random';
                    case playMode.loop:
                        return 'mode-loop'
                }
            },
            modeTitle() {
                let key = 'Ctrl + O';
                switch (this.mode) {
                    case playMode.listLoop:
                        return `列表循环 ${key}`;
                    case playMode.order:
                        return `顺序播放 ${key}`;
                    case playMode.random:
                        return `随机播放 ${key}`;
                    case playMode.loop:
                        return `单曲循环 ${key}`
                }
            },
            percentMusic() {
                const duration = this.currentMusic.duration;
                return this.currentTime && duration ? this.currentTime / duration : 0
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
            currentMusic(newMusic, oldMusic) {
                if (!newMusic.id) {
                    this.lyric = [];
                    return
                }
                if (newMusic.id === oldMusic.id) {
                    return
                }
                this.audioEle.src = newMusic.url;
                //重置相关参数
                this.lyricIndex = this.currentTime = this.percentMusic = this.currentProgress = 0;
                this.audioEle.play();
                this.$nextTick(() => {
                    this._getLyric(newMusic.id);
                })
            },
            playing(newPlaying) {
                const audio = this.audioEle;
                this.$nextTick(() => {
                    newPlaying ? audio.play() : audio.pause();
                    this.musicReady = true
                })
            },
            currentTime(newTime) {
                if (this.nolyric) {
                    return
                }
                let lyricIndex = 0;
                for (let i = 0; i < this.lyric.length; i++) {
                    if (newTime > this.lyric[i].time) {
                        lyricIndex = i;
                    }
                }
                this.lyricIndex = lyricIndex;
            },
        },
        mounted() {
            this.$nextTick(() => {
                uPlayerMusic.initAudio(this);
                this.initKeyDown()
            })
        },
        methods: {
            //按键事件
            initKeyDown() {
                document.onkeydown = e => {
                    switch (e.ctrlKey && e.keyCode) {
                        case 32://播放暂停Ctrl + Space
                            this.play();
                            break;
                        case 37://上一曲Ctrl + Left
                            this.prev();
                            break;
                        case 38://音量加Ctrl + Up
                            let plus = Number((this.volume += 0.1).toFixed(1));
                            if (plus > 1) {
                                plus = 1
                            }
                            this.volumeChange(plus);
                            break;
                        case 39://下一曲Ctrl + Right
                            this.next();
                            break;
                        case 40://音量减Ctrl + Down
                            let reduce = Number((this.volume -= 0.1).toFixed(1));
                            if (reduce < 0) {
                                reduce = 0
                            }
                            this.volumeChange(reduce);
                            break;
                        case 79://切换播放模式Ctrl + O
                            this.modeChange();
                            break
                    }
                }
            },
            //上一曲
            prev() {
                if (!this.musicReady) {
                    return
                }
                if (this.playlist.length === 1) {
                    this.loop()
                } else {
                    let index = this.currentIndex - 1;
                    if (index < 0) {
                        index = this.playlist.length - 1
                    }
                    this.setCurrentIndex(index);
                    if (!this.playing && this.musicReady) {
                        this.setPlaying(true);
                    }
                    this.musicReady = false
                }
            },
            //播放暂停
            play() {
                if (!this.musicReady) {
                    return
                }
                this.setPlaying(!this.playing)
            },
            //下一曲
            next() {
                if (!this.musicReady) {
                    return
                }
                if (this.playlist.length - 1 === this.currentIndex && this.mode === playMode.order) {
                    this.setCurrentIndex(-1);
                    this.setPlaying(false);
                    return
                }
                if (this.playlist.length === 1) {
                    this.loop()
                } else {
                    let index = this.currentIndex + 1;
                    if (index === this.playlist.length) {
                        index = 0
                    }
                    if (!this.playing && this.musicReady) {
                        this.setPlaying(true);
                    }
                    this.setCurrentIndex(index);
                    this.musicReady = false
                }
            },
            //循环
            loop() {
                this.audioEle.currentTime = 0;
                this.audioEle.play();
                this.setPlaying(true);
                if (this.lyric.length > 0) {
                    this.lyricIndex = 0
                }
            },
            //修改音乐进度
            progressMusic(percent) {
                this.audioEle.currentTime = this.currentMusic.duration * percent
            },
            //切换播放顺序
            modeChange() {
                const mode = (this.mode + 1) % 4;
                this.setPlayMode(mode);
                if (mode === playMode.loop) {
                    return
                }
                let list = [];
                switch (mode) {
                    case playMode.listLoop:
                    case playMode.order:
                        list = this.orderList;
                        break;
                    case playMode.random:
                        list = randomSortArray(this.orderList);
                        break
                }
                this.resetCurrentIndex(list);
                this.setPlaylist(list);
            },
            // 修改当前歌曲索引
            resetCurrentIndex(list) {
                const index = list.findIndex(item => {
                    return item.id === this.currentMusic.id
                });
                this.setCurrentIndex(index)
            },
            //打开音乐评论
            openComment() {
                if (!this.currentMusic.id) {
                    this.$uToast('还没有播放歌曲哦！');
                    return false
                }
                this.$router.push(`/music/comment/${this.currentMusic.id}`)
            },
            //修改音量大小
            volumeChange(percent) {
                percent === 0 ? this.isMute = true : this.isMute = false;
                this.volume = percent;
                this.audioEle.volume = percent;
            },
            //是否静音
            switchMute() {
                const audio = this.audioEle;
                this.isMute = !this.isMute;
                this.isMute ? audio.volume = 0 : audio.volume = this.volume
            },
            //获取歌词
            _getLyric(id) {
                getLyric(id).then((res) => {
                    if (res.status === 200) {
                        if (res.data.nolyric) {
                            this.nolyric = true
                        } else {
                            this.nolyric = false;
                            this.lyric = parseLyric(res.data.lrc.lyric)
                        }
                        this.audioEle.play();
                    }
                })
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
