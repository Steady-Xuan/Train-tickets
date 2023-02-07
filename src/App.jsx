import React from "react";
import { Route, Routes } from "react-router-dom";
import router from "./router";
import store from "./store";
export default function App() {
  return (
    <div>
      <Routes>
        {router.map((item, index) => {
          return <Route {...item} key={index}></Route>;
        })}
      </Routes>
    </div>
  );
}
