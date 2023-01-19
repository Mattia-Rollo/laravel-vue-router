<template>

    <section>
        <div class="container-fluid text-center">

            <h1 class="py-5">
                Contatti Us
            </h1>
            <div class="row">

                <div class="col-lg-6 mx-auto">
                    <div v-if="success" class="alert alert-success text-start" role="alert">
                        Messaggio inviato con successo!
                    </div>
                </div>
            </div>

            <form class="row gy-4 flex-column text-start needs-validation" novalidate @submit.prevent="sendForm()">

                <div class="col-lg-6 col-12 mx-auto mb-2 position-relative ">

                    <input class="form-control" type="text" name="name" id="name" placeholder="Name" v-model="name"
                        :class="{ 'is-invalid': errors.name }" required>
                    <!-- <p class="valid-feedback">Bravo</p> -->

                    <p v-for="(error, index) in errors.name" :key="index" class="invalid-tooltip">
                        {{ error }}
                    </p>
                </div>
                <div class="col-lg-6 col-12 mb-2 mx-auto position-relative ">
                    <input class="form-control" type="text" name="email" id="email" placeholder="Email" v-model="email"
                        :class="{ 'is-invalid': errors.email }">

                    <p v-for="(error, index) in errors.email" :key="index" class="invalid-tooltip">
                        {{ error }}
                    </p>

                </div>
                <div class="col-lg-8 col-12 mx-auto mb-2 position-relative">
                    <textarea class="form-control" name="message" id="message" cols="30" rows="10" placeholder="Message"
                        v-model="message" :class="{ 'is-invalid': errors.message }"></textarea>
                    <p v-for="(error, index) in errors.message" :key="index" class="invalid-tooltip">
                        {{ error }}
                    </p>
                </div>
                <div class="col-lg-8 col-12 mx-auto mb-2">
                    <button class="btn btn-lg btn-primary" type="submit" :disabled="loading">
                        {{ loading == true ? 'Sending...' : 'Send' }}</button>
                </div>
            </form>

        </div>
    </section>
</template>

<script>
import axios from 'axios';
import { store } from '../store';
export default {
    name: 'ContactForm',
    data() {
        return {
            store,
            name: '',
            email: '',
            message: '',
            success: false,
            errors: {},
            loading: false
        }
    },
    methods: {
        sendForm() {
            this.loading = true;
            const data = {
                name: this.name,
                email: this.email,
                message: this.message
            }
            axios.post(`${this.store.apiBaseUrl}/contacts`, data).then((response) => {
                //console.log(response.data);
                this.success = response.data.success;
                if (!this.success) {
                    this.errors = response.data.errors;
                    //console.log(this.errors);
                } else {
                    this.name = '';
                    this.email = '';
                    this.message = '';
                    this.errors = {};
                    // this.success = response.data.success;
                    this.loading = false;
                }
                // setTimeout(() => { this.success = false; }, 2000)
                this.loading = false;
            });
        }
    }
}
</script>

<style lang="scss" scoped>

</style>