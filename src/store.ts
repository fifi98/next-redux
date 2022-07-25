import { Store } from "redux";

export const isServer = () => typeof window === "undefined";
export const HYDRATE = "HYDRATE";

let clientStore: any;

export const hydrate = (store: Store, state: any) => {
  if (!state) return;
  store.dispatch({ type: HYDRATE, payload: state });
};

export const initStore = (store: Store) => {
  if (isServer()) return store;

  if (!clientStore) {
    clientStore = store;
  }

  return clientStore;
};

export const createStore = <S>(store: S): S => store;
