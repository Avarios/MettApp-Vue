<template>
  <md-button class="md-fab md-primary md-fab-bottom-center" @click="showDialog = true">
    <md-icon>home</md-icon>
    <md-dialog :md-active.sync="showDialog">
      <md-dialog-title>Add Event</md-dialog-title>
      <md-datepicker v-model="selectedDate" :md-open-on-focus="true"/>
      <md-checkbox v-model="allowPaypal" >Paypal ?</md-checkbox>
      <md-dialog-actions>
        <md-button class="md-primary" @click="showDialog = false">Close</md-button>
        <md-button class="md-primary" @click="showDialog = false">Save</md-button>
      </md-dialog-actions>
    </md-dialog>
  </md-button>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "AddButton",
  computed: {
    user() {
      return this.$store.getters.user;
    },

    ...mapGetters(["isAdmin"])
  },
  methods:{
    greet: function (event) {
      this.$store.dispatch('addEvent'.{  })
    }
  },
  data: () => ({
    showDialog: false,
    selectedDate: new Date(),
    allowPaypal:false
  })
};
</script>

