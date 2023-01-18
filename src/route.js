import { createRouter, createWebHistory } from 'vue-router';

import HomePage from './pages/HomePage.vue';
import ProjectsList from './pages/ProjectsList.vue';
import AboutUs from './pages/AboutUs.vue';
import SingleProject from './pages/SingleProject.vue';
import ContactUs from './pages/ContactUs.vue';
import NotFound from './pages/NotFound.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomePage
        },
        {
            path: '/about',
            name: 'about',
            component: AboutUs
        },
        {
            path: '/projects',
            name: 'projects',
            component: ProjectsList
        },
        {
            path: '/contact',
            name: 'contact',
            component: ContactUs
        },
        {
            path:'/projects/:slug',
            name: 'single-project',
            component: SingleProject

        },
        {
            path: "/*",
            name: "not-found",
            component: NotFound
        }
    ]
});

export { router };