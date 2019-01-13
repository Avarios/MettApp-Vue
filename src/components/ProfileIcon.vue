<template>
  <div>
    <v-btn icon>
      <v-avatar size="40" color="grey lighten-4">
        <v-img v-bind:src="photo"></v-img>
      </v-avatar>
    </v-btn>

    <v-btn v-if="!user" flat icon>
      <v-icon>fas fa-sign-in-alt</v-icon>
    </v-btn>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  name: "ProfileIcon",
  computed: {
    user() {
      return this.$store.getters.user;
    },
    photo() {
      return this.$store.getters.user
        ? this.$store.getters.user.photoUrl
          ? this.$store.getters.user.photoUrl
          : "https://vuetifyjs.com/apple-touch-icon-180x180.png"
        : "https://vuetifyjs.com/apple-touch-icon-180x180.png";
    }
  }
};
</script>

