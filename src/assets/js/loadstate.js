import {mapGetters, mapMutations, mapActions} from 'vuex'

/**
 * 歌曲列表
 */
export const listState = {
    computed: {
        ...mapGetters([
            'playing',
            'currentMusic',
        ])
    },
    methods: {
        selectItem(item, index) {
            if (item.id === this.currentMusic.id && this.playing) {
                this.setPlaying(false)
            } else {
                this.selectPlay({
                    list: this.list,
                    index
                })
            }
        },
        ...mapMutations({
            setPlaying: 'SET_PLAYING'
        }),
        ...mapActions([
            'selectPlay'
        ])
    }
};

/**
 * loading状态
 * @type {{data(): *, methods: {_hideLoad(): void}}}
 */
export const loadState = {
    data(){
        return {
            ucraftLoadShow: true,//loading状态
        }
    },
    methods: {
        _hideLoad(){
            let timer;
            clearTimeout(timer);
            timer = setTimeout(()=>{
                this.ucraftLoadShow = false
            },200)
        }
    }
};
