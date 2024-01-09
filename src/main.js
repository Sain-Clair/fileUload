import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
const app = createApp(App)
app.config.globalProperties.$axios=axios; // 전역변수 -> this.$axios
app.config.globalProperties.$serverUrl='http://192.168.0.30/springvue0102' //서버주소

const serverUrl = 'http://192.168.0.30/springvue0102'

// provide 함수는 부모 컴포넌트에서 자식 컴포넌트로 데이터를 전달하는 역할
// 자식 컴포넌트에서는 inject함수를 사용하여 해당 데이터를 찾아서 사용할 수 있다.
app.provide('$axios',axios)
app.provide('$serverUrl', serverUrl)
createApp(App).use(store).use(router).mount('#app')
