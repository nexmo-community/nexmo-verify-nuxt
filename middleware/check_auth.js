import axios from 'axios';

export default function({ store, route, redirect }) {
  if (store.getters.isVerified) {
    console.log('Checking in store or cookies');
    const token = store.getters.isVerified;
    axios
      .post('/verification/auth-check', {
        token
      })
      .then(res => {
        const { data } = res;

        if (!data.error_text && data.checks[0].status === 'VALID') {
          console.log('valid, allowing access');
          redirect('/secret');
        } else {
          console.log('invalid, redirecting...');
          redirect('/');
        }
      })
      .catch(err => console.log(err));
  } else {
    console.log('nothing worked so redirecting...');
    redirect('/');
  }
}
