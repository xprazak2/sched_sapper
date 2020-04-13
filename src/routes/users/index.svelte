<svelte:head>
  <title>Users</title>
</svelte:head>

<script context="module">
  export function preload({ params, query }) {
    // error handling!
    return this.fetch('http://localhost:8080/users/').then(res => res.json()).then(json => ({ users: json.users }));
  }
</script>

<script>
  export let users = [];

  const fullName = (user) => `${user.name} ${user.surname}`;

</script>

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
      <td>Delete</td>
    </tr>
    {/each}
  </tbody>
</table>

</div>
