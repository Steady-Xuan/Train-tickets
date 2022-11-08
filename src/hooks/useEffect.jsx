import React, { useState, useEffect } from "react";

/* 
    1.useEffect传入两个参数 第一个参数是一个函数，第二参数是一个数组，
        能否组织useEffect的执行取决于第二参数的所有元素时候进行了改变
        且第一个函数能返回一个函数用于清空回调函数的方法相当于类式组件的willUnmount
*/

export default function Test() {
  const [title, setTitle] = useState("react-hooks");
  const [count, setCount] = useState(1);
  const [width, setWidth] = useState();
  const [height, setHeight] = useState();
  useEffect(() => {
    document.title = title;
  });

  useEffect(() => {
    setWidth(document.documentElement.clientWidth);
    setHeight(document.documentElement.clientHeight);
  });

  useEffect(() => {
    document.getElementById("size").addEventListener("click", onClick, false);
    return () => {
      document.getElementById("size").removeEventListener("click", onClick, false);
    };
  });

  const onClick = () => {
    console.log("width");
  };

  return (
    <div>
      <span>count</span>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        change
      </button>
      {count & 2 ? (
        <div id="size">
          width:{width}height:{height}
        </div>
      ) : (
        <p id="size">
          width:{width}height:{height}
        </p>
      )}
    </div>
  );
}
