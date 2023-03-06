import React from "react";
import style from "./index.module.css";
import dayjs from "dayjs";
export default function TimeLIneModule(props) {
  const selecetor = JSON.parse(sessionStorage.getItem("selecetor"));
  return (
    <div className={style["time-line"]}>
      <div>
        <p>
          {selecetor.data.jointResult?.transLineList[0].transNodeList[0].arr}
        </p>
        <p>
          {
            selecetor.data.jointResult?.transLineList[0].transNodeList[0]
              .arrTime
          }
        </p>
        <p>
          {dayjs(
            selecetor.data.jointResult?.transLineList[0].transNodeList[0].date
          ).format("MM-DD")}
          {dayjs(
            selecetor.data.jointResult?.transLineList[0].transNodeList[0].date
          )
            .locale("zh-cn")
            .format("ddd")}
        </p>
      </div>
      <div>
        <p>
          {
            selecetor.data.jointResult?.transLineList[0].transNodeList[0]
              .trainNo
          }
        </p>

        {props.children}
      </div>
      <div>
        <p>
          {selecetor.data.jointResult?.transLineList[0].transNodeList[1].arr}
        </p>
        <p>
          {
            selecetor.data.jointResult?.transLineList[0].transNodeList[1]
              .arrTime
          }
        </p>
        <p>
          {dayjs(
            selecetor.data.jointResult?.transLineList[0].transNodeList[1].date
          ).format("MM-DD")}
          {dayjs(
            selecetor.data.jointResult?.transLineList[0].transNodeList[1].date
          )
            .locale("zh-cn")
            .format("ddd")}
        </p>
      </div>
    </div>
  );
}
