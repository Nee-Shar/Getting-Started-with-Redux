"use client";
import List from "./components/List";
import Navbar from "./components/Navbar";
import { Provider } from "react-redux";
import { store } from "./ReduxRelated/store";
export default function Home() {
  return (
    <>
      <Provider store={store}>
        <Navbar />
        <List />
      </Provider>
    </>
  );
}
