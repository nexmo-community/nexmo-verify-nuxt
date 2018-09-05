<template>
  <div class="row center-align">
    <h1>Secret</h1>
    <button v-on:click.stop.prevent="logout" class="waves-effect waves-light btn"><i class="material-icons left">account_box</i>Logout</button>
  </div>
</template>

<script>
export default {
  middleware: 'check_auth',

  methods: {
    logout: function() {
      localStorage.removeItem('nexmo_verify');
      this.$store.commit('INVALIDATE_TOKEN');
      this.$nuxt.$router.replace({ path: '/' });
    }
  }
};
</script>
