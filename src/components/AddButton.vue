<template>
  <md-button v-if="isAdmin"
    class="md-fab md-primary md-fab-bottom-right"
    @click="showDialog = true"
  >
    <md-snackbar
      md-position="center"
      :md-duration="snackbarDuration"
      :md-active.sync="error"
      md-persistent
    >
      <span>An error occured: {{ error }}</span>
      <md-button
        class="md-primary"
        @click="showSnackbar = false"
      >
        Retry
      </md-button>
    </md-snackbar>
    <md-snackbar
      md-position="center"
      :md-duration="snackbarDuration"
      :md-active.sync="isSuccess"
      md-persistent
    >
      <span>The Event has been added</span>
    </md-snackbar>
    <md-icon>add</md-icon>
    <md-dialog :md-active.sync="showDialog">
      <md-dialog-title>Add Event</md-dialog-title>
      <md-datepicker
        v-model="selectedDate"
        :md-open-on-focus="true"
      />
      <md-checkbox v-model="allowPaypal">
        Paypal ?
      </md-checkbox>
      <md-dialog-actions>
        <md-button
          class="md-primary"
          @click="showDialog = false"
        >
          Close
        </md-button>
        <md-button
          class="md-primary"
          @click="saveDate"
        >
          Save
        </md-button>
      </md-dialog-actions>
    </md-dialog>
  </md-button>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "AddButton",
  data: () => ({
    showDialog: false,
    selectedDate: new Date(),
    allowPaypal:false,
    error:undefined,
    isSuccess:false,
    snackbarDuration: 5000
  }),
  computed: {
    user() {
      return this.$store.getters.user;
    },

    ...mapGetters(["isAdmin"])
  },
  methods:{
    saveDate: function () {
      let newEvent = {
        eventDate: this.selectedDate,
        allowPaypal: this.allowPaypal,
        hoster: this.user.name,
        id:this.user.id,
        tenant: this.$store.getters.user.tenant
      };
      this.$store.dispatch('addEvent',newEvent).then(() => {
        this.isSuccess = true;
        this.showDialog = false;
      });
    }
  }
};
</script>

