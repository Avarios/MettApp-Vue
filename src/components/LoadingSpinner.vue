<template>
  <div
    v-if="loading"
    class="loading-overlay loading"
  >
    <md-progress-spinner
      md-mode="indeterminate"
      :md-stroke="6"
    />
  </div>
</template>

<script>
    export default {
        name: "LoadingSpinner",
        computed: {
            loading() {
                return this.$store.state.isLoading;
            }
        }
    }
</script>

<style scoped>
    .loading {
        position: fixed;
        z-index: 999;
        height: 2em;
        width: 2em;
        overflow: visible;
        margin: auto;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
    }
    .loading:before {
        content: '';
        display: block;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,0.3);
    }
</style>