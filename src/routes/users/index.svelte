<svelte:head>
  <title>Users</title>
</svelte:head>

<script context="module">
  export function preload({ params, query }) {
    return this.fetch('http://localhost:8080/users').then(res => res.json()).then(json => ({ users: json.users }));
  }
</script>

<script>
  export let users = [];

  const fullName = (user) => `${user.name} ${user.surname}`;

</script>

<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Surname</th>
      <th>Email</th>
    </tr>
  </thead>
  <tbody>
    {#each users as user (user.id) }
    <tr>
      <td>{user.name}</td>
      <td>{user.surname}</td>
      <td>{user.email}</td>
    </tr>
    {/each}
  </tbody>
</table>
