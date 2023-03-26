<template>
    <v-card class="mx-auto" max-width="448">
        <v-layout>
            <v-app-bar color="primary" density="compact">

                <v-app-bar-title>Vorlo</v-app-bar-title>
                <template v-slot:append>
                    <v-btn icon="mdi-dots-vertical"></v-btn>
                </template>
            </v-app-bar>
            <v-navigation-drawer v-model="drawer" :rail="rail" permanent>
                <v-list>
                    <v-list-item v-for="(item, index) in items" :key="index">
                        <router-link :to="{ name: item.value }">
                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                        </router-link>
                    </v-list-item>
                </v-list>
            </v-navigation-drawer>
        </v-layout>
    </v-card>
</template>

<script>
export default {
    name: 'nav-bar',
    data: () => ({
        items: [
            {
            title: 'Home',
            value: 'home',
            },
            {
            title: 'Templates',
            value: 'templates',
            }
        ]
    }),
}
</script>