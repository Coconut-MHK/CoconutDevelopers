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
