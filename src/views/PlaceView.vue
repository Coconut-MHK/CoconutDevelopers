<template>
    <div class="data-container">
        <router-link
            class="link-button"
            :to="`/home/data/${this.param}/new-data`"
            v-if="firstPage"
            @click.native="toDataInput"
            >데이터 등록</router-link>
        <h1>{{this.header}} 데이터 관리</h1>
        <small v-if="dataProgress.status">Progress: {{dataProgress.index}}/3</small>
        <hr width="15%" noshadow color="black">
        <transition :name="transitionName">
            <router-view :componentFile="capitalizedParam" class="child-view"></router-view>
        </transition>
        <modal-component></modal-component>
    </div>
</template>

<script>
import ModalComponent from '../components/Modal.vue';

export default {
    components: {
        ModalComponent
    },
    
    data() {
        return {
            firstPage: true,
            transitionName: 'slide-left',
            param: this.$route.params.place,
        }
    },
    computed: {
        header() {
            if (this.param === 'hospital') {
                return "정신과 병원"
            } else if (this.param === 'center') {
                return '심리상담센터'
            }
        },
        capitalizedParam() {
            return this.param.charAt(0).toUpperCase() + this.param.slice(1);
        },
        dataProgress() {
            return this.$store.state.dataProgress
        }
    },
    watch: {
        '$route' (to, from) {
            const toDepth = to.path.split('/').length
            const fromDepth = from.path.split('/').length
            this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
        }
    },
    methods: {
        toDataInput() {
            this.firstPage = !this.firstPage;
            this.$store.commit('setDataProgress', {
                status: true,
                index: 1
            })
        }
    }
}
</script>

<style lang="scss" scoped>
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
            font-size: 2vmin;
            text-decoration: none;
            background:rgb(4, 153, 103);
            padding: 16px;
            margin: 2.5vh 0 5vh 0;
            transition: 0.5s;
            &:visited {
                color: white;
            }
            &:hover {
                background: black;
            }
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
