<template>
    <section v-if="project">
        <h1>{{ project.title }}</h1>
        <img :src="`${store.imagBasePath}${project.cover_image}`" class="card-img-top" :alt="project.title">
        <p v-html="project.content"></p>
        <div v-if="project.category">
            <h5>Category: {{ project.category.name }}</h5>
        </div>
        <div v-if="project.tags && project.tags.length > 0">
            <h5>Tags</h5>
            <div>
                <span v-for="(tag, index) in project.tags" :key="index" class="badge text-bg-info">{{ tag.name }}</span>
            </div>
        </div>
    </section>
    <section v-else>Loading...</section>
</template>

<script>
import axios from 'axios';
import { store } from '../store';
export default {
    name: 'SingleProject',
    data() {
        return {
            store,
            project: null,
        }
    },
    methods: {
        getProject() {
            console.log(this.$route);
            axios.get(`${this.store.apiBaseUrl}/projects/${this.$route.params.slug}`).then((response) => {
                //console.log(response.data.results);
                if (response.data.success) {
                    //console.log(response.data.results);
                    this.project = response.data.results;
                } else {
                    //console.log(this.$router);
                    this.$router.push({ name: 'not-found' });
                }

            });
        }
    },
    mounted() {
        this.getProject();
    }

}
</script>

<style lang="scss" scoped>

</style>