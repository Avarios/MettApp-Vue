<template>
  <div>
    {{user}}
    <v-btn
      v-if="user" 
      flat 
      icon
    >
      <v-icon>fas fa-user</v-icon>
    </v-btn>
    <v-btn
      v-if="!user" 
      flat 
      icon
    >
      <v-icon>fas fa-sign-in-alt</v-icon>
    </v-btn>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  name: "ProfileIcon",
  computed: {
    ...mapGetters(["user"])
  }
};
</script>

