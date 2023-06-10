<template>
  <div>
    <v-table density="compact">
      <thead class="table-header">
        <tr>
          <th class="text-left">Token name</th>
          <th class="text-left">Token value</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in selectedDocument.dynamicContents" :key="item.id" class="table-row">
          <td>{{ item.tokenName }}</td>
          <td style="width: 100%">
            <v-text-field
              variant="underlined"
              v-model="item.tokenValue"
              @focus="storeOriginalValue(item.tokenValue)"
              @blur="reportChange(item.tokenValue)"
            ></v-text-field>
          </td>
        </tr>
      </tbody>
    </v-table>
  </div>
</template>

<style scoped>
.table-header {
  background-color: #c8e6c9;
}

.table-row {
  background-color: #e8f5e9;
}
</style>

<script>
import { mapGetters } from "vuex";
export default {
  name: "dynamic-content-map",
  data() {
    return {
      originalValue: null,
    };
  },
  computed: {
    ...mapGetters(["selectedDocument"]),
  },
  methods: {
    storeOriginalValue(value) {
      this.originalValue = value;
    },
    reportChange(value) {
      if (value !== this.originalValue) {
        this.$emit("dynamic-contents-changed", this.selectedDocument.dynamicContents);
      }
    },
  },
};
</script>

