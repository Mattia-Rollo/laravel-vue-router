<template>

    <Jumbotron />
    <Album />

</template>

<script>
import Jumbotron from '../components/Jumbotron.vue';
import Album from '../components/Album.vue';
export default {
    name: "HomePage",
    components: { Jumbotron, Album }
}
</script>

<style lang="scss" scoped>

</style>