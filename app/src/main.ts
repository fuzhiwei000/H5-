import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'lib-flexible/flexible' 
import Vant from 'vant';
import 'vant/lib/index.css';
import store from './store/'
const app=createApp(App)
app.use(store).use(router).use(Vant).mount('#app')
