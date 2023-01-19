<template>

    <section>
        <div class="container-fluid text-center">
            <div v-if="success" class="alert alert-success text-start" role="alert">
                Messaggio inviato con successo!
            </div>

            <div class="">
                <form class="row gy-4 text-start needs-validation" novalidate @submit.prevent="sendForm()">
                    <div class="col-12 mb-1 position-relative">
                        <input class="form-control " type="text" name="name" id="name" placeholder="Name" v-model="name"
                            :class="{ 'is-invalid': errors.name }" required>
                        <!-- <p class="valid-feedback">Bravo</p> -->

                        <p v-for="(error, index) in errors.name" :key="index" class="invalid-tooltip">
                            {{ error }}
                        </p>
                    </div>
                    <div class="col-12 position-relative">
                        <input class="form-control" type="text" name="email" id="email" placeholder="Email"
                            v-model="email" :class="{ 'is-invalid': errors.email }">
                        <p v-for="(error, index) in errors.email" :key="index" class="invalid-tooltip">
                            {{ error }}
                        </p>

                    </div>
                    <div class="col-12 position-relative">
                        <textarea class="form-control" name="message" id="message" cols="30" rows="10"
                            placeholder="Message" v-model="message"
                            :class="{ 'is-invalid': errors.message }"></textarea>
                        <p v-for="(error, index) in errors.message" :key="index" class="invalid-tooltip">
                            {{ error }}
                        </p>
                    </div>
                    <div>
                        <button class="btn btn-lg btn-primary text-white" type="submit" :disabled="loading">{{
                            loading? 'Sending...': 'Send'
                        }}</button>
                    </div>
                </form>
            </div>
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
            show: false,
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
                }
                this.loading = false;
            });
        }
    }
}
</script>

<style lang="scss" scoped>

</style>