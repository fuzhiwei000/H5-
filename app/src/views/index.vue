<template>
  <div class="index_wrap">
    <NavBar @divSearch="handelDivSearch"></NavBar>
    <div class="page_content">
      <van-swipe class="my-swipe" :initial-swipe="activeIndex.value" :autoplay="3000" indicator-color="white"
        @change="handleSwiper">
        <van-swipe-item v-for="item in swiperGoodsList.data" :key="item.id" @click="handleSwiperItem">
          <img :src="require('@/assets/images/goods/' + item.goodsPictureName)" />
        </van-swipe-item>
      </van-swipe>
      <div class="tips">女装5折</div>
      <!-- 商品推荐 -->
      <div class="goods_list">
        <h3>商品推荐</h3>
        <div class="flex-float">
          <div class="item" v-for="item in swiperGoodsList.goodsList" :key="item.id" @click="toDetail(item.id)">
            <img :src="require('@/assets/images/goods/' + item.goodsPictureName)" alt="">
            <div class="item-p">
              <p>{{ item.goodsName }}</p>
              <p>价格:${{ item.goodsPrice }}</p>
            </div>
          </div>

        </div>
      </div>
    </div>

    <TabBar></TabBar>
  </div>
</template>

<script setup lang="ts">
import TabBar from "../components/tabBar.vue";
import NavBar from "../components/navBar.vue";
import { ref, reactive } from "vue";
import { getIndexPageDataApi } from "../utils/request";
import { goodsListType } from "../utils/interface";
import { useRouter } from "vue-router";
const router = useRouter();
// -----------检索框--------------
// const Nar = ref<number>(0);
const handelDivSearch = (val: string) => {
  console.log("传过来的值", val);
};


// ----------获取接口数据----------------
let swiperGoodsList = reactive<any>({
  data: [],
  goodList: []
});
// --------------首页点击商品进入商品详情页
const toDetail=(id: number) => {
    router.push({
        name: 'goodsDec',//query传参name或者地址都可以（刷新链接不会丢失传的参数），params必须name
        query: {
            id
        }
    })
}
const getGoodsData = (): void => {
  getIndexPageDataApi({
    currentPage: 1, //当前页面
    size: 10, //一页多少个商品
  }).then((res: any) => {
    if (res.code == 200) {
      // console.log(swipergoodsList[0].goodsPictureName);
      const resData = res.body.records;
      swiperGoodsList.data = resData.slice(0, 3);
      console.log(swiperGoodsList.data);
      swiperGoodsList.goodsList = resData.slice(3)
    }
  });
};
getGoodsData()
// ---------轮播图图片跳转----------------
const activeIndex = ref<any>(0)
const handleSwiper = (index: number): void => {
  activeIndex.value = index
}
const handleSwiperItem = () => {
  router.push({
    path: '/goodsDec',
    query: {
      id: swiperGoodsList.data[activeIndex.value].id
    }
  })
  console.log(2);
  console.log(swiperGoodsList.data[activeIndex.value].id);
}

</script>

<style lang="less" scoped>
.page_content {
  padding: 0 15px;

  .my-swipe {
    background-color: pink;
    height: 320px;

    img {
      width: 100%;
      height: 320px;
    }
  }

  .tips {
    border: 1px solid orange;
    line-height: 2;
    font-size: 20px;
    margin: 30px 0;
    padding: 0 20px;
    color: orange;
    box-sizing: border-box;
  }

  .flex-float {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap; //换行
    flex-shrink: 0; //子盒子不会被压缩宽度

    .item {
      display: flex;
      align-items: center;
      width: 43%;
      background-color: pink;
      padding: 20px;
      border-radius: 5px;

      img {
        width: 90px;
        height: 90px;
        display: block;
        margin-right: 10px;
      }

      .item-p p {
        margin-top: 15px;
      }
    }
  }
}
</style>