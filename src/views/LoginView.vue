<template>
    <div class="login-container">
        <LoadingModal v-if="loading"/>
        <h1 class="login-title">COCONUT DEVELOPER'S PAGE</h1>
        <hr width="30%" color="white" noshadow>
        <div class="input-container">
            <label class="input-label">Email</label>
            <input class="input-login" type="text" v-model="email"><br>
        </div>
        <div class="input-container">
            <label class="input-label">Password</label>
            <input class="input-password" type="password" v-model="password"><br>
        </div>
        <button class="login-button box-shadow" :disabled="loading" @click="login">Login</button>
        <p v-if="alert">{{ error }}</p>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import LoadingModal from '@/components/LoadingModal.vue';
export default {
    name: 'loginView',
    components: {
        LoadingModal
    },
    data() {
        return {
            email: '',
            password: '',
            alert: false
        }
    },
    computed: {
        ...mapState(['auth/error', 'loading'])
    },
    methods: {
        login() {
            this.$store.dispatch('auth/userSignIn', {
                email: this.email,
                password: this.password
            })
        },
    },
    watch: {
        error(value) {
            if (value) {
                this.alert = true
            }
        },
        alert(value) {
            if (!value) {
                this.$store.commit('auth/setError', null)
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .login-container {
        background: rgb(4, 153, 103);
        color: white;
        height: 100%;
        width: 100%;
        margin: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        .login-button {
            margin-top: 20px;
            padding: 0.5rem 3rem;
            font-size: 1.1rem;
            border: none;
            cursor: pointer;
            border-radius: 1rem;
            &:focus {
                outline: none;
            }
            &:active {
                box-shadow: none;
            }
        }
        hr {
            margin-bottom: 6vh;
        }
        .input-container {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            .input-label {
                margin: 0 0 0 2px;
                font-weight: bold;
            }
            .input-login, .input-password {
                margin-bottom: 10px;
                width: 20vw;
                padding: 15px 15px 10px 5px;
                font-size: 1rem;
                background: none;
                border: none;
                border-bottom: 2px solid white;
                caret-color: white;
                color: white;
                &::placeholder {
                    color: white;
                }
                &:focus {
                    outline: none;
                }
            }
        }
    }
</style>
