<template>
    <div class="checkbox-container label">
        <label class="checkbox-title">진료항목</label>
        <div class="checkbox-wrapper" :key="value" v-for="value of treatmentList">
            <label :for="value">{{value}}</label>
            <input
            type="checkbox" 
            :id="value" 
            :value="value"
            v-model="treatments"
            >
        </div>
        <div class="checkbox-navigation">
            <router-link
            class="box-shadow"
            :to="`/home/data/${currentParam}/doctors`"
            @click.native="toDoctorsInput">다음</router-link>
        </div>
    </div>
</template>

<script>
import { createNamespacedHelpers, mapState } from 'vuex'
const { mapGetters, mapMutations } = createNamespacedHelpers('createData')
export default {
    name: 'Subjects-Input-View',
    data() {
        return {
            treatments: []
        }
    },
    mounted() {
        this.setDataProgress({ index: 2 })
    },
    computed: {
        ...mapState(['currentParam']),
        ...mapGetters(['treatmentList'])
    },
    methods: {
        ...mapMutations(['setPlaceData', 'setDataProgress']),
        toDoctorsInput() {
            this.setPlaceData({ treatments: this.treatments })
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../assets/css/Scheme.scss';
    .checkbox-container {
        display: flex;
        flex-direction: row;
        justify-content: center;
        flex-wrap: wrap;
        .checkbox-title {
            flex: 1 1 60%;
            font-weight: bold;
            margin-bottom: 5vh;
        }
        .checkbox-wrapper {
            display: flex;
            width: 60%;
            padding: 1vh 0;
            align-items: center;
            justify-content: center;
            transition: 0.25s;
            label {
                flex: 1 1 70%;
                text-align: left;
                font-weight: normal;
                padding: 2.5vh 0 2.5vh 2vw;
            }
            input {
                flex: 1;
                margin: 0;
            }
            &:hover {
                background: #D3D3D3;
                label {
                    font-weight: bold;
                    letter-spacing: 0.5px;
                }
            }
        }
        .checkbox-wrapper + .checkbox-wrapper {
            border-top: 1px solid #D3D3D3;
        }
        .checkbox-navigation {
            flex: 1 1 100%;
            margin: 3vh 0 5vh 0;
            a {
                text-decoration: none;
                color: white;
                background: $VueGreen;
                padding: 1vh 2vw;
            }
        }
    }
</style>

