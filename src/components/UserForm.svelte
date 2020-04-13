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

  let nameTouched = false;
  let surnameTouched = false;
  let emailTouched = false;

  let formInvalid;
  let formTouched;

  $: {
    formInvalid = nameInvalid || surnameInvalid || emailInvalid;
    formTouched = nameTouched || surnameTouched || emailTouched;
  }

  const dispatch = createEventDispatcher();

  const submitForm = () => {
    dispatch('userFormSubmitted', { user: { name, surname, email } });
    nameTouched = false;
    surnameTouched = false;
    emailTouched = false;
  }
</script>

<div class="row">
  <div class="col-12">
    <form on:submit|preventDefault={submitForm}>
      <TextInput
        labelText="Name"
        labelFor="name"
        bind:value={name}
        error={errors.name}
        bind:isInvalid={nameInvalid}
        bind:touched={nameTouched}
      />
      <TextInput
        labelText="Surname"
        labelFor="surname"
        bind:value={surname}
        error={errors.surname}
        bind:isInvalid={surnameInvalid}
        bind:touched={surnameTouched} />
      <TextInput
        labelText="Email"
        labelFor="email"
        bind:value={email}
        error={errors.email}
        bind:isInvalid={emailInvalid}
        bind:touched={emailTouched}
      />
      <div class="row">
        <div class="col-12">
          <input class="button-primary" type="submit" value="Submit" disabled={formInvalid}>
        </div>
      </div>
  </form>
  </div>
</div>