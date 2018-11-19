<template>
    <div class="home-content">
        <p>Hi <b>{{user.name}}</b>!</p>
        <p>Welcome to Coconut Developer's Page!</p>
        <router-link to="/home/data/hospital">정신과 데이터 조회 / 등록</router-link>
        <router-link to="/home/data/hospital">상담센터 데이터 조회 / 등록</router-link>
        <router-link to="/home/reports">산고된 포스트 / 회원 관리</router-link>
    </div>
</template>

<script>
export default {
    data() {
        return {
            user: {
                name: this.$store.state.user.displayName
            }
        }
    }

}
</script>

<style lang="scss" scoped>
    .home-content {
        margin-top: 15vh;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        p {
            margin: 2vh 0;
            font-size: 2rem;
        }
        p + p {
            margin-bottom: 10vh;
        }
        a {
            width: 15vw;
            padding: 2.5vh 0;
            font-size: 1.5vmin;
            text-decoration: none;
            background:rgb(4, 153, 103);
            transition: 0.25s;
            font-weight: bold;
            cursor: pointer;
            &:visited {
                color: white;
            }
            &:hover {
                background: black;
            }
        }
        a + a {
            margin-top: 5vh;
        }
    }
</style>
