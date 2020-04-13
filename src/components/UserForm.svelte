<script>
  import TextInput from './TextInput.svelte';
  import { createEventDispatcher } from 'svelte';

  export let errors;

  let name = '';
  let surname = '';
  let email = '';

  let nameInvalid = false;
  let surnameInvalid = false;
  let emailInvalid = false;

  $: formInvalid = nameInvalid || surnameInvalid || emailInvalid;

  const dispatch = createEventDispatcher();

  const submitForm = () => {
    dispatch('userFormSubmitted', { user: { name, surname, email } });
  }
</script>

<div class="row">
  <div class="col-12">
    <form on:submit|preventDefault={submitForm}>
      <TextInput labelText="Name" labelFor="name" bind:value={name} error={errors.name} bind:isInvalid={nameInvalid} />
      <TextInput labelText="Surname" labelFor="surname" bind:value={surname} error={errors.surname} bind:isInvalid={surnameInvalid} />
      <TextInput labelText="Email" labelFor="email" bind:value={email} error={errors.email} bind:isInvalid={emailInvalid} />
      <div class="row">
        <div class="col-12">
          <input class="button-primary" type="submit" value="Submit" disabled={formInvalid}>
        </div>
      </div>
  </form>
  </div>
</div>