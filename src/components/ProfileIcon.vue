<template>
  <div>
    <v-btn v-if="currentUser" flat icon>
      <v-icon>fas fa-user</v-icon>
    </v-btn>
    <v-btn v-if="!currentUser" flat icon>
      <v-icon>fas fa-sign-in-alt</v-icon>
    </v-btn>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  name: "ProfileIcon",
  props: {
    user: {
      type: Object,
      default: null
    }
  },
  computed: {
    ...mapGetters(["currentUser"])
  }
};
</script>

