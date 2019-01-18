<template>
  <md-button class="md-fab md-primary md-fab-bottom-center">
    <md-icon>home</md-icon>
  </md-button>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  name: "AddButton",
  computed: {
    ...mapGetters(["isAdmin"])
  }
};
</script>

