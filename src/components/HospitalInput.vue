<template>
    <div class="hospital-container">
        <form class="input-container label" @submit="submitData">
            <label>병원 이름</label>
            <input required type="text" id="name" v-model="inputData.name">
            <label>병원 주소</label>
            <input required type="text" id="address" v-model="inputData.address">
            <label>병원 웹사이트</label>
            <input required placeholder="https://" type="url" id="websiteUrl" v-model="inputData.websiteUrl">
            <label>병원 영업시간</label>
            <input required type="text" id="operatingHours" v-model="inputData.operatingHours">
            <label>병원 연락처 (전화번호)</label>
            <input required type="text" id="contacts" v-model="inputData.contacts">
            <label>병원 소개</label>
            <textarea required type="text" v-model="inputData.description"></textarea>
            <label>사진 업로드</label>
            <input required multiple type="file" accept="image/gif, image/jpeg, image/png" @change="previewFiles">
            <hr noshadow color="#D3D3D3">
            <input type="submit">
        </form>   
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    data() {
        return {
            images: [],
            inputData: {
                name: "",
                address: "",
                websiteUrl: "",
                operatingHours: "",
                contacts: "",
                description: "",
            }
        }
    },
    computed: mapState([
        'loading', 'hospitalTreatments'
    ]),
    methods: {
        submitData(e) {
            // this.$store.dispatch('createPlaceData', {
            //     reference: "hospital",
            //     data: this.inputData
            // });
            e.preventDefault();
            this.$store.commit('setHospitalData', this.inputData)
            this.$store.commit('setDataProgress', { index: 2 });
            this.$router.push('/home/data/hospital/subjects');
        },
        previewFiles(e) {
            let files = e.target.files;
            for (let i = 0; i < files.length; i++) {
                this.images.push(files[i]);
            }
            this.$store.commit("setImages", this.images);
        }
    }
}
</script>

<style lang="scss" scoped>
.hospital-container {
    margin: 0 0 1vh 0;
    display: flex;
    flex-wrap: wrap;
    .input-container {
        flex: 1;
        display: flex;
        flex-direction: column;
        label {
            font-weight: bold;
            width: 40vw;
            text-align: left;
            margin-bottom: 1vh;
        }
        textarea {
            width: 40vw;
            height: 15vh;
        }
        input {
            font-size: 1rem;
            width: 40vw;
        }
        input[type="text"], input[type="url"], input[type="file"]{
            height: 5vh;
        }
        input[type="submit"] {
            height: 10vh;
            margin-top: 4vh
        }
        input + label {
            margin-top: 4vh;
        }
        textarea + label {
            margin-top: 4vh;
        }
        hr {
            margin-top: 5vh;
            width: 40vw;
            height: 1px;
        }
    }
    .button-container {
        display: flex;
        flex: 1 1 100%;
        height: 20vh;
        justify-content: center;
        align-items: center;
        button {
            width: 10vw;
            font-size: 1rem;
        }
    }
}
</style>

