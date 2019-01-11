<template >
  <v-btn v-if="isAdmin" absolute dark fab bottom right color="pink">
    <v-icon>fas fa-plus-circle</v-icon>
  </v-btn>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
    name:'AddButton',
    computed: {
        ...mapGetters([
            'isAdmin'
        ])
    }
}
</script>

