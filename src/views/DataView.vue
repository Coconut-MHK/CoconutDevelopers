<template>
    <div class="data-list">
        <div class="data-list-item">
            <div class="data-list-item-header">
                <h3 class="header">A 정신과</h3>
            </div>
            <p>A 정신과는 뭐뭐머를 하는 공간입니다.</p>
            <small>주소</small><br>
            <small>영업시간</small><br>
            <small>연락처</small><br>
            <p>진료항목: </p>
        </div>
        <div class="data-list-item">
            <h3>A 정신과</h3>
            <p>A 정신과는 뭐뭐머를 하는 공간입니다.</p>
            <small>주소</small><br>
            <small>영업시간</small><br>
            <small>연락처</small><br>
            <p>진료항목: </p>
        </div>
        <div class="data-list-item">
            <h3>A 정신과</h3>
            <p>A 정신과는 뭐뭐머를 하는 공간입니다.</p>
            <small>주소</small><br>
            <small>영업시간</small><br>
            <small>연락처</small><br>
            <p>진료항목: </p>
        </div>
        <div class="data-list-item">
            <h3>A 정신과</h3>
            <p>A 정신과는 뭐뭐머를 하는 공간입니다.</p>
            <small>주소</small><br>
            <small>영업시간</small><br>
            <small>연락처</small><br>
            <p>진료항목: </p>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
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
        border-radius: 2px;
        box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
        transition: all 0.3s cubic-bezier(.25,.8,.25,1);
        &:hover {
            box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
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
</style>
