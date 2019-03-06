<template>
  <div>
    <div
      v-for="(item, index) in events"
      :key="item.id"
      class="md-row card_margin"
    >
      <md-card
        :class="getCardCss(index)"
        md-medium
      >
        <md-ripple>
          <md-card-header>
            <div class="md-title">
              Event at {{ item.date }} <md-icon
                v-if="canBeDeleted(item)"
                class="md-accent"
              >
                info
              </md-icon>
            </div>
            
            <div class="md-subhead">
              Each bun cost {{ bunPrice }} €
            </div>
          </md-card-header>

          <md-card-content>
            <div v-if="isSubscribed(item)">
              You are in with {{ getBuns(item) }} buns <br>
              Total Cost: {{ getBuns(item) * bunPrice }} € <br>
              mhhh this will be a good day
            </div>
            <div v-if="!isSubscribed(item)">
              Oops now fast to get some buns ! YUMMY !
            </div>
          </md-card-content>

          <md-card-actions>
            <md-button
              v-if="canBeDeleted(item)"
              class="md-accent md-raised"
              @click="deleteEvent(item)"
            >
              <md-icon>remove</md-icon>Delete
            </md-button>
            <md-button
              v-if="!isSubscribed(item)"
              @click="openSubscribe(item)"
            >
              <md-icon>check_circle</md-icon>Subscribe
            </md-button>
            <md-button
              v-if="isSubscribed(item)"
              class="md-accent"
              @click="unscribe(item)"
            >
              <md-icon>highlight_off</md-icon>Unscribe
            </md-button>
          </md-card-actions>
        </md-ripple>
      </md-card>
      <md-divider />
    </div>
    <SubscribeComponent
      :show-dialog="selectedEvent !== undefined"
      :event="selectedEvent"
      :on-cancel="closeSubscribe"
    />
  </div>
</template>

<script>
import SubscribeComponent from "./SubscribeComponent";

export default {
  components: {
    SubscribeComponent
  },
  data() {
    return {
      selectedEvent: undefined
    };
  },
  computed: {
    events() {
      return this.$store.state.events;
    },
    bunPrice() {
      return this.$store.getters.user.bunPrice;
    }
  },
  methods: {
    getCardCss: function(index) {
      return index % 2 === 0 ? "md-primary" : "";
    },
    deleteEvent: function(item) {
      this.$store.dispatch("deleteEvent", {id: item.id, tenant: item.tenant});
    },
    canBeDeleted: function(item) {
      return (
        this.$store.state.isAdmin &&
        this.$store.getters.user.mail === item.hostId
      );
    },
    isSubscribed(item) {
      if (!item.subscriber) {
        return false;
      }
      let userId = this.$store.getters.user.mail;
      let index = item.subscriber.findIndex(i => i.uid === userId);
      return index > -1;
    },
    openSubscribe(item) {
      this.selectedEvent = item;
    },
    closeSubscribe() {
      this.selectedEvent = undefined;
    },
    getBuns(item) {
      let userId = this.$store.getters.user.mail;
    
      let subData = item.subscriber.find(i => i.uid === userId);
      if(subData) {
        return subData.buns
      }
      return "0";
    },
    unscribe(item) {
      let subscribeData = item.subscriber.find(
        x => x.uid === this.$store.getters.user.mail
      );
      this.$store
        .dispatch("unscribe", {
          id: item.id,
          name: subscribeData.name,
          userId: subscribeData.uid,
          tenant: item.tenant
        }).then(() => {
          this.$store.commit('setError','Sorry for you, maybe next time')
        })
    }
  }
};
</script>

<style>
</style>
