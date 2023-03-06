import React, { useEffect, useState } from "react";
import Header from "../../common/Header";
import URI from "urijs";
import TimeLIneModule from "../../common/TimeLIneModule";
import style from "./index.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  createSeleted,
  createdTickets,
  createdPerson,
  createdChild,
} from "../../store/action";
import UseSelected from "../../hooks/useSelected";

function Person(props) {
  const { onselected } = props;
  return (
    <div>
      <div className={style["buy-person-ticket"]}>
        <div style={{ color: "red" }}>--删除--</div>
        <div>
          <p>
            <span>姓名</span>
            <input value="" placeholder="乘客姓名"></input>
            <span
              onClick={() => {
                onselected("person");
              }}
            >
              成人票⬇
            </span>
          </p>
          <p>
            <span>身份证</span>
            <input value="" placeholder="证件号码"></input>
          </p>
        </div>
      </div>
    </div>
  );
}
function Child(props) {
  const { onselected } = props;

  return (
    <div>
      <div className={style["buy-person-ticket"]}>
        <div style={{ color: "red" }}>--删除--</div>
        <div>
          <p>
            <span>姓名</span>
            <input value="" placeholder="乘客姓名"></input>
            <span
              onClick={() => {
                onselected("child");
              }}
            >
              儿童票⬇
            </span>
          </p>
          <p>
            <span>性别</span>
            <span>{">"}</span>
          </p>
          <p>
            <span>出生日期</span>
            <input value="" placeholder="证件号码"></input>
          </p>
          <p>
            <span>同行成人</span>
            <input value="" placeholder="证件号码"></input>
          </p>
        </div>
      </div>
    </div>
  );
}
export default function OrderFilling() {
  const [timeLineData, setTimeLineData] = useState({});
  const [isshow, setIsshow] = useState(false);
  const dispatch = useDispatch();
  const store = useSelector((state) => {
    return state;
  });
  useEffect(() => {
    const url = new URI();
    const urlData = url.search(true);
    setTimeLineData(urlData);
  }, []);
  const addPerson = (e) => {
    e.preventDefault();
    dispatch(createSeleted(!isshow));
  };
  const showSeleted = (e) => {
    switch (e) {
      case "ticket":
        dispatch(
          createdTickets([
            {
              label: "商务座",
              value: 1,
            },
            {
              label: "一等座",
              value: 2,
            },
            {
              label: "二等座",
              value: 3,
            },
          ])
        );
        setIsshow(true);
        return;
      case "person":
        dispatch(createdPerson());
        setIsshow(true);
        return;
      case "child":
        dispatch(createdChild());
        dispatch(createdChild());
        return;
      default:
    }
    setTimeout(() => {}, 2000);
  };
  const handleshow = (e) => {
    setIsshow(e);
  };

  return (
    <div>
      <Header title={"订单填写"} isBack={true} />
      <TimeLIneModule>
        {/* <p> {store}</p> */}
        <p>
          耗时
          {timeLineData.c}
        </p>
      </TimeLIneModule>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <div>
          <label style={{ marginRight: "50px" }}>坐席</label>
          <span
            onClick={() => {
              showSeleted("ticket");
            }}
          >
            商务座
          </span>
        </div>
        <label style={{ color: "skyblue" }}>￥748</label>
      </div>
      {isshow && <Person onselected={showSeleted} />}
      <Child onselected={showSeleted} />
      <div className={style["add-person"]}>
        <p
          className={style["add"]}
          onClick={addPerson}
          style={{
            width: "50%",
            lineHeight: "50px",
            textAlign: "center",
            backgroundColor: "skyblue",
          }}
        >
          添加成人
        </p>
        <p
          className={style["add"]}
          style={{ width: "50%", lineHeight: "50px", textAlign: "center" }}
        >
          添加儿童
        </p>
      </div>
      {isshow && (
        <UseSelected
          options={store.optionReducer}
          onselected
          onShow={handleshow}
        />
      )}
    </div>
  );
}
