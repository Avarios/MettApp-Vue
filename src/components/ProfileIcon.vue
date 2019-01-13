<template>
  <div>
    <v-menu offset-y v-if="user">
      <v-btn slot="activator" icon>
        <v-avatar size="40" color="grey lighten-4">
          <v-img v-bind:src="photo"></v-img>
        </v-avatar>
      </v-btn>
      <v-list>
        <v-list-tile @click="logOut">
          <v-list-tile-title>Logout
            <v-icon>fas fa-sign-out-alt</v-icon>
          </v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>

    <v-btn v-if="!user" flat icon>
      <v-icon>fas fa-sign-in-alt</v-icon>
    </v-btn>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "ProfileIcon",
  methods: {
    logOut() {
      this.$store.dispatch('logOut');
    }
  },
  computed: {
    user() {
      return this.$store.getters.user ? this.$store.getters.user : null;
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

