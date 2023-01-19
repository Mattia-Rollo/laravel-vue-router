<template>
    <header>
        <nav class="navbar navbar-expand-lg">
            <div class="container-fluid">
                <a class="navbar-brand " href="#"><i class="fa-solid fa-laptop-code"></i></a>

                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav">
                        <li class="nav-item fw-bolder" v-for="(item, index) in menuItems" :key="index">
                            <router-link :to="{ name: item.routeName }" active-class="active" class="nav-link">
                                {{ item.label }}
                            </router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </header>
</template>

<script>
export default {
    name: 'AppHeader',
    data() {
        return {
            menuItems: [
                {
                    label: 'Home',
                    routeName: 'home'
                },
                {
                    label: 'Projects',
                    routeName: 'projects'
                },
                {
                    label: 'Chi Siamo',
                    routeName: 'about'
                },
                {
                    label: 'Contatti',
                    routeName: 'contact'
                }
            ]
        }
    }

}
</script>

<style lang="scss" scoped>
@use '../assets/style/partials/variables' as *;

.navbar {
    background-color: $main;
}

i {
    font-size: 3.2rem;
}
</style>