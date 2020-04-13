import { writable } from 'svelte/store';

const toast = writable({});

const toastsStore = {
  subscribe: toast.subscribe,
  setToast: (newToast) => toast.set(newToast),
  deleteToast: () => toast.set({}),
};

export default toastsStore;

