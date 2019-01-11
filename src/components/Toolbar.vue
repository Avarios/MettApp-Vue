<template>
  <v-toolbar>
    <v-toolbar-side-icon />
    <v-toolbar-title>Mett App</v-toolbar-title>
    <v-spacer />
    <v-toolbar-items class="hidden-sm-and-down" />
    <Profile />
  </v-toolbar>
</template>
<script>
import Profile from './ProfileIcon';

export default {
  name:'Toolbar',
  components:{
    Profile
  }
}
</script>
