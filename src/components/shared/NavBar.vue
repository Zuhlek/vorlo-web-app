<template>
    <v-navigation-drawer 
        
        app
        rail
        permanent

        theme="dark"
        >

        <v-list>
          <v-list-item
            prepend-icon="mdi-account-circle"
            title="Max Muster"
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
</template>
  
<script>
export default {
    name: "nav-bar",
    data() {
        return {
            items: [
                {
                    title: 'Home',
                    icon: 'mdi-home',
                    to:'/'
                },
                {
                    title: 'Templates',
                    icon: 'mdi-file-document-plus-outline',
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
};
</script>
  