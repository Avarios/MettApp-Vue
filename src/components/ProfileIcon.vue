<template>
  <md-avatar>
    <img
      :src="photo"
      alt="Avatar"
    >
  </md-avatar>
</template>
<script>

export default {
  name: "ProfileIcon",
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
  },
  methods: {
    logOut() {
      this.$store.dispatch('logOut');
    }
  }
};
</script>

