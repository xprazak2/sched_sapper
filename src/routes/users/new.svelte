<script>
  import { goto } from '@sapper/app';
  import UserForm from '../../components/UserForm.svelte';
  import toastsStore from '../../stores/ToastsStore';

  let validationErrors = {};

  const onSubmit = (payload) => {
    validationErrors = {};
    const req = payload.detail
    fetch('http://localhost:8080/users/', {
      method: 'POST',
      body: JSON.stringify(req),
    }).then(res => {
      return res.json().then(data => ({ data, status: res.status, ok: res.ok, statusText: res.statusText }));
    })
      .then((trans) => {
        if (trans.ok) {
          toastsStore.setToast({ show: true, toastText: 'User successfully created!' });
          goto('/users/');
        } else {
          if (trans.data.error) {
            toastsStore.setToast({ show: true, toastText: trans.data.error, toastType: 'toast--error' });
          } else if (trans.data.validationError) {
            validationErrors = trans.data.validationError;
          } else {
            toastsStore.setToast({ show: true, toastText: 'Unknown error when submitting user', toastType: 'toast--error' });
          }
        }
      }).catch(err => toastsStore.setToast({ show: true, toastText: `Request failed: ${err}` }));
  }
</script>

<div class="row">
  <div class="col-12">
    <h1>Create new user</h1>
  </div>
</div>

<UserForm on:userFormSubmitted={onSubmit} errors={validationErrors} />

