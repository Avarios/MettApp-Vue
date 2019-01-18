<template>
  <div>liste</div>
</template>

<script>
  export default {
    computed: {
    user() {
      return this.$store.getters.user
    }
  }
  }
</script>

<style>

</style>
