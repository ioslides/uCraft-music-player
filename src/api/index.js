import axios from 'axios'
import {URL, defaultLimit} from '@/config'

axios.defaults.baseURL = URL

//排行榜列表
export function getToplistDetail() {
    return axios.get('/toplist/detail')
}

//排行榜详情
export function topList(idx) {
    return axios.get('/top/list', {
        params: {
            idx
        }
    })
}
//推荐歌单
export function getPersonalized() {
    return axios.get('/personalized')
}

// 歌单详情
export function getPlaylistDetail(id) {
    return axios.get('/playlist/detail', {
        params: {
            id
        }
    })
}