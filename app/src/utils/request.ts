import { post, get, put, del } from "./server";
// // // 登录接口
export const loginApi = (data: any) => {
    return put({
        url: '/user/login',
        data
    })
}
export const registApi = (data: any) => {
    return put({
        url: '/user/register',
        data
    })
}
export const getIndexPageDataApi=(data:any)=>{
    return get({
        url:'/goods/list',
        data
    })
}
export const getGoodListApi=(data:any)=>{
    return get({
        url:'/goods/list',
        data
    })
}

// 获取商品详情
export const getGoodDetaApi=(data:any)=>{
    return get({
        url:'/goods/detailById',
        data
    })
}
// 购物车
export const addCar=(data:any)=>{
    return put({
        url:'/shopping/cart',
        data
    })
}
// 购物车列表
export const getCarApi=(data:any)=>{
    return get({
        url:'/shopping/listByUserId',
        data
    })
}
// 地址请求
export const getAddressApi=(data:any)=>{
    return get({
        url:'/address/listByUserId',
        data
    })
}
// 地址新增请求
export const getNewAddress=(data:any)=>{
    return put({
        url:'/address/add',
        data
    })
}
// 订单提交请求
export const addOrderApi=(data:any)=>{
    return put({
        url:'/order/add',
        data
    })
}
// 订单提交查询
export const orderListApi=(data:any)=>{
    return get({
        url:"/order/list",
        data
    })
} 
