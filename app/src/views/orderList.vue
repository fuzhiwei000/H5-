<template>
    <div class="order_wrap">
        <div v-for="item in oldList.oldlist" :key="item.id" class="order_item">
            <p>订单号：{{ item.id }}</p>
            <p>总价格：{{ item.totalAmount }}</p>
            <p>收货人：{{ item.deliveryUserName }}</p>
            <p>收货电话：{{ item.deliveryUserPhone }}</p>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { orderListApi } from "@/utils/request";
import { user } from "@/store/userInfo";
import { ref, reactive } from "vue";
const store = user()
const oldList = reactive<any>({
    oldlist: []
})
const init = async () => {
    const res = await orderListApi({
        userId: store.$state.id,
    })
    if (res.code === 200) {
        oldList.oldlist = res.body
        console.log(res);
    }
}
init()
</script>

<style lang="less" scoped>
   .order_wrap{
       
        padding:0 30px;
        background: #eee;
        min-height: 100vh;
        .order_item{
            background: #fff;
            border-radius: 5px;
            margin-bottom: 30px;
            font-size: 30px;
            padding: 15px;
            p{
                line-height: 2;
            }
        }
    }
</style>