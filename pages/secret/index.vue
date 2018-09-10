<template>
  <div>
    <div class="row center-align blue lighten-2 mt-2">
      <img src="https://www.nexmo.com/wp-content/uploads/2018/02/logo-768x124.png"/>
    </div>
    <div class="row center-align">
      <h1>Secret Area</h1>
      <p class="flow-text">You get to see this because you've been verified by Nexmo Verify!</p>
      <img src="@/assets/images/blt.jpg"/>
    </div>
    <div class="row center-align">
      <button v-on:click.stop.prevent="logout" class="waves-effect waves-light btn red"><i class="material-icons left">account_box</i>Logout</button>
    </div>
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

<style scoped>
.mt2 {
  margin-top: 20px;
}
</style>
