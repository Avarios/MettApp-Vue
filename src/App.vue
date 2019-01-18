<template>
  <div class="md-layout md-gutter md-alignment-center">
    <Toolbar />
    <EventList />
    <LoadingSpinner />
    <Login />
    <add-button />
  </div>
</template>

<script>

import EventList from './components/EventList'
import Toolbar from './components/Toolbar';
import AddButton from './components/AddButton';
import Login from './components/Login';
import LoadingSpinner from './components/LoadingSpinner';

export default {
  name: 'App',
  components: {
    EventList,
    Toolbar,
    AddButton,
    Login,
    LoadingSpinner
  }
}
</script>
