<template>
  <md-button class="md-fab md-primary md-fab-bottom-center" @click="setLoading">
    <md-icon>home</md-icon>
  </md-button>
</template>
<script>
import { mapGetters,mapActions } from "vuex";
export default {
  name: "AddButton",
  computed: {
    ...mapGetters(["isAdmin"])
  },
  methods: {
    ...mapActions({
      setLoading: 'setLoading' // map `this.add()` to `this.$store.dispatch('increment')`
    })
  }
};
</script>

