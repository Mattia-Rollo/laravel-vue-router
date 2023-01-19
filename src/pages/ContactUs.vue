<template>
    <section>
        <div class="container">

            <h1 class="py-2">
                Contatti Us
            </h1>
        </div>
        <ContactForm />

    </section>
</template>

<script>
import ContactForm from '../components/ContactForm.vue';
export default {
    name: 'ContactUs',
    components: {
        ContactForm
    }
}
</script>

<style lang="scss" scoped>

</style>