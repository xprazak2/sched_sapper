<script>
  export let labelText;
  export let labelFor;
  export let error;
  export let value;
  export let isInvalid;
  export let touched;

  $: isInvalid = error && !touched;

</script>

<style>
  .errorMsg {
    padding-top: 0.6rem;
    color: #ff7272;
  }

  .hasError input {
    border-color: #ff7272;
  }
</style>

<div class="row">
    <label class="col-12" for={labelFor}>{labelText}</label>
</div>

<div class="row" class:hasError={isInvalid}>
    <div class="col-4">
      <input type="text" name={labelFor} id={labelFor} bind:value on:change={() => touched = true}/>
    </div>
    <span class="errorMsg col-3">{isInvalid ? error : ''}</span>
</div>


