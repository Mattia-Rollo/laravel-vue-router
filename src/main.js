import { createApp } from 'vue'

import { router } from './route.js';
import App from './App.vue'

import './assets/style/main.scss';
// import './assets/main.css';

createApp(App).use(router).mount('#app')
