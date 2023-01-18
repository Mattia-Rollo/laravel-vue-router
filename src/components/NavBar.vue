<template>
    <div v-if="project">

        Ciao
        <h3>{{ project.title }}</h3>

        <span>Title: </span>
        <div v-html="project.content"></div>
        <div>{{ project.created_at }}</div>

        <div>{{ project.category.name }}</div>

    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'HelloWorld',
    data() {
        return {
            text: 'ciao',
            baseUrl: 'http://localhost:8000/api/project/boolflix',
            project: ''
        }
    },
    methods: {
        getProjects() {
            axios.get(this.baseUrl)
                .then(res => {
                    console.log(res.data.results);
                    this.project = res.data.results;

                })
                .catch(err => {
                    console.log(err)
                })
        }
    },
    mounted() {
        this.getProjects();
    },
}

</script>

<style lang="scss" scoped>

</style>