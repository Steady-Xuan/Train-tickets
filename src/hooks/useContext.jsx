import React, { useState, useContext, createContext } from "react";

/* 
    1. useContext代替的是contextType,还是需要结合createContext来进行使用
*/

const useContextTest = createContext();

function Bar() {
  const count = useContext(useContextTest);
  return <div>{count}</div>;
}

export default function Test() {
  const [count, setCount] = useState(0);
  return (
    <useContextTest.Provider value={count}>
      <Bar />
    </useContextTest.Provider>
  );
}
