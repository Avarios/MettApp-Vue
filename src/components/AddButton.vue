<template>
  <md-button
    class="md-fab md-primary md-fab-bottom-center"
    @click="setLoading"
  >
    <md-icon>home</md-icon>
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
  methods: {
    
  }
};
</script>

