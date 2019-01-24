<template>
  <div>
    <div
      class="md-layout"
      md-flex-xsmall="100"
      md-flex-small="100"
      md-flex-medium="100"
      md-flex-large="100"
      md-flex-xlarge="100"
    >
      <Toolbar />
    </div>
    <div
      class="md-layout md-alignment-center"
      md-flex-xsmall="100"
      md-flex-small="50"
      md-flex-medium="70"
      md-flex-large="70"
      md-flex-xlarge="70"
    >
      <EventList />
      <LoadingSpinner />
      <Login />
      <add-button />
    </div>
  </div>
</template>

<script>
import EventList from "./components/EventList";
import Toolbar from "./components/Toolbar";
import AddButton from "./components/AddButton";
import Login from "./components/Login";
import LoadingSpinner from "./components/LoadingSpinner";

export default {
  name: "App",
  components: {
    EventList,
    Toolbar,
    AddButton,
    Login,
    LoadingSpinner
  }
};
</script>
