<template>

        <v-table density="compact">
            <thead>
                <tr>
                    <th class="text-left">
                        #
                    </th>
                    <th class="text-left">
                        Template name
                    </th>
                    <th class="text-left">
                        Template description
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in templates" :key="item.id">
                    <td>{{ item.id }}</td>
                    <td>{{ item.name }}</td>
                    <td>{{ item.description }}</td>
                </tr>
            </tbody>
        </v-table>
        <br>
        <v-btn variant="tonal" @click="listUploadedTemplates">Load uploaded templates</v-btn>

</template>

<script>
import axios from 'axios'
export default {
    name: 'template-list',
    data() {
        return {
            templates: null,
        }
    },
    methods: {
        listUploadedTemplates() {
            axios.get('http://localhost:8080/template/list')
                .then((res) => {
                    console.log(res);
                    this.templates = res.data.data.templates;
                })
                .catch((error) => {
                    console.error('Error fetching templates:', error);
                });
        }
    }
}
</script>
