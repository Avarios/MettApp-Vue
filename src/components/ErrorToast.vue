<template>
  <md-snackbar
      md-position="center"
      :md-active="error"
      md-persistent
    >
      <span>An error occured: {{ errorMessage }}</span>
      <md-button
        class="md-primary"
        @click="closeError"
      >
        <md-icon>close</md-icon>
      </md-button>
    </md-snackbar>
</template>
<script>
export default {
  name: "ErrorComponent",
  data: () => ({
      showSnackbar: false
  }),
  methods: {
      closeError: function() {
          this.$store.commit('deleteError');
      }
  },
  computed: {
    error() {
      return !!this.$store.getters.error;
    },
    errorMessage() {
      return this.$store.getters.error;
    }
  }
};
</script>

