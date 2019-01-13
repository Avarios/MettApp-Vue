<template>
  <v-dialog v-model="user" persistent>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-card class="elevation-12">
            <v-toolbar dark color="primary">
              <v-toolbar-title>Login</v-toolbar-title>
              <v-spacer/>
            </v-toolbar>
            <v-card-text>
              <v-form>
                <v-text-field prepend-icon="fas fa-user" name="login" label="Login" type="text"/>
                <v-text-field
                  id="password"
                  prepend-icon="fas fa-lock"
                  name="password"
                  label="Password"
                  type="password"
                />
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-btn color="primary">Login</v-btn>
              <v-btn icon v-on:click="loginSocial('google')">
                <v-icon>fas fa-google</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-dialog>
</template>
<script>
import { mapActions } from "vuex";
export default {
  name: "Login",
  methods: {
    ...mapActions(["loginSocial"])
  },
  computed: {
    show() {
      return !this.$store.getters.user
    }
  }
};
</script>

