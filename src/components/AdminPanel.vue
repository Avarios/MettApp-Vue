<template>
  <md-dialog :md-active="subscriber.length > 0">
    <md-dialog-title>Subscriber</md-dialog-title>
    <md-dialog-content>
      <md-table>
        <md-table-row v-for="item in subscriber" :key="item.uid">
          <md-table-cell md-label="ID">{{ item.uid }}</md-table-cell>
          <md-table-cell md-label="Value">{{ item.buns }}</md-table-cell>
        </md-table-row>
        <md-table-row>
          <md-table-cell md-label="ID">TOTAL</md-table-cell>
          <md-table-cell md-label="Value">{{ getTotalBuns }}</md-table-cell>
        </md-table-row>
      </md-table>
    </md-dialog-content>
    <md-dialog-actions>
      <md-button md-accent @click="onClose">
        <md-icon>close</md-icon>Close
      </md-button>
    </md-dialog-actions>
  </md-dialog>
</template>

<script>
export default {
  name: "AdminPanel",
  props: {
    subscriber: {
      type: Array,
      default: function() {
        return [];
      }
    },
    onClose: {
      type:Function,
      default:undefined
    }
  },
  computed: {
    getTotalBuns() {
      if (this.subscriber) {
        return this.subscriber.reduce((total , item) => total + item.buns, 0);
      }
      return 0;
    }
  }
};
</script>