<script context="module">
  export async function preload({ params }) {
    // error handling
    return await this.fetch(`http://localhost:8080/users/${params.id}`).then(res => res.json());
  }
</script>

<svelte:head>
  <title>User detail</title>
</svelte:head>

<script>
  export let user;
</script>

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
