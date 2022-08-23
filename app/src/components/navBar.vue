<template>

  <van-nav-bar fixed placeholder>
    <template #title>
      <van-search v-model="searchVal" placeholder="请输入搜索关键词" @search="handelSearch" />
    </template>
  </van-nav-bar>

</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
const router = useRouter()
const searchVal = ref<string>('')
defineProps()
const emit = defineEmits(['divSearch'])
const handelSearch = (): void => {
  emit('divSearch', searchVal.value)
  router.push({
    name:'goodsList',
    params:{
      key:searchVal.value
    }
  })
}
</script>

<style lang="less" scoped>
/deep/ .van-nav-bar__title {
  max-width: none;
  width: 200%;
  height: 100%;
}
</style>