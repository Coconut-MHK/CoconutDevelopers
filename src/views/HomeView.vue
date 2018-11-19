<template>
    <div class="home-container">
        <tool-bar></tool-bar>
        <router-view></router-view>
    </div>
</template>

<script>
import ToolBar from '../components/ToolBar.vue';
export default {
    name: 'home',
    components: {
        ToolBar
    },
    data() {
        return {

        }
    },
    methods: {
        
    }
}
</script>

<style lang="scss" scoped>
.home-container {
    height: 100%;
    width: 100%;
}
</style>
