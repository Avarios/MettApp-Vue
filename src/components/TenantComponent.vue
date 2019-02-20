<template>
  <div>
    <md-dialog :md-active="showDialog">
      <md-dialog-title>Zuordnung wählen !</md-dialog-title>
      <md-dialog-content>
        <div class="md-layout-item">
          <md-field>
            <md-select name="font" id="font" v-model="selectedTenant">
              <md-option v-for="item in tenants" :value="item.key" :key="item.key">{{ item.value}}</md-option>
            </md-select>
          </md-field>
        </div>
      </md-dialog-content>
      <md-dialog-actions>
        <md-button class="md-accent" @click="saveData">Save</md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>
<script>
export default {
  name: "TenantComponent",
  data: {
    selectedTenant:undefined
  },
  computed: {
    tenants() {
      return this.$store.state.tenants;
    },
    showDialog() {
      return this.$store.state.showTenantDialog
    }
  },
  methods: {
    saveData() {
      this.$store.dispatch('setUserData' , {uid: this.$store.getters.user.id, tenant: this.selectedTenant});
    }
  }
};
</script>
