<template>
    <v-app id="inspire">
        <v-main class="grey lighten-3">
            <v-form @submit.prevent="submitForm">
                <v-card>
                    <v-card-text>
                        <v-text-field v-if="!loginMode" v-model="firstName" label="First name" />
                        <v-text-field v-if="!loginMode" v-model="lastName" label="Last name" />
                        <v-text-field v-model="email" label="Email" />
                        <v-text-field v-model="password" label="Password" type="password" />
                    </v-card-text>
                    <v-card-actions>
                        <v-btn type="submit">
                            {{ loginMode ? 'Login' : 'Register' }}
                        </v-btn>
                        <v-btn type="button" @click="switchMode">
                            {{ loginMode ? 'No account yet?' : 'Already got an account?' }}
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-form>
        </v-main>
    </v-app>
</template>
  
<script>
import { mapActions } from 'vuex';

export default {
    name: "auth-view",
    data() {
        return {
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
                if(this.loginMode) {
                    console.log("sending login request: " + this.email + ", " + this.password)
                    await this.login({ email: this.email, password: this.password });
                }else{
                    console.log("sending login request: " + this.firstName + ", "+ this.lastName + ", "+ this.email + ", " + this.password)
                    await this.register({ firstName: this.firstName, lastName: this.lastName, email: this.email, password: this.password });
                }
                this.$router.push('/');
            } catch (error) {
                console.error('Authentifizierungsfehler:', error);
            }
        },
        switchMode() {
            this.loginMode = !this.loginMode;
        }
    }
};
</script>
  