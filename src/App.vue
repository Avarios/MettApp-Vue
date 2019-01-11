<template>
  <v-app>
    <Toolbar />

    <v-content>
      <EventList />
      <Login />
      <add-button />
    </v-content>
  </v-app>
</template>

<script>

import EventList from './components/EventList'
import Toolbar from './components/Toolbar';
import AddButton from './components/AddButton';
import Login from './components/Login';

export default {
  name: 'App',
  components: {
    EventList,
    Toolbar,
    AddButton,
    Login
  }
}
</script>
