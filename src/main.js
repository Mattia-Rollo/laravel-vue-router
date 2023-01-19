import { createApp } from 'vue'

import FloatingVue from 'floating-vue'



import { router } from './route.js';
import App from './App.vue';
import 'floating-vue/dist/style.css';


import './assets/style/main.scss';
// import './assets/main.css';



createApp(App).use(router).use(FloatingVue).mount('#app')
