<template>
  <div>
    <md-dialog :md-active="showDialog">
      <md-dialog-title>How Much Buns do you need ?</md-dialog-title>
      <md-dialog-content>
        <md-divider />
        <div class="md-layout-item">
          <md-field>
            <md-select
              id="font"
              v-model="value"
              name="font"
            >
              <md-option
                v-for="n in 10"
                :key="n"
                :value="n"
              >
                {{ n }}
              </md-option>
            </md-select>
          </md-field>
        </div>
      </md-dialog-content>
      <md-dialog-actions md-alignment="space-between">
        <md-button
          class="md-accent"
          @click="onCancel"
        >
          Cancel
        </md-button>
        <md-button
          class="md-primary"
          :disabled="value <= 0"
          @click="saveData(false)"
        >
          Ok
        </md-button>
        <md-button
          :disabled="value <= 0 || !canbePaidByPaypal"
          @click="saveData(true)"
        >
          <md-icon>payment</md-icon>PayPal
        </md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>
<script>
export default {
  name: "SubscribeComponent",
  props: {
    showDialog: {
      type: Boolean,
      default: false
    },
    onSubmit: {
      type: Function,
      default: null
    },
    event: {
      type: Object,
      default: undefined
    },
    onCancel: {
      type: Function,
      default: undefined
    }
  },
  data: function() {
    return {
      value: 0
    };
  },
  computed: {
    canbePaidByPaypal() {
      return this.event ? (this.event.link ? true : false) : false;
    }
  },
  methods: {
    saveData(withPaypal) {
      if (withPaypal) {
        //TODO: read bun price from database
        window.open(`${this.event.link}/${this.value * 1}`, "_blank");
      }
      this.$store.dispatch("subscribe", {
        id: this.event.id,
        value: this.value,
        name: this.$store.getters.user.name,
        userId: this.$store.getters.user.mail,
        tenant: this.event.tenant
      }).then(() => {
        this.onCancel();
      }).catch(err => {
         this.$store.commit('setError',err); 
      });
    }
  }
};
</script>
