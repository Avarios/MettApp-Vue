<template>
  <div>
    <div
      class="md-layout md-gutter md-alignment-center"
    >
      <div class="md-layout-item md-xlarge-size-75 md-medium-size-75 md-small-size-100 md-xsmall-size-100">
        <Toolbar />
      </div>
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
      <AddButton />
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
