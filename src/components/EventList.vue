<template>
  <div class="md-column">
    <md-card
      v-for="item in events"
      :key="item.id"
      class="md-primary"
    >
      <md-card-header>
        <md-card-header-text>
          <div class="md-title">
            {{ item.date }}
          </div>
          <div class="md-subhead">
            {{ item.name }}
          </div>
        </md-card-header-text>
      </md-card-header>

      <md-card-actions>
        <md-button>
          Home
          <md-icon>home</md-icon>
        </md-button>
        <md-button>Action</md-button>
      </md-card-actions>
    </md-card>
    <br>
  </div>
</template>

<script>
//import { mapActions } from 'vuex';
export default {
  computed: {
    events() {
      return this.$store.state.events;
    }
  }
};
</script>

<style>
</style>
