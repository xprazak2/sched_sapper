import { protocol, host, port } from './backend';

export const backendUrl = () => `${protocol}://${host}:${port}`;

export const endpointUrl = path => `${backendUrl()}/${path}`

export const simpleFetch = (fetchFn, url) => fetchFn(url).then(res => res.json());

export const advancedFetch = (fetchFn, url, opts = {}) => {
   return fetchFn(url, opts)
    .then(res => res.json().then(data => ({ data, status: res.status, ok: res.ok, statusText: res.statusText })));
}
