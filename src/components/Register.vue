<template>
  <div>
    <md-dialog :md-active="show">
      <md-dialog-title>Register new Account</md-dialog-title>
      <md-dialog-content>
        <div class="centered-container">
          <div class="form">
            <md-field>
              <label>E-mail</label>
              <md-input
                v-model="login.email"
                autofocus
              />
            </md-field>

            <md-field md-has-password>
              <label>Password</label>
              <md-input
                v-model="login.password"
                type="password"
              />
            </md-field>
            <md-field md-has-password>
              <label>Password</label>
              <md-input
                v-model="login.passwordRepeat"
                type="password"
              />
            </md-field>
          </div>

          <div class="actions md-layout md-alignment-center-space-between">
            <md-button
              :disabled="!canBeRegistered"
              class="md-raised md-primary"
              @click="register"
            >
              Register
            </md-button>
          </div>
        </div>
      </md-dialog-content>
      <md-divider />
      <md-dialog-actions>
        <md-button />
        <md-button />
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>
<script>
export default {
  name: "Register",
  props: {
    show: {
      type: Boolean,
      default: false
    },
    onRegisterComplete: {
        type:Function,
        default:undefined
    }
  },
  data: function() {
    return {
      login: {
        email: "",
        password: "",
        passwordRepeat: ""
      }
    };
  },
  computed: {
    canBeRegistered() {
      if (
        this.login.password === this.login.passwordRepeat &&
        this.login.email.length > 5 && this.login.password.length > 6
      ) {
        return true;
      }
      return false;
    }
  },
  methods: {
    register: function() {
      if (this.login.password === this.login.passwordRepeat) {
        this.$store.dispatch("register", this.login).then(() => {
            this.onRegisterComplete();
        });
      }
    }
  }
};
</script>
