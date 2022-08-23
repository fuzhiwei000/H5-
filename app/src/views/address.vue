<template>
    <div class="order_wrap">
        <div v-for="item in control.controlList" :key="item.id" class="order_item">
            <p>收货人：{{ item.deliveryUserName }}</p>
            <p>收货电话：{{ item.deliveryUserPhone }}</p>
            <p>收货地址：{{ item.deliveryUserAddress }}</p>

        </div>
    </div>
</template>

<script lang="ts" setup>
import { getAddressApi } from "@/utils/request";
import { user } from "@/store/userInfo";
import { ref, reactive } from "vue";
const store = user()
const control = reactive<any>({
    controlList: []
})
const addressinit = async () => {
    const res = await getAddressApi({
        userId: store.$state.id,
    })
    if (res.code === 200) {
        control.controlList = res.body
    }
}
addressinit()
</script>

<style lang="less" scoped>
.order_wrap {

    padding: 0 30px;
    background: #eee;
    min-height: 100vh;

    .order_item {
        background: #fff;
        border-radius: 5px;
        margin-bottom: 30px;
        font-size: 30px;
        padding: 15px;

        p {
            line-height: 2;
        }
    }
}
</style>