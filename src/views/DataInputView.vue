<template>
    <div>
        <component :is="componentLoader"></component>
    </div>
</template>

<script>
export default {
    props: {
        componentFile: {
            type: String,
            default: () => null
        },
    },
    mounted() {
        this.$store.commit('setDataProgress', { index: 1 })
    },
    data() {
        return {
            param: this.$route.params.place,
        }
    },
    computed: {
        componentLoader() {
            return () => import(`../components/${this.componentFile}Input.vue`);
        }
    },
}
</script>

<style>

</style>
