<template>
    <v-navigation-drawer       
        rail
        permanent
        location="start"
        theme="dark"
        >
        <v-list>
          <v-list-item
            :prepend-icon="loggedIn"
            @click="openUserDetails()"
          ></v-list-item>
        </v-list>
        <v-divider></v-divider>
        <v-list >
            <v-list-item 
                v-for="item in items" 
                :key="item.title" 
                :to="item.to"
                :prepend-icon="item.icon"
                >
                <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
    <v-dialog v-model="showUserDetails" width="500">
        <v-card>

            <v-toolbar
              color="green-lighten-1"
              title="User details"
              >
              <template v-slot:append>

                <v-icon @click="logout()">
                    mdi-logout
                </v-icon>


              </template>
            </v-toolbar>
            <v-card-text>
              <div>{{userEmail}}</div>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>
  
<script>
import jwtDecode from 'jwt-decode'

export default {
    name: "nav-bar",
    data() {
        return {
            showUserDetails: false,
            userEmail: "",
            items: [
                {
                    title: 'Templates',
                    icon: 'mdi-mirror-rectangle',
                    to:'/templates'
                },
                {
                    title: 'Projects',
                    icon: 'mdi-folder-plus-outline',
                    to:'/projects'
                },
            ],
        };
    },
    methods: {
        openUserDetails(){
            let token = this.$store.getters.accessToken;
            if(token === null){ return }

            this.showUserDetails = true
            let decodedToken = jwtDecode(token);
            this.userEmail = decodedToken.sub;
        },
        logout(){
            this.$store.dispatch('logout')
            this.showUserDetails = false;
            this.$router.push('/auth');
        }
    },
    computed: {
        loggedIn() {
            return this.$store.getters.accessToken ? 'mdi-account-check' : 'mdi-account-alert';
        },
    },
};
</script>
  