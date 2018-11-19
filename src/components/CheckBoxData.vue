<template>
    <div class="checkbox-container label">
        <!-- <label>진료항목</label>
        <div class="checkbox-wrapper" :key="value" v-for="value of checkBoxData">
            <label :for="value">{{value}}</label>
            <input
            type="checkbox" 
            :id="value" 
            :value="value"
            v-model="inputData.treatments"
            >
        </div> -->
    </div>
</template>

<script>
export default {
    props: {
        checkBoxData: []
    }
}
</script>

<style>

</style>
