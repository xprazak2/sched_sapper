<script>
	import Nav from '../components/Nav.svelte';
  import Toast from '../components/Toast.svelte';

  import toastsStore from '../stores/ToastsStore';

	export let segment;

</script>

<Nav {segment}/>

<main class="content">
  <div class="row">
    <div class="col offset-center">
      <Toast toast={$toastsStore} clearToast={toastsStore.deleteToast} />
    </div>
  </div>
	<slot></slot>
</main>