<template>
  <div>
    <div
      v-for="(item, index) in events"
      :key="item.id"
      class="md-row card_margin"
    >
      <md-card :class="getCardCss(index)">
        <md-ripple>
          <md-card-header>
            <div class="md-title">
              Event at {{ item.date }}
            </div>
            <div class="md-subhead">
              Host: {{ item.name }}
            </div>
          </md-card-header>

          <md-card-content>YOU ARE NOT SUBSCRIBED</md-card-content>

          <md-card-actions>
            <md-button
              v-if="canBeDeleted(item)"
              class="md-accent md-raised"
              @click="deleteEvent(item.id)"
            >
              <md-icon>remove</md-icon>
              Delete
            </md-button>
            <md-button>Subscribe</md-button>
            <md-button>Unscribe</md-button>
          </md-card-actions>
        </md-ripple>
      </md-card>
      <md-divider />
    </div>
  </div>
</template>

<script>
//import { mapActions } from 'vuex';
export default {
  computed: {
    events() {
      return this.$store.state.events;
    }
  },
  methods: {
    getCardCss: function(index) {
      return index % 2 === 0 ? "md-primary" : "";
    },
    deleteEvent: function(id) {
        this.$store.dispatch('deleteEvent',id);
    },
    canBeDeleted: function (item) {
      return this.$store.state.isAdmin && this.$store.state.user.uid === item.host.id;
    }
  }
};
</script>

<style>
</style>
