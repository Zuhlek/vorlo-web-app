<template>
    <v-app-bar color="green-lighten-1" app>
        <v-app-bar-title>Vorlo</v-app-bar-title>
        <template v-slot:append>
            <v-btn icon>
                <v-icon>mdi-help</v-icon>
            </v-btn>
        </template>
    </v-app-bar>
</template>
  
<script>
export default {
    name: "app-bar",
};
</script>
  