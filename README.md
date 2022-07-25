# @fifi98/next-redux

> Package for setting up Redux with Next.js with ease.

This package is inspired by [next-redux-wrapper](https://github.com/kirill-konshin/next-redux-wrapper) but with a few key features in mind:

- 🔥 super easy to setup
- 📦 very lightweight

# What is it used for?

> Sometimes you might want to fetch data in your Next.js application server-side using one of Next's data fetching methods (`getInitialProps`, `getServerSideProps` or `getStaticProps`). By doing that you also might want to preload that fetched data server-side directly to your Redux store. This package makes it super easy to do exactly that!

# How does it work?

> You will have a server side instance of your Redux store on which you can dispatch actions. **Redux's job on the server side is to provide the initial state of our app.** That server side store will than be passed to the client side and will hydrate the client side store with your server side data - all that without a delay or flicker on the UI which usually occurs if you are hydrating your client side store by dispatching an action in useEffect hook.

# 🛠️ Installation

```bash
yarn add @fifi98/next-redux react-redux
```

# 👨‍💻 Usage

First create your Redux store, for example in `store.ts` file.

```typescript
import { AnyAction, combineReducers, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { HYDRATE } from "@fifi98/next-redux";

import facts from "./facts";

const combinedReducer = combineReducers({ facts });

const reducer = (state: ReturnType<typeof combinedReducer> | undefined, action: AnyAction): ReturnType<typeof combinedReducer> => {
  if (action.type === HYDRATE) {
    return { ...state, ...action.payload };
  } else {
    return combinedReducer(state, action);
  }
};

export const store = configureStore({ reducer });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
```

The next step is to wrap your `_app.tsx` with the `StoreProvider` component which accepts two props - `store` which we created in the previous step and `state` - the data which is going to be passed from your server side data fetching methods.

```typescript
import { store } from "../store";

import { StoreProvider } from "@fifi98/next-redux";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <StoreProvider store={store} state={pageProps.state}>
      <Component {...pageProps} />
    </StoreProvider>
  );
}
```

## getInitialProps

```typescript
import { createStore } from "@fifi98/next-redux";

MyApp.getInitialProps = async (): Promise<AppInitialProps> => {
  const { getState, dispatch } = createStore(store);

  const data = await fetch("https://catfact.ninja/fact").then((r) => r.json());

  dispatch(setFact(data.fact));

  return {
    pageProps: {
      state: getState(),
    },
  };
};
```

## getServerSideProps

```typescript
import { createStore } from "@fifi98/next-redux";

export const getServerSideProps: GetServerSideProps = async () => {
  const { getState, dispatch } = createStore(store);

  const data = await fetch("https://catfact.ninja/fact").then((r) => r.json());

  dispatch(setFact(data.fact));

  return {
    props: {
      state: getState(),
    },
  };
};
```

## getStaticProps

```typescript
import { createStore } from "@fifi98/next-redux";

export const getStaticProps: GetStaticProps = async () => {
  const { getState, dispatch } = createStore(store);

  const data = await fetch("https://catfact.ninja/fact").then((r) => r.json());

  dispatch(setFact(data.fact));

  return {
    props: {
      state: getState(),
    },
  };
};
```

# 🎥 Demo

The demo app is available in the `demo` folder
