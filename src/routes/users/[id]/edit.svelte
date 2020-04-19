<svelte:head>
  <title>Edit { user ? fullName(user) : 'User'}</title>
</svelte:head>

<script context="module">
  export async function preload({ params }) {
    return this.fetch(`http://localhost:8080/users/${params.id}`).then(res => res.json());
  }
</script>

<script>
  export let user;

  import { goto } from '@sapper/app';
  import { fullName } from '../../../helpers/userHelpers';
  import UserForm from '../../../components/UserForm.svelte';
  import toastsStore from '../../../stores/ToastsStore';
  import { putUser } from '../../../requests/users';

  let validationErrors = {};

  const onSubmit = (payload) => {
    validationErrors = {};
    const req = payload.detail
    putUser(fetch, req, req.user.id)
      .then((trans) => {
        if (trans.ok) {
          toastsStore.setToast({ show: true, toastText: 'User successfully updated!' });
          goto('/users/');
        } else {
          if (trans.data.error) {
            toastsStore.setToast({ show: true, toastText: trans.data.error, toastType: 'toast--error' });
          } else if (trans.data.validationError) {
            validationErrors = trans.data.validationError;
          } else {
            toastsStore.setToast({ show: true, toastText: 'Unknown error when updating user', toastType: 'toast--error' });
          }
        }
      }).catch(err => toastsStore.setToast({ show: true, toastText: `Request failed: ${err}` }));
  }


</script>

<div class="row">
  <div class="col-12">
    <h1>Edit User</h1>
  </div>
</div>

<UserForm on:userFormSubmitted={onSubmit} errors={validationErrors} user={user} />

