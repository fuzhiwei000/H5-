<template>
    <div>
        我是列表页
        <NavBar @divSearch="getList"></NavBar>
        <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" offset="80"
            :immediate-check="false">
            <van-cell v-for="item in goodsList.list" :key="item" class="van">
                <div class="goods-list" @click="handleToDetal(item.id)">
                    <img :src="require('@/assets/images/goods/' + item.goodsPictureName)" />

                    <div class="bom">
                        <h1>{{ item.goodsName }}</h1>
                        <p>价格：{{ item.goodsPrice }}</p>
                        <p>库存：{{ item.goodsNum }}</p>
                    </div>
                </div>
            </van-cell>
        </van-list>
        <TabBar></TabBar>

    </div>
</template>

<script setup lang="ts">
import TabBar from '@/components/tabBar.vue'
import { useRoute, useRouter } from "vue-router";
import { ref, reactive } from "vue";
import NavBar from '@/components/navBar.vue';
import { getGoodListApi } from "@/utils/request";
const loading = ref<boolean>(false)//为true加载下一页
const finished = ref<boolean>(false)//是否已加载完成，加载完成后不再触发 load 事件
type paramsType = {
    goodsName: string,
    currentPage: number,
    size: number
}
const searchParams = reactive<paramsType>({
    goodsName: '',//列表页搜索发送请求的名字
    currentPage: 1,
    size: 10
})
// loading为false的时候触发onload事件
const onLoad = () => {
    searchParams.currentPage += 1//翻页
    loading.value = true//表示在加载中
    getGoodsList(true)//翻页，将新值和旧值都赋给原来的值达到翻页效果
}
const route = useRoute()//获取当前路由信息
const router = useRouter()//路有跳转详情页
const goodsList = reactive<any>({
    list: []
})
const key = ref<any>(route.params.key)//路由拿到的值即首页搜索进来的值  
const getList = (val?: any): void => {
    val ? searchParams.goodsName = val : null
    getGoodsList(false)//搜索不翻页
}
const getGoodsList = (type: boolean): void => {
    getGoodListApi(searchParams).then((res: any) => {
        if (type) {
            goodsList.list = [...goodsList.list, ...res.body.records]//解构赋值将后面的都给前面的
            //累加，即如果是往下翻页同一个关键词种类很多
            // 则在此页翻页时就重新给goodslist.list赋值，
            // 赋的值是上一次刷新和新一次刷新的内容达到翻页效果
            console.log('这是第一个', goodsList.list);

        } else {
            goodsList.list = res.body.records//搜索不翻页，赋予新的关键词的数据
            console.log('这是第二个', goodsList.list);

        }
        if (res.body.total <= goodsList.list.length) {
            finished.value = true//当total大于总条数则说明说有的数据已经加载完毕
            // 无法在刷新让finished结束

        }
        loading.value = false//改为false，表示下滑加载完毕等待下一次下滑
    })
}
const handleToDetal = (id: number) => {
    router.push({
        name: 'goodsDec',//query传参name或者地址都可以（刷新链接不会丢失传的参数），params必须name
        query: {
            id
        }
    })
}
searchParams.goodsName = key.value//初始可能从首页搜索进来
getList()//从列表页搜索获得的值

</script>

<style  lang="less" scoped>
.goods-list {
    display: flex;
    justify-content: flex-start;
    margin-bottom: 16px;

    img {
        width: 25%;
        background-color: #fff;
        border: 1px solid skyblue;
    }

    .bom {
        width: 50%;
        margin-left: 110px;
        padding-left: 20px;
        border-radius: 5px;
        border: 1px solid red;
    }
}
</style>