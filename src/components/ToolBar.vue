<template>
  <div class="header">
    <div class="router logo-container">
        <router-link to="/home">COCONUT</router-link>
    </div>
    <div class="router router-container">
        <router-link to="/home/data/hospital">정신과 데이터 관리</router-link>
        <router-link to="/home/data/center">상담센터 데이터</router-link>
        <router-link to="#">신고된 포스트 / 회원 관리</router-link>
        <button @click="userSignOut">로그아웃</button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    methods: {
        ...mapActions('auth', ['userSignOut'])
    },
}
</script>

<style lang="scss" scoped>
@import '../assets/css/Scheme.scss';
%font-style {
    font-weight: bold;
}
.logo-container, .router {
    @extend %font-style;
    margin: 6px;
}
.logo-container a {
    text-decoration: none;
    color: white;
}
.header {
    background-color: $VueGreen;
    display: flex;
    align-items: center;
    color: white;
    padding: 8px 8px 8px 25px;
    box-shadow: 0px 0px 10px 0px #777; 
}
.router-container {
    flex: 1;
    display: flex;
    justify-content: flex-end;
    font-size: 12px;
    button {
        @extend %font-style;
        color: white;
        font-size: 12px;
        margin: 0 18px;
        background: none;
        border: none;
        cursor: pointer;
        transition-duration: 0.25s;
        &:hover {
            color: black;
        }
    }
    a {
        text-decoration: none;
        color: white;
        margin-right: 18px;
        margin-left: 18px;
        transition-duration: 0.25s;
        &:hover {
            color: black;
        }
    }
    a.router-link-active {
        color: black;
    }
}
</style>
