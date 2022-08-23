import { defineStore } from "pinia";
const uInfoLocal = localStorage.getItem("uInfo");
const uInfo = uInfoLocal && JSON.parse(uInfoLocal);
export const user:any = defineStore("user", {
    state: () => {
        return {
            ...uInfo
        }
    },
    //computed
    getters: {

    },
    // methods
    actions: {
        setUInfo(info: any) {
            console.log("info---", info)
            this.id = info.id
            this.userName = info.userName
        }
    },
    // 开启数据缓存
    persist: {
        enabled: true
    }
})
