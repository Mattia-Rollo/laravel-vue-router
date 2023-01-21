<template>
    <section>
        <Transition>
            <div v-if="projects" class="container d-flex flex-column">
                <h1 class="py-3">Lista dei Progetti</h1>
                <div class="row g-3 ">
                    <div class="col-12 " :class="[index < 1 ? 'col-md-12 my-min-h' : 'col-md-4 ']"
                        v-for="(project, index) in projects" :key="index">
                        <div class="card h-100 shadow" style="">
                            <!-- <img :src="project.cover_image ? `${store.imagBasePath}${project.cover_image}` : ''"
                        class="card-img-top" :alt="project.title"> -->
                            <div class="card-body d-flex flex-column">
                                <h5 class="card-title">{{ project.title }}</h5>
                                <p class="card-text" v-html="project.content"></p>
                                <div class=" mt-auto">

                                    <router-link v-tooltip="'vai alla pagina'" class="btn btn-primary d-inline"
                                        :to="{ name: 'single-project', params: { slug: project.slug } }">
                                        Vedi il project
                                    </router-link>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div class="row ">
                    <div class="col py-3">
                        <nav aria-label="Page navigation">
                            <ul class="pagination cursor-poiner">
                                <li class="page-item"><a class="page-link" @click="prev(-1)">Previous</a></li>
                                <li class="page-item" v-for="n in lastPage"><a class="page-link"
                                        :class="[n == currentPage ? 'active' : '']" @click="getProjects(n)">{{
                                            n
                                        }}</a>
                                </li>
                                <li class="page-item">
                                    <a class="page-link" @click="next(1)">next</a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </Transition>
    </section>
</template>

<script>

import axios from 'axios';

import { store } from '../store';

export default {
    name: "ProjectsList",
    data() {
        return {
            store,
            projects: [],
            currentPage: 1,
            lastPage: null,
            total: 0,
            contentMaxLen: 100
        };
    },
    methods: {
        getProjects(pagenum) {
            // console.log(this.currentPage);
            if (pagenum < 1)
                pagenum = this.lastPage;
            if (pagenum > this.lastPage)
                pagenum = 1;
            axios.get(`${this.store.apiBaseUrl}/projects`, {
                params: {
                    page: pagenum
                }
            }).then((response) => {
                // console.log(response.data.results);
                if (response.data.success) {
                    this.projects = response.data.results.data;
                    this.currentPage = response.data.results.current_page;
                    this.lastPage = response.data.results.last_page;
                    this.total = response.data.results.total;
                }
                else {
                    this.$router.push({ name: "not-found" });
                }
            });
        },
        truncateContent(text) {
            if (text.length > this.contentMaxLen) {
                return text.substr(0, this.contentMaxLen) + "...";
            }
            return text;
        },
        next(n) {
            let num = this.currentPage + n;
            this.getProjects(num);
        },
        prev(n) {
            let num = this.currentPage + n;
            this.getProjects(num);
        },
    },
    mounted() {
        this.getProjects(1);
    },

}
</script>

<style lang="scss" scoped>
@use '../assets/style/partials/variables' as *;

// .page-link {
//     background-color: $paragraph;
// }



.v-enter-active,
.v-leave-active {
    transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}

.my-min-h {
    min-height: 20rem;
}

.card {

    // background-color: $main;
    transition: all 0.35s;
    cursor: pointer;
}

.card:hover:not(.my-min-h) {
    transform: translateY(-5px);

}

.card-text {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    /* number of lines to show */
    line-clamp: 2;
    -webkit-box-orient: vertical;
    // color: $button-text;

}

.card-title {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    /* number of lines to show */
    line-clamp: 1;
    -webkit-box-orient: vertical;
    // color: $button-text !important;
}

.container {
    min-height: calc(100vh - 5rem);
}
</style>