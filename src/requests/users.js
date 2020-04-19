import { simpleFetch, advancedFetch, backendUrl, endpointUrl } from './index';

const usersPath = () => 'users/';
const userPath = id => `${usersPath()}${id}`;
const userCreatePath = usersPath;
const userDeletePath = userPath;
const userUpdatePath = userPath;

const optsFactory = (req, method) => ({
  method,
  ...(req ? { body: JSON.stringify(req) } : {})
});

const postOpts = req => optsFactory(req, 'POST');
const putOpts = req => optsFactory(req, 'PUT');
const deleteOpts = () => optsFactory(null, 'DELETE');

export const getUsers = (fetchFn) => simpleFetch(fetchFn, endpointUrl(usersPath()));
export const getUser = (fetchFn, id) => simpleFetch(fetchFn, endpointUrl(userPath(id)));

export const postUser = (fetchFn, data) => advancedFetch(fetchFn, endpointUrl(userCreatePath()), postOpts(data));
export const putUser = (fetchFn, data, id) => advancedFetch(fetchFn, endpointUrl(userUpdatePath(id)), putOpts(data));
export const deleteUser = (fetchFn, id) => advancedFetch(fetchFn, endpointUrl(userDeletePath(id)), deleteOpts());
