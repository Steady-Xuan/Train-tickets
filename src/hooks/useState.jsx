import React, { useState } from "react";

export default function Test() {
  const [count, setState] = useState(0);
  const [name, setName] = useState(() => {
    /* 可以传入函数，传入函数之后，useState只调用一次这样可以大大的提高系统性能
        并且初始化的时候越复杂逻辑处理效果越明显
    */
    return {
      newDate: Date.now(),
    };
  });
  return (
    <div>
      <button
        onClick={() => {
          setState(count + 1);
        }}
      >
        change Count
      </button>
      count:{count}
      name:{name.newDate}
    </div>
  );
}
