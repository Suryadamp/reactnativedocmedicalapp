import store from '../state';

export const UsePermission = (permission: string) => {
  const currentState = store.getState();
  const permissions = currentState?.users?.permissions;
  return permissions?.includes(permission);
};
