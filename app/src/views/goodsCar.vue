<template>
    <div class="goods_car_wrap">
        <!-- 地址栏 -->
        <div class="address">
            <div class="add_address" v-if="addressList.addresslist.length <= 0" @click="handelAddAddress">
                <van-icon name="plus" />
                <span>添加地址</span>
            </div>
            <div v-else class="flex-float">
                <div class="addres_box">
                    <p>收件人：{{ addressObj.objlist.deliveryUserName }}</p>
                    <p>手机号：{{ addressObj.objlist.deliveryUserPhone }}</p>
                    <p>地址:{{ addressObj.objlist.deliveryUserAddress }}</p>
                </div>
                <van-button @click="changeAddress" class="changebtn">点击切换地址</van-button>
            </div>
        </div>
        <!-- 地址列表 -->
        <van-action-sheet v-model:show="addressShow" title="收货地址">
            <div class="address_list">
                <div class="address_list_item" v-for="item in addressList.addresslist" :key="item.id"
                    @click="checkAddress(item)">
                    <p>收件人：{{ item.deliveryUserName }}</p>
                    <p>手机号：{{ item.deliveryUserPhone }}</p>
                    <p>地址:{{ item.deliveryUserAddress }}</p>
                </div>
                <van-button @click="handelAddAddress" class="changebtn">新建地址</van-button>

            </div>
        </van-action-sheet>
        <!-- 购物车 -->
        <div class="list_wrap" v-if="carList.list.length">
            <div v-for="item in carList.list" :key="item.id" class="total">
                <img :src="require('@/assets/images/goods/' + item.goodsPictureName)">
                <div class="price">
                    <p> {{ item.goodsName }} </p>
                    <p>单价：{{ item.goodsPrice }}</p>
                    <p>总价：{{ item.goodsPrice * item.goodsNum }}</p>
                    <van-stepper v-model="item.goodsNum"
                        :before-change="(value) => { return beforeChange(value, item) }" />
                </div>
            </div>
        </div>
        <p v-else>暂无商品添加</p>
        <van-submit-bar :price="allPrice" button-text="提交订单" @submit="onSubmit" class="sub_nav" />
        <!-- 底部导航 -->
        <TabBar></TabBar>
        <!-- 添加地址弹窗 -->
        <van-dialog v-model:show="show.addressshow" title="标题" show-cancel-button :before-close="sumbitAddress">
            <!-- 表单 -->
            <van-cell-group inset>
                <van-field v-model="formValues.deliveryUserName" class="input_box" type="text" label="姓名" />
                <van-field v-model="formValues.deliveryUserPhone" class="input_box" type="number" label="手机号" />
                <van-field v-model="formValues.deliveryUserAddress" class="input_box" type="textarea" label="地址"
                    rows="2" />
            </van-cell-group>
            <!-- 表单 -->
        </van-dialog>
        <!-- 添加地址弹窗 -->

    </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { Toast } from "vant"
import { user } from "@/store/userInfo";
import { ref, reactive, watchEffect, watch } from "vue";
import { getCarApi, addCar, getAddressApi, getNewAddress, addOrderApi } from "@/utils/request";
import TabBar from "@/components/tabBar.vue";
const route = useRoute()
const router = useRouter()
const store = user()
let formValues = reactive<any>({
    //   { val:[{
    //         userId: store.$state.id,
    //         deliveryUserName: '',
    //         deliveryUserPhone: '',
    //         deliveryUserAddress: '',
    //     }]}
    userId: store.$state.id,
    deliveryUserName: '',
    deliveryUserPhone: '',
    deliveryUserAddress: '',
})

