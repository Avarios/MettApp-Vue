<template>
  <div>
    <md-dialog :md-active="showDialog">
      <md-dialog-title>Zuordnung wählen !</md-dialog-title>
      <md-dialog-content>
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
      <md-dialog-actions>
        <md-button
          class="md-accent"
          @click="saveData"
        >
          Save
        </md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>
<script>
export default {
  name: "SubscribeComponent",
  props:{
   showDialog: {
     type:Boolean,
     default:false
   },
   onSubmit: {
     type: Function,
     default:null
   },
   eventId: {
     type: String,
     default:undefined
   }
  },
  data: function() {
      return {
          value:0
      }
  }
};
</script>
