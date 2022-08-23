<template>
    <div class="my_wrap">
        <div class="top">
            <div>
                <span class="avear"></span>
                <p class="unamw">{{ store.userName || "匿名" }}</p>
            </div>
        </div>
        <div class="nav">
            <p @click="toOrder">我的订单</p>
            <p @click="toAddress">地址管理</p>

        </div>
    </div>
    <TabBar></TabBar>
</template>

<script lang="ts" setup>
import { user } from "@/store/userInfo";
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import TabBar from '@/components/tabBar.vue'

const store = user()
const router = useRouter()
const toOrder = () => {
    router.push({
        name: 'orderList'
    })//跳转到订单详情页
}
const toAddress = () => {
    router.push({
        name: 'address'
    })//跳转到地址管理页
}
</script>

<style lang="less" scoped>
.my_wrap {
    background: #eee;
    min-height: 100vh;

    .top {
        padding: 60px 0;
        display: flex;
        justify-content: space-around;
        align-items: center;
        background: #fff;
        margin-bottom: 30px;
    }

    // 导航
    .avear {
        display: block;
        width: 200px;
        height: 200px;
        background: chocolate;
        border-radius: 50%;
        margin-bottom: 20px;
    }

    .unamw {
        font-size: 50px;
        text-align: center;
    }
}

.nav {
    p {
        background: #fff;
        margin-bottom: 1px;
        padding: 30px;
        font-size: 38px;
    }
}
</style>