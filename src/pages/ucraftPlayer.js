import {playMode} from "@/config";

const uPlayerMusic = {
    initAudio(that) {
        const ele = that.audioEle;
        //音频缓冲事件
        ele.onprogress = () => {

        };
        //开始播放音乐
        ele.onplay = () => {
   
        };
        //获取当前播放时间
        ele.ontimeupdate = () => {
            
        };
        //当前音乐播放完毕
        ele.onended = () => {

        };
        //音乐播放出错
        ele.onerror = () => {
            //console.log('播放出错啦！')
        };
        //音乐进度拖动大于加载时重载音乐
        ele.onstalled = () => {
        };
        //将能播放的音乐加入播放历史
        ele.oncanplay = () => {
   
        }
    }
}; 

export default uPlayerMusic
