<script context="module">
  export async function preload({ params }) {
    // error handling
    return await getUser(this.fetch, params.id);
  }
</script>

<svelte:head>
  <title>User detail</title>
</svelte:head>

<script>
  export let user;
  import { getUser } from '../../requests/users';
</script>

<div class="row">
  <div class="col-2 offset-10">
    <a class="btn" href={`users/${user.id}/edit`}>Edit</a>
  </div>
</div>

<div class="row">
  <div class="col-2">Name:</div>
  <div class="col-10">{user.name}</div>
</div>

<div class="row">
  <div class="col-2">Surame:</div>
  <div class="col-10">{user.surname}</div>
</div>

<div class="row">
  <div class="col-2">Email:</div>
  <div class="col-10">{user.email}</div>
</div>
