import { createPinia } from 'pinia'
import piniaPluginPersist from 'pinia-plugin-persist'
// import { user } from "./userInfo";
const store =createPinia()
store.use(piniaPluginPersist)
export default store