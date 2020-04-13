<script>
  export let toast
  export let clearToast;
</script>

{#if toast.show}
  <div class="toast {toast.toastType}" >
      <button class="btn-close" on:click={clearToast && clearToast()}></button>
      <p>{toast.toastText}</p>
  </div>
{/if}
