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
