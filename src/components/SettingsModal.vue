<template>
  <div>
    <md-dialog :md-active="show">
      <md-dialog-title>Bitte Daten ändern</md-dialog-title>
      <md-dialog-content>
        <div class="md-layout-item">
          <md-field>
            <label>Change your Location</label>
            <md-select name="font" id="font" v-model="tenant">
              <md-option v-for="item in tenants" :value="item.key" :key="item.key">{{ item.value}}</md-option>
            </md-select>
          </md-field>
          <md-divider></md-divider>
          <md-field :v-if="isAdmin">
            <label>Paypal Link</label>
            <md-input v-model="paypal"></md-input>
            <span class="md-helper-text">Input your Paypallink here</span>
            <span class="md-error">There is an error</span>
          </md-field>
        </div>
      </md-dialog-content>
      <md-dialog-actions>
        <md-button class="md-accent" @click="saveData">Save</md-button>
        <md-button @click="onClose">Close</md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>
<script>
import { find } from "lodash-es";

export default {
  name: "SettingsModalComponent",
  props: {
    show: Boolean,
    onClose: Function
  },
  data: function() {
    return {
      selectedTenant: "",
      paypalLink: ""
    };
  },
  computed: {
    tenants() {
      return this.$store.state.tenants;
    },
    showDialog() {
      return this.show || this.$store.state.showTenantDialog;
    },
    isAdmin() {
      return this.$store.getters.isAdmin;
    },
    tenant: {
      get: function() {
        this.selectedTenant = this.$store.getters.selectedTenant;
        return this.$store.getters.selectedTenant;
      },
      set: function(newVal) {
        this.selectedTenant = newVal;
      }
    },
    paypal: {
      get: function() {
        this.paypalLink = this.$store.getters.paypalLink;
        return this.$store.getters.paypalLink;
      },
      set: function(newVal) {
        this.paypalLink = newVal;
      }
    }
  },
  methods: {
    saveData() {
      this.$store.dispatch("setUserData", {
        mail: this.$store.getters.user.mail,
        tenant: this.selectedTenant,
        paypalLink: this.paypalLink
      }).then(result => {
        this.onClose();
      });
    }
  },
  watch: {
    tenant(old, newVal) {},
    paypal(old,newVal) {}
  }
};
</script>
