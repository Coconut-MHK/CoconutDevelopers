<template>
    <div class="data-container">
        <h1>정신과 데이터</h1>
        <hr width="15%" noshadow color="black">
        <router-link to="hospital/data">병원 데이터 등록</router-link>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.data-container {
    margin: 5vh 0 1vh 0;
    display: flex;
    align-items: center;
    flex-direction: column;
    h1 {
        margin: 0 0 2.5vh 0;
    }
    a {
        text-decoration: none;
        background:rgb(4, 153, 103);
        padding: 16px;
        margin: 2.5vh 0 5vh 0;
        transition: 0.5s;
        &:visited {
            color: white;
        }
        &:hover {
            background: black;
        }
    }
    .data-list {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-evenly;
        width: 90vw;
        .data-list-item {
            width: 40vw;
            min-width: 400px;
            margin-bottom: 5vh;
            text-align: left;   
            padding: 0 1vw;
            border: 1px solid #777;
            transition: 0.5s;
            &:hover {
                box-shadow: 10px 10px 6px -6px #777; 
            }   
            .data-list-item-header {
                display: flex;
                align-items: center;
                .header {
                    flex: 1 1 100%;
                }
                button {
                    font-size: 1rem;
                    border-radius: 100%;
                    border: 1px solid black;
                    width: 2.5vw;
                    height: 2.5vw;
                }
            }
        }
    }
}
</style>