const show = reactive<any>({
    addressshow: false
})
const carList = reactive<any>({
    list: []
})
const addressList = reactive<any>({
    addresslist: []
})
// 购物车加减请求
const beforeChange = async (val: any, item: any) => {
    // 加减操作和之前的添加购物车操作一样同一个接口
    const res = await addCar({
        "userId": store.$state.id,  //--当前登录人的ID
        "goodsId": item.id, //--选择商品的ID
        "goodsNum": val //-- 选择的商品的数量（若移除后是0，也需要传）
    })
    //如果仍有库存返回200，如果不是200则没有库存返回false给value然后阻止接下来的输入
    if (res.code === 200) {
        return true
    } else {
        return false
    }
}
// ---------提交---------
const allPrice = ref<any>(0)//总价
const onSubmit = async () => {
    const res = await addOrderApi({
        'userId': store.$state.id,
        'addressId': addressObj.objlist.id
    })
    if (res.code === 200) {
        //跳转到订单列表页
        router.push({
            name: 'orderList'
        })
    }
}
// ---------价格计算---------

const conutPrice = () => {
    let price = ref(0)
    carList.list.forEach((item: any) => {
        price.value += item.goodsNum * item.goodsPrice
    })
    return price.value * 100
}

//监听数据变化即加减操作每进行一次就进行一次新的赋值
watch(carList, (newVal, oldVal) => {
    allPrice.value = conutPrice()//进 来的时候就执行一次看总价
    console.log('新值', newVal);
    console.log('旧值', oldVal);

}, {
    deep: true
})
// 地址请求
const getAddress = async () => {
    const res = await getAddressApi({
        userId: store.$state.id
    })
    if (res.code === 200) {
        addressList.addresslist = res.body
        addressObj.objlist = addressList.addresslist[0]
    }
}
// 添加地址弹框
const handelAddAddress = () => {
    show.addressshow = true
}
// 控制多个地址弹窗列表
const addressShow = ref<boolean>(false)
const changeAddress = () => {
    addressShow.value = true
}
//点击地址列表后点击具体项目渲染给默认地址
const addressObj = reactive<any>({
    objlist: []
})
const checkAddress = (item: any) => {
    addressObj.objlist = item
    addressShow.value = false

}
//点击地址确定提交地址到后台
const sumbitAddress = async (action: any): Promise<any> => {
    // 验证手机号
    if (action == "confirm") {
        if (!/^1[3-9]\d{9}$/.test(formValues.deliveryUserPhone)) {
            //输入正确则不会提示一下信息
            Toast.fail('请输入正确手机号')
            return false
        }

        const res = await getNewAddress(formValues)
        if (res.code === 200) {
            getAddress()
            return true
        }
        return false

        // return true
    } else {
        return true
    }

}
//进来就请求数据计算总价
const Deta = async () => {
    if (store.$state.id) {
        const res = await getCarApi({
            userId: store.$state.id
        })
        if (res.code === 200) {
            carList.list = res.body.records
            allPrice.value = conutPrice()//进 来的时候就执行一次看总价
        }
        getAddress()//请求地址数据
        console.log('addressList.addresslist', addressList.addresslist);

    }
}
Deta()
</script>

<style  lang="less" scoped>
.goods_car_wrap {
    min-height: 100vh;
    background: #ececec;



    .total {
        padding: 30px;
        display: flex;
        background-color: #fff;
        margin-top: 20px;

        .price {
            margin-top: 10px;
            margin-left: 200px;

            p {
                margin-top: 15px;
            }
        }
    }

    img {
        width: 30%;
        border: 1px solid;
    }

    .sub_nav {
        margin-bottom: 100px;
    }

    .address {
        width: 100%;
        height: 200px;
        background-color: #fff;
        margin-bottom: 20px;
        padding: 20px 20px 20px 80px;
        display: flex;
        align-items: center;
        flex-direction: row;

        .add_address {
            font-size: 30px;
        }

        .flex-float {
            display: flex;
            padding-right: 100px;

            .addres_box {
                display: flex;
                flex-direction: column;
                // justify-content: flex-start;
                align-items: flex-start;
                width: 500px;

                p {
                    margin-bottom: 25px;
                }
            }

            .changebtn {
                margin-top: 20px;
            }


        }


    }

    .address_list {
        padding: 30px;

        .address_list_item {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            border-bottom: 1px solid #aaaaaa;
            font-size: 10px;

            p {
                margin-bottom: 30px;
            }
        }
    }

    .input_box {
        /deep/ .van-field__control {
            border: 1px solid gray;

        }
    }
}
</style>