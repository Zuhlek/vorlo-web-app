<template>
    <v-card class="mx-auto" max-width="448">
        <v-layout>
            <v-app-bar color="primary">
                <v-app-bar-title>Vorlo</v-app-bar-title>
                <template v-slot:append>
                    <v-btn icon>
                        <v-icon>mdi-dots-vertical</v-icon>
                    </v-btn>
                </template>
            </v-app-bar>
            <v-navigation-drawer v-model="drawer" permanent theme="dark">
                <v-list>
                    <v-list-item v-for="(item, index) in items" :key="index" :prepend-icon="item.icon">
                        <router-link :to="{ name: item.value }">
                            <v-list-item-title>{{ item.title }}</v-list-item-title>
                        </router-link>
                    </v-list-item>
                </v-list>
            </v-navigation-drawer>
        </v-layout>
    </v-card>
</template>

<style>
.v-list-item-title {
    font-weight: bold;
    text-decoration: none;
}
</style>
  
<script>
export default {
    name: "nav-bar",
    data() {
        return {
            drawer: true,
            rail: true,
            items: [
                {
                    title: 'Home',
                    value: 'home',
                    icon: 'mdi-home'
                },
                {
                    title: 'Templates',
                    value: 'templates',
                    icon: 'mdi-file-document-plus-outline'
                },
            ],
        };
    },
};
</script>
  