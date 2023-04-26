<template>
    <div>
        <v-table density="compact">
            <thead class="table-header">
                <tr>
                    <th class="text-left">
                        Key
                    </th>
                    <th class="text-left">
                        Value
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in keyValuePairs" :key="item.key" class="table-row">
                    <td>{{ item.key }}</td>
                    <td>
                        <v-text-field variant="underlined" v-model="item.value" @focus="storeOriginalValue(item.value)"
                            @blur="reportChange(item.value)"></v-text-field>

                    </td>
                </tr>
            </tbody>
        </v-table>

    </div>
</template>


<style scoped>
.table-header {
    background-color: #C8E6C9;
}

.table-row {
    background-color: #E8F5E9;
}
</style>


<script>
export default {
    name: 'dynamic-content-map',
    data() {
        return {
            keyValuePairs: null,
            originalValue: null,
        }
    },
    mounted() {
        this.keyValuePairs = Object.entries(this.$store.state.selectedProject.template.contentMap).map(([key, value]) => ({ key, value }));
    },
    methods: {
        storeOriginalValue(value) {
            this.originalValue = value;
        },
        reportChange(value) {
            if (value !== this.originalValue) {
                this.$emit("content-map-changed", this.keyValuePairs);
            }
        },
    },

}
</script>
