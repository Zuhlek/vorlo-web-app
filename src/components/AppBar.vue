<template>
    <v-app-bar color="primary">
        <v-app-bar-title>Vorlo</v-app-bar-title>
        <template v-slot:append>
            <v-btn icon>
                <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
        </template>
    </v-app-bar>
</template>
  
<script>
export default {
    name: "app-bar",
};
</script>
  