<template>
    <div class="data-container">
        <router-link
            class="box-shadow"
            :to="`/home/data/${param}/new-data`"
            v-if="isFirstPage"
            @click.native="toDataInput"
            >데이터 등록</router-link>
        <h1>{{ header }} 데이터 관리</h1>
        <small v-if="!isFirstPage">Progress: {{ progress.index }}/3</small>
        <hr width="15%" noshadow color="black">
        <transition :name="transitionName">
            <router-view class="child-view"></router-view>
        </transition>
        <loading-modal></loading-modal>
    </div>
</template>

<script>
import LoadingModal from '../components/LoadingModal.vue';
import { mapState, mapGetters, mapMutations } from 'vuex';


export default {
    name: 'PlaceView',
    components: {
        LoadingModal
    },
    mounted() {
        this.setCurrentParam(this.$route.params.place);
    },
    data() {
        return {
            transitionName: 'slide-left',
        }
    },
    computed: {
        ...mapState('createData', { progress: 'dataProgress' }),
        ...mapState({ param: 'currentParam' }),
        ...mapGetters(['header', 'capitalizedParam']),
        isFirstPage() {
            return this.$route.meta.firstPage
        }
    },
    watch: {
        '$route' (to, from) {
            const toDepth = to.path.split('/').length
            const fromDepth = from.path.split('/').length
            this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
            this.setCurrentParam(this.$route.params.place)
        },

    },
    methods: {
        ...mapMutations(['setCurrentParam']),
        ...mapMutations('createData', ['setDataProgress']),
        toDataInput() {
            this.setDataProgress({
                status: true,
                index: 1
            })
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../assets/css/Scheme.scss';
    .data-container {
        margin: 5vh 0 1vh 0;
        display: flex;
        align-items: center;
        flex-direction: column;
        h1 {
            margin: 0 0 2.5vh 0;
        }
        a {
            position: absolute;
            top: 9vh;
            right: 7vw;
            width: 6vw;
            font-size: 0.8rem;
            text-decoration: none;
            background: $VueGreen;
            padding: 16px;
            margin: 2.5vh 0 5vh 0;
            transition: 0.5s;
            &:visited {
                color: white;
            }
        }
        small {
            margin-bottom: 1vh;
        }
    }
    .child-view {
        transition: all .5s;
        margin-top: 5vh;
    }
    .slide-left-enter, .slide-right-leave-active {
        opacity: 0;
        -webkit-transform: translate(100px, 0);
        transform: translate(100px, 0);
    }
    .slide-left-leave-active, .slide-right-enter {
        opacity: 0;
        -webkit-transform: translate(-100px, 0);
        transform: translate(-100px, 0);
    }
</style>
