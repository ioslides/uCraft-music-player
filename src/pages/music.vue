<template>
  <div class="music">
    <div class="music-content">
      <div class="music-left">
        <music-btn/>
        <keep-alive>
          <router-view v-if="$route.meta.keepAlive" class="music-list"/>
        </keep-alive>
        <router-view :key="$route.path" v-if="!$route.meta.keepAlive" class="music-list"/>
      </div>
      <lyric class="music-right" :lyric="lyric" :nolyric="nolyric" :lyricIndex="lyricIndex"/>
    </div>

    <!--播放器-->
    <div class="music-bar" :class="{disable:!musicReady||!currentMusic.id}">
      <div class="music-bar-btns">
        <i class="bar-icon btn-prev" title="上一曲 Ctrl + Left" @click="prev"></i>
        <i
          class="bar-icon btn-play"
          :class="{'btn-play-pause':playing}"
          title="播放暂停 Ctrl + Space"
          @click="play"
        ></i>
        <i class="bar-icon btn-next" title="下一曲 Ctrl + Right" @click="next"></i>
      </div>
      <div class="music-music">
        <div class="music-bar-info">
          <template>Welcome to use uCraft music player</template>
        </div>
        <div
          class="music-bar-time"
          v-if="currentMusic.id"
        >{{currentTime | format}}/{{(currentMusic.duration % 3600) | format}}</div>
      </div>
      <i class="bar-icon btn-mode" :class="modeClass" :title="modeTitle" @click="modeChange"></i>
      <i class="bar-icon btn-comment" @click="openComment"></i>
      <div class="music-bar-volume" title="音量加减 [Ctrl+Up/Down]">
        <i class="bar-icon btn-volume" :class="{'btn-volume-no':isMute}" @click="switchMute"></i>
        <uprogress @percentChange="volumeChange" :percent="volume"/>
      </div>
    </div>

    <!--遮罩-->
    <div class="uPlayer-bg" :style="{backgroundImage: picUrl}"></div>
    <div class="uPlayer-mask"></div>
  </div>
</template>

<script>
import { getLyric } from "api";
import uPlayerMusic from "./ucraftPlayer";
import { randomSortArray, parseLyric, format } from "assets/js/util";
import { playMode, defaultBG } from "@/config";
import { mapGetters, mapMutations, mapActions } from "vuex";
import ucraftMusicBtn from "components/ubtn/ubtn";
import ucraftLyric from "components/lyric/lyric";
import ucraftProgress from "base/uprogress/uprogress";
import ucraftDialog from "base/udialog/udialog";
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
      musicReady: false, //是否可以使用播放器
      currentTime: 0, //当前播放时间
      currentProgress: 0, //当前缓冲进度
      lyric: [], //歌词
      nolyric: false, //是否有歌词
      lyricIndex: 0, //当前播放歌词下标
      isMute: false //是否静音
    };
  },
  computed: {
    picUrl() {
      return this.currentMusic.id && this.currentMusic.image
        ? `url(${this.currentMusic.image}?param=300y300)`
        : `url(${defaultBG})`;
    },
    modeClass() {
      switch (this.mode) {
      }
    },
    percentMusic() {},
    ...mapGetters([
      "audioEle",
      "mode",
      "playing",
      "playlist",
      "orderList",
      "currentIndex",
      "currentMusic",
      "historyList"
    ])
  },
  watch: {
    currentMusic(newMusic, oldMusic) {
      if (!newMusic.id) {
        this.lyric = [];
        return;
      }
      if (newMusic.id === oldMusic.id) {
        return;
      }
      this.audioEle.src = newMusic.url;
      //重置相关参数
      this.lyricIndex = this.currentTime = this.percentMusic = this.currentProgress = 0;
      this.audioEle.play();
      this.$nextTick(() => {
        this._getLyric(newMusic.id);
      });
    },
    playing(newPlaying) {},
    currentTime(newTime) {}
  },
  mounted() {
    this.$nextTick(() => {});
  },
  methods: {
    //按键事件
    initKeyDown() {
      document.onkeydown = e => {};
    },
    //上一曲
    prev() {},
    //播放暂停
    play() {
        if (!this.musicReady) {
            return
            }
        this.setPlaying(!this.playing)
    },
    //下一曲
    next() {},
    //循环
    loop() {},
    //修改音乐进度
    progressMusic(percent) {},
    //切换播放顺序
    modeChange() {},
    // 修改当前歌曲索引
    resetCurrentIndex(list) {},
    //打开音乐评论
    openComment() {},
    //修改音量大小
    volumeChange(percent) {},
    //是否静音
    switchMute() {},
    //获取歌词
    _getLyric(id) {},
    ...mapMutations({
      setPlaying: "SET_PLAYING",
      setPlaylist: "SET_PLAYLIST",
      setCurrentIndex: "SET_CURRENTINDEX"
    }),
    ...mapActions(["setHistory", "setPlayMode"])
  },
  filters: {
    //时间格式化
    format
  }
};
</script>