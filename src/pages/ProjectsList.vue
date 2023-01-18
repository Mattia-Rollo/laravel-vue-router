<template>
    <section v-if="projects">
        <h1>Lista dei project</h1>
        <div class="row g-5">
            <div class="col-12 col-md-4" v-for="(project, index) in projects" :key="index">
                <div class="card h-100" style="width: 24rem">
                    <img :src="project.cover_image ? `${store.imagBasePath}${project.cover_image}` : ''"
                        class="card-img-top" :alt="project.title">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title">{{ project.title }}</h5>
                        <p class="card-text" v-html="truncateContent(project.content)"></p>
                        <router-link class="btn btn-primary mt-auto w-50"
                            :to="{ name: 'single-project', params: { slug: project.slug } }">
                            Vedi il project
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
        <div class="row py-3">
            <div class="col ">
                <nav aria-label="Page navigation example">
                    <ul class="pagination cursor-poiner">
                        <li class="page-item"><a class="page-link" @click="prev()">Previous</a></li>
                        <li class="page-item" v-for="n in lastPage"><a class="page-link"
                                :class="[n == currentPage ? 'active' : '']" @click="getProjects(n)">{{
                                    n
                                }}</a>
                        </li>
                        <li class="page-item">
                            <a class="page-link" @click="next()">next</a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    </section>
</template>

<script>
import axios from 'axios';
import { store } from '../store';
export default {
    name: 'ProjectsList',
    data() {
        return {
            store,
            projects: [],
            currentPage: 1,
            lastPage: null,
            total: 0,
            contentMaxLen: 100
        }
    },
    methods: {
        getProjects(pagenum) {
            axios.get(`${this.store.apiBaseUrl}/projects`, {
                params: {
                    page: pagenum
                }
            }).then((response) => {
                console.log(response.data.results);
                this.projects = response.data.results.data;
                this.currentPage = response.data.results.current_page;
                this.lastPage = response.data.results.last_page;
                this.total = response.data.results.total;
            })
        },
        truncateContent(text) {
            if (text.length > this.contentMaxLen) {
                return text.substr(0, this.contentMaxLen) + '...';
            }
            return text;
        },
        prev() {
            this.currentPage--;
            if (this.currentPage < 1) {
                this.currentPage = this.lastPage;
            }
            axios.get(`${this.store.apiBaseUrl}/projects`, {
                params: {
                    page: this.currentPage
                }
            }).then((response) => {
                console.log(response.data.results);
                this.projects = response.data.results.data;
                // this.currentPage = response.data.results.current_page;
                this.lastPage = response.data.results.last_page;
                this.total = response.data.results.total;
            })
        }
    },
    mounted() {
        this.getProjects(1);
    }
}
</script>

<style lang="scss" scoped>

</style>