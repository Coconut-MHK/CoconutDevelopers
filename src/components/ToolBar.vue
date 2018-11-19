<template>
  <div class="header">
    <div class="router logo-container">
        <router-link to="/home">COCONUT</router-link>
    </div>
    <div class="router router-container">
        <router-link to="/home/data/hospital">정신과 데이터 관리</router-link>
        <router-link to="/home/data/center">상담센터 데이터</router-link>
        <router-link to="/home/reports">신고된 포스트 / 회원 관리</router-link>
        <button @click="userSignOut">로그아웃</button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    methods: {
        ...mapActions(['userSignOut'])
    }
}
</script>

<style lang="scss" scoped>
/* .logo {
    width: 50px;
    height: 50px;
    margin-right: 18px;
} */
.logo-container, .router{
    font-weight: bold;
    margin: 6px;
}
.header {
    background-color:rgb(4, 153, 103);
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
    font-weight: bold;
    button {
        color: white;
        font-weight: bold;
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
}
.router a{
    text-decoration: none;
    color: white;
    margin-right: 18px;
    margin-left: 18px;
    transition-duration: 0.25s;
}
.router a:active {
    color: black;
}
.router a:hover {
    color: black;
}
</style>
