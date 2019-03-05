<template>
  <div>
    <md-dialog :md-active="show">
      <md-dialog-title>Bitte Daten ändern</md-dialog-title>
      <md-dialog-content>
        <div class="md-layout-item">
          <md-field>
            <label>Change your Location</label>
            <md-select
              id="font"
              v-model="selectedTenant"
              name="font"
            >
              <md-option
                v-for="item in tenants"
                :key="item.key"
                :value="item.key"
              >
                {{ item.value }}
              </md-option>
            </md-select>
          </md-field>
          <md-divider />
          <div v-if="isAdmin">
            <md-field>
              <label>Paypal Link</label>
              <md-input v-model="paypalLink" />
              <span class="md-helper-text">
                Input your Paypallink here
              </span>
              <span class="md-error">
                There is an error
              </span>
            </md-field>
            <md-field>
              <label>Bun Price</label>
              <md-input v-model="bunPrice" />€
              <span class="md-helper-text">
                Input the BunPrice here
              </span>
              <span class="md-error">
                There is an error
              </span>
            </md-field>
          </div>
        </div>
      </md-dialog-content>
      <md-dialog-actions>
        <md-button
          class="md-accent"
          @click="saveData"
        >
          Save
        </md-button>
        <md-button @click="onClose">
          Close
        </md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>
<script>
export default {
  name: "SettingsModalComponent",
  props: {
    show: {
      type: Boolean,
      default: false,
      required: true
    },
    onClose: {
      type: Function,
      default: null,
      required: true
    }
  },
  data: function() {
    return {
      selectedTenant: "",
      paypalLink: "",
      bunPrice: undefined
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
    }
  },
  mounted() {
    this.$store.subscribe((mutation, state) => {
      switch (mutation.type) {
        case "setAuthState":
        case "setUserData":
          this.selectedTenant = state.user.tenant;
          this.paypalLink = state.user.paypalLink;
          this.bunPrice = state.user.bunPrice;
          break;
      }
    });
  },
  methods: {
    saveData() {
      let model = {
        mail: this.$store.getters.user.mail,
        tenant: this.selectedTenant
      };
      if (this.paypalLink) {
        model.paypalLink = this.paypalLink;
      }
      if (this.bunPrice) {
        model.bunPrice = this.bunPrice;
      }
      this.$store.dispatch("setUserData", model).then(() => {
        this.onClose();
      });
    }
  }
};
</script>
