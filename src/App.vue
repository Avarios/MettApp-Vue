<template>
  <div class="md-layout md-gutter md-alignment-center">
    <Toolbar />
    <EventList />
    <Login />
    <add-button />
  </div>
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
