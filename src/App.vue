<template>
  <v-app>
    <Toolbar />

    <v-content>
      <EventList />
    </v-content>
  </v-app>
</template>

<script>
import EventList from './components/EventList'
import Toolbar from './components/Toolbar';

export default {
  name: 'App',
  components: {
    EventList,
    Toolbar
  },
  data () {
    return {
      //
    }
  }
}
</script>
