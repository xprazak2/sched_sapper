<svelte:head>
  <title>Users</title>
</svelte:head>

<script context="module">
  export function preload({ params, query }) {
    // error handling!
    return this.fetch('http://localhost:8080/users/').then(res => res.json()).then(json => ({ users: json.users }));
  }
</script>

<style>
  .btn-action {
    display: inline-block;
    margin-bottom: 0;
    padding: 0.2rem 0.6rem;
  }
</style>

<script>
  import { goto } from '@sapper/app';
  import toastsStore from '../../stores/ToastsStore';
  import Modal from '../../components/Modal';

  export let users = [];

  const fullName = (user) => `${user.name} ${user.surname}`;

  let userToDelete = {};
  let showDeleteModal = false;
  let deleteUserEvent = 'submitDeleteUser';

  const submitDelete = () => {
    fetch(`http://localhost:8080/users/${userToDelete.id}`, {
      method: 'DELETE'
    }).then(res => {
      return res.json().then(data => ({ data, status: res.status, ok: res.ok, statusText: res.statusText }));
    }).then((trans) => {
        console.log(trans)
        if (trans.ok) {
          toastsStore.setToast({ show: true, toastText: 'User successfully deleted, happy now?' });
          users = users.filter(user => user.id !== userToDelete.id)
          goto('/users/');
        } else {
          if (trans.data.error) {
            toastsStore.setToast({ show: true, toastText: trans.data.error, toastType: 'toast--error' });
          } else if (trans.data.validationError) {
            validationErrors = trans.data.validationError;
          } else {
            toastsStore.setToast({ show: true, toastText: 'Unknown error when deleting user', toastType: 'toast--error' });
          }
        }

      }).catch(err => toastsStore.setToast({ show: true, toastText: `Request failed: ${err}` }))
      .then(() => showDeleteModal = false);
  }

  const setShowDeleteModal = (user) => {
    userToDelete = user;
    showDeleteModal = true;
  }

</script>

<Modal
  bind:show={showDeleteModal}
  cancelPath='users'
  submitEvent={deleteUserEvent}
  on:submitDeleteUser={submitDelete}
>
  <p>You are about to delete {fullName(userToDelete)}. Are you sure?</p>
  <span slot='modalTitle'>Confirm Delete Action</span>
</Modal>

<div class="row">
  <div class="col-2 offset-10">
    <a class="btn" href="users/new">New User</a>
  </div>
</div>
<div class="row">
  <table class="table">
  <thead>
    <tr>
      <th>Full Name</th>
      <th>Email</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    {#each users as user (user.id) }
    <tr>
      <td><a rel="prefetch" href="users/{user.id}">{fullName(user)}</a></td>
      <td>{user.email}</td>
      <td><a href="users" class="btn btn-action" on:click={() => setShowDeleteModal(user)}>Delete</a></td>
    </tr>
    {/each}
  </tbody>
</table>

</div>
