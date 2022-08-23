<template>
    <div class="detail_wrap">
        <img
            :src="DecList.list.goodsPictureName && require('@/assets/images/goods/' + DecList.list.goodsPictureName)" />
        <h1>{{ DecList.list.goodsName }}</h1>
        <p>价格：{{ DecList.list.goodsPrice }}</p>
        <p v-html="DecList.list.goodsDesc"></p>
    </div>
    <van-button :disabled="!DecList.list.goodsNum" type="primary" @click="handleAddCar">添加到购物车</van-button>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { user } from "@/store/userInfo";
import { ref, reactive } from "vue";
import { getGoodDetaApi, addCar } from "@/utils/request";
const route = useRoute()//获取路由信息
const router = useRouter()//路由切换
const store = user()
const DecList = reactive<any>({
    list: []
})
const Deta = async () => {
    if (route.query.id) {
        const res = await getGoodDetaApi({
            id: route.query.id
        })
        if (res.code === 200) {
            DecList.list = res.body
        }
        console.log(res);

    }
}
// 添加购物车
const handleAddCar = async (): Promise<void> => {
    // 请求添加购物车接口成功后商品数量goodsnum-1库存少1
    console.log('这里是pinia', store.$state.id);

    const res = await addCar({
        "userId": store.$state.id,  //--当前登录人的ID
        "goodsId": DecList.list.id, //--选择商品的ID
        "goodsNum": 1 //-- 点击添加购物车每次选择的商品的数量（若移除后是0，也需要传）
    })
    if (res.code === 200) {
        router.push({
            name:'goodsCar'
        })
    }
}
Deta()
</script>

<style lang="less" scoped>
.detail_wrap {
    img {
        width: 100%;
    }
}
</style>