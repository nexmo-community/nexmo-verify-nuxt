<template>
  <div>
    <div class="row">
      <div class="col s12 center-align">
        <h1><i class="medium material-icons">verified_user</i> Login</h1>
      </div>
    </div>
    <div class="row" v-if="request.token === ''">
      <form v-on:submit.prevent class="col s12">
      <div class="row center-align">
        <div class="input-field col s12">
          <i class="material-icons prefix">phone</i>
          <input type="text" id="phoneNumber" v-model="phoneNumber"/>
          <label for="phoneNumber"> Phone Number</label>
        </div>
        <div class="row center-align">
          <button v-on:click.stop.prevent="sendVerificationCode" type="submit" class="waves-effect waves-light btn"><i class="material-icons left">account_box</i>Send me a verifiation code</button>
        </div>
      </div>
    </form>
    </div>
    <div class="row" v-else>
      <form v-on:submit.prevent class="col s12">
        <div class="row center-align">
          <div class="input-field col s12">
            <i class="material-icons prefix">sms</i>
            <input type="text" id="verificationPin" v-model="request.verificationPin"/>
            <label for="verificationPin"> Enter the pin you were sent</label>
          </div>
          <div class="row center-align">
            <button v-on:click.stop.prevent="verifyPin" type="submit" class="waves-effect waves-light btn"><i class="material-icons left">account_box</i>Verify me</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import axios from 'axios';

export default {
  data() {
    return {
      phoneNumber: '',
      request: {
        token: '',
        verificationPin: ''
      }
    };
  },

  methods: {
    displayMessage: function(type, message) {
      if (type === 'error') {
        M.toast({
          html: `${message}`,
          classes: 'rounded red accent-1',
          displayTime: 3000
        });
      }
    },

    verifyPin: async function() {
      const { data } = await axios.post('/verification/verify', {
        token: this.request.token,
        code: this.request.verificationPin
      });

      if (!data.token) {
        this.displayMessage('error', data.error_text || data.error);
      } else {
        const { token } = data;
        this.$store.commit('SET_TOKEN', token);
        this.$nuxt.$router.replace({ path: '/secret' });
      }
    },

    sendVerificationCode: async function() {
      const { data } = await axios.post('/verification/send', {
        phoneNumber: this.phoneNumber
      });

      if (!data.token) {
        this.displayMessage('error', data.error_text || data.error);
      } else {
        const { token } = data;
        this.request.token = token;
      }
    }
  }
};
</script>