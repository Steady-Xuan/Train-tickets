import React, { useMemo, useCallback } from "react";

/* 
    useMemo函数里面返回一个函数则可以简写成useCallBack
    useMemo主要是解决页面更新效率问题

*/
export default function Test() {
  return <div>useMemo_useCallBack</div>;
}
