<template>
    <div class="doctorData-Container">
        <div class="FormContainer">
            <form @submit="addDoctorData">
                <fieldset class="InputContainer">
                    <legend>의료진 정보</legend>
                    <div class="InputWrapper">
                        <label for="name">이름</label>
                        <input type="text" id="name" v-model="doctorInput.name">
                        <label for="title">직책</label>
                        <input type="text" id="title" v-model="doctorInput.title">
                        <label for="education">학력</label>
                        <input type="text" id="education" v-model="doctorInput.education">
                        <label for="certificate">관련 자격</label>
                        <input type="text" id="certificate" v-model="doctorInput.certificate">
                        <label for="media">방송 / 미디어 경력</label>
                        <input type="text" id="media" v-model="doctorInput.media">
                        <label for="presentation">외부강연 경험</label>
                        <input type="text" id="presentation" v-model="doctorInput.presentation">
                        <label for="scholarRelated">학회활동</label>
                        <input type="text" id="scholarRelated" v-model="doctorInput.scholarRelated">
                    </div>
                    <input type="submit" value="등록">
                </fieldset>
            </form>
        </div>
        <div class="DisplayContainer">
            <h1>{{this.sample}}</h1>
            <div v-for="doctor in doctorData" :key="doctor.index">
                <h1>{{doctor.name}}</h1>
                <small>{{doctor.title}}</small>
                <p>{{this.sample}}</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            doctorInput: {
                name: "",
                title: "",
                education: "",
                certificate: "",
                media: "",
                presentation: "",
                scholarRelated: ""
            },
            doctorData: []
        }
    },
    computed: {
        sample() {
            let r = "hi";
            return this.toObject(r);
        }
    },
    methods: {
        addDoctorData(e) {
            e.preventDefault();
            this.doctorData.push({
                ...this.doctorInput,

            });
            this.doctorInput = {
                name: "",
                title: "",
                education: "",
                certificate: "",
                media: "",
                presentation: "",
                scholarRelated: ""
            };
        },
        toObject(string) {
            const obj = {};
            let arr = string.split(', ').map((item, index) => {
                obj[index.toString()] = item
            })
            // return string.includes(', ') 
            // ? obj string.split(', ').map((item, index) => {
            //     obj[index.toString()] = item
            // })
            // : string
        }
    }
}
</script>

<style lang="scss" scoped>
    .doctorData-Container {
        width: 100vw;
        display: flex;
        .FormContainer {
            flex: 1 1 30%;
            display: flex;
            justify-content: center;
            .InputContainer {
                width: 15vw;
                .InputWrapper {
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    input {
                        width: 100%;
                        height: 3vh;
                        margin-bottom: 1vh;
                    }
                }
            }
        }
        .DisplayContainer {
            flex: 1 1 70%;
        }
    }
</style>

