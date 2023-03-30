<template>
    <v-navigation-drawer 
        v-model="$root.drawer"
        expand-on-hover
        rail
        width=200
        theme="dark"
        >
        <v-list >
            <v-list-item v-for="(item, index) in items" 
                :key="index" 
                :prepend-icon="item.icon"
                >
                <router-link class="router-link-item" :to="{ name: item.value }">
                    <v-list-item-title class="list-item-title">{{ item.title }}</v-list-item-title>
                </router-link>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>
  
<style>
.router-link-item{
    text-decoration: none;
}
</style>
<script>
export default {
    name: "nav-bar",
    data() {
        return {
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
  