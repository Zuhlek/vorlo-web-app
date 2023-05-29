<template>
    <img src="/VorloIcon.png" />
    <v-dialog v-model="dialog" persistent max-width="600px">
        <v-card>
            <v-toolbar color="green-lighten-1" :title="loginMode ? 'Login' : 'Register'" />

            <v-card-text>
                <v-form ref="form" @submit.prevent="submitForm">
                    <v-text-field v-if="!loginMode" v-model="firstName" label="First name" />
                    <v-text-field v-if="!loginMode" v-model="lastName" label="Last name" />
                    <v-text-field v-model="email" label="Email" />
                    <v-text-field v-model="password" label="Password" type="password" />
                </v-form>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text type="submit" @click="submitForm">{{ loginMode ? 'Login' : 'Register' }}</v-btn>
                <v-btn type="button" @click="switchMode">{{ loginMode ? 'No account yet?' : 'Already got an account?'
                }}</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

  
<script>
import { mapActions } from 'vuex';

export default {
    name: "auth-view",
    data() {
        return {
            dialog: true,
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            loginMode: true
        };
    },
    methods: {
        ...mapActions(['login', 'register']),
        async submitForm() {
            try {
                if (this.loginMode) {
                    await this.login({ email: this.email, password: this.password });
                } else {
                    await this.register({ firstName: this.firstName, lastName: this.lastName, email: this.email, password: this.password });
                }
                if (this.$store.getters.accessToken === null) {
                    this.$router.push('/auth');
                } else {
                    this.$router.push('/');
                }

            } catch (error) {

                if (error.response && error.response.status === 409) {
                    alert('Ein Benutzer mit dieser E-Mail-Adresse existiert bereits.');
                } else {
                    alert('Ups, da hat was nicht geklappt :(');
                }
            }
        },
        switchMode() {
            this.loginMode = !this.loginMode;
        }
    }
};
</script>
  