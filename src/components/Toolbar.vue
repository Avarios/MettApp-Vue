<template>
  <md-toolbar class="md-primary">
    <div class="md-toolbar-row">
      <div class="md-toolbar-section-start">
        <h3 class="md-title">
          Mett App
        </h3>
      </div>
      <div class="md-toolbar-section-end">
        <div class="md-collapse">
          <md-menu
            md-size="medium"
            md-align-trigger
          >
            <md-button
              class="md-icon-button"
              md-menu-trigger
            >
              <md-avatar md-accent>
                <img
                  :src="photo"
                  alt="Avatar"
                >
              </md-avatar>
            </md-button>

            <md-menu-content>
              <md-menu-item @click="logOut">
                <md-icon>logout</md-icon>Logout
              </md-menu-item>
              <md-menu-item @click="onSettingsClicked">
                <md-icon>settings</md-icon>Settings
              </md-menu-item>
            </md-menu-content>
          </md-menu>
        </div>
      </div>
    </div>
  </md-toolbar>
</template>
<script>
export default {
  name: "Toolbar",
  props:{
    onSettingsClicked: {
      type: Function,
      default: null
    }
  },
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
