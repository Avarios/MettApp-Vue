<template>
  <md-toolbar class="md-primary">
    <div class="md-toolbar-row">
      <div class="md-toolbar-section-start">
        <h3 class="md-title">
          Mett App
        </h3>
      </div>
      <div class="md-toolbar-section-end">
        <md-button class="md-just-icon md-simple md-toolbar-toggle">
          <span class="icon-bar" />
          <span class="icon-bar" />
          <span class="icon-bar" />
        </md-button>

        <div class="md-collapse">
          <Profile />
        </div>
      </div>
    </div>
  </md-toolbar>
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
