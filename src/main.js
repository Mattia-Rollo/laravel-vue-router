import { createApp } from 'vue'
import Popper from "vue3-popper";

import { router } from './route.js';
import App from './App.vue'



import './assets/style/main.scss';
// import './assets/main.css';



createApp(App).use(router).component("Popper", Popper).mount('#app')
