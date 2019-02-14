<template>
  <div>
    <md-dialog :md-active="showDialog">
      <md-dialog-title>Zuordnung wählen !</md-dialog-title>
      <md-dialog-content>
        <div class="md-layout-item">
          <md-field>
            <md-select name="font" id="font">
              <md-option v-for="item in tenants" value="item.id" :key="item.id">{{ item.name}}</md-option>
            </md-select>
          </md-field>
        </div>
      </md-dialog-content>
      <md-dialog-actions>
        <md-button class="md-accent" @click="saveDate">Save</md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>
<script>
export default {
  name: "TenantComponent",
  data: {
    showDialog: false
  },
  watch: {
    tentantList() {
      
    }
  },
  mounted:function() {
    this.showDialog = this.$store.getters.user && !this.$store.getters.user.tentant;
  },
  computed: {
    tenants() {
      return this.$store.state.tenants;
    },
    showDialog() {
      return this.showDialog;
    }
  }
};
</script>
