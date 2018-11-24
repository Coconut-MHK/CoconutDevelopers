<template>
    <div class="login">
        <h1>COCONUT DEVELOPER'S PAGE</h1>
        <hr width="30%" color="white" noshadow>
        <div class="input-container">
            <label>Email</label>
            <input type="text" placeholder="Email" v-model="email"><br>
        </div>
        <div class="input-container">
            <label>Password</label>
            <input type="password" placeholder="Password" v-model="password"><br>
        </div>
        <button :disabled="loading" @click="login">Login</button>
        <p v-if="alert">{{ error }}</p>
    </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
    name: 'login',
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
    .login {
        background: rgb(4, 153, 103);
        color: white;
        height: 100%;
        width: 100%;
        margin: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        button {
            margin-top: 20px;
            width: 10%;
            height: auto;
            font-size: 1.1rem;
            border: none;
            cursor: pointer;
            border-radius: 1rem;
        }
        hr {
            margin-bottom: 6vh;
        }
        .input-container {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            label {
                margin: 0 0 5px 2px;
                font-weight: bold;
            }
            input {
                margin-bottom: 10px;
                width: 20vw;
                padding: 15px;
                font-size: 1rem;
            }
        }
    }
</style>
