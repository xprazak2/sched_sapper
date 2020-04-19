<script>
  import { createEventDispatcher } from 'svelte';

  export let show;
  export let cancelPath;
  export let submitEvent;

  const dispatch = createEventDispatcher();

  const hide = () => show = false;

  const onSubmit = () => dispatch(submitEvent);
</script>

<div class="modal" class:shown={show}>
  <a href={cancelPath} on:click={hide} class="modal-overlay close-btn" aria-label="Close">X</a>
  <div class="modal-content" role="document">
    <div class="modal-header">
      <a href={cancelPath} on:click={hide} class="u-pull-right" aria-label="Close"><span class="icon"><i class="fa fa-wrapper fa-times"></i></span></a>
      <div class="modal-title">
        <slot name="modalTitle"></slot>
      </div>
    </div>
    <div class="modal-body">
        <slot></slot>
    </div>
    <div class="modal-footer">
      <div class="u-flex">
        <div class="level-left level-content">
          <button on:click={hide} class="btn-small">Cancel</button>
        </div>
        <div class="level-right level-content">
          <button on:click={onSubmit} class="btn-small btn-link">Submit</button>
        </div>
      </div>
    </div>
  </div>
</div>

