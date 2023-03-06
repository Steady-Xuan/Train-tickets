import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import React, { useEffect, useState, memo } from "react";
import { useSelector } from "react-redux";
import classNames from "classnames";
import style from "./index.module.css";
import Header from "../../common/Header";
import { useNavigate } from "react-router-dom";
import TimeLIneModule from "../../common/TimeLIneModule";

function ListTicke(props) {
  const { label, idx, onToggle, children, isCollapsed } = props;
  return (
    <div style={{ marginBottom: "50px", marginLeft: "30px" }}>
      <div
        onClick={() => {
          onToggle(idx);
        }}
      >
        {label}
        <div className={isCollapsed ? `${style["btn2"]}` : `${style["btn1"]}`}>
          {children}
        </div>
      </div>
    </div>
  );
}

function Box(props) {
  const { defaultIndex, children, onToggle_item } = props;
  const [defaultIndex1, setDefaultIndex] = useState(defaultIndex);
  const onToggle = (idx) => {
    if (idx !== defaultIndex1) {
      setDefaultIndex(idx);
    }
  };
  const childs = children.filter((child) => {
    return child.type.name === "ListTicke";
  });
  return (
    <div>
      {childs.map((child, idx) => {
        return (
          <ListTicke
            {...child.props}
            key={idx}
            onToggle={onToggle}
            isCollapsed={defaultIndex1 === idx}
          />
        );
      })}
    </div>
  );
}

const BuyTicket = memo(() => {
  const selecetor = useSelector((state) => {
    return state.tickesRducer;
  });

  const [btn1, setBtn] = useState("btn1");
  const [list, setList] = useState([
    {
      label: "二等座 ￥443.5 有票",
      value: false,
    },
    {
      label: "一等座 ￥748.5 有票 ",
      value: false,
    },
    {
      label: " 商务座 ￥1403.5 5张",
      value: false,
    },
  ]);
  const nav = useNavigate();

  const [dfidx, setDfidx] = useState(0);

  const packUp = (e) => {
    switch (e) {
      case e === "0":
        return;
    }
  };

  const onToggle = (idx) => {
    setDfidx((state) => {
      return (state = idx);
    });
    console.log("idx", idx);

    console.log("dfidx", dfidx);
  };
  const buyTicket = () => {
    nav(
      `/orderFilling?a=${selecetor.data.jointResult?.transLineList[0].transNodeList[0].arr}&b=${selecetor.data.jointResult?.transLineList[0].transNodeList[0].arrTime}&c=${selecetor.data.jointResult?.transLineList[0].transNodeList[0].date}&d=${selecetor.data.jointResult?.transLineList[0].transNodeList[0].date}`
    );
  };

  useEffect(() => {}, []);

  return (
    <div>
      <Header title="买票" isBack={true} />
      <TimeLIneModule>
        <p>-----时刻表----</p>
        <p>
          耗时
          {
            selecetor.data.jointResult?.transLineList[0].transNodeList[0]
              .intervalTimeDesc
          }
        </p>
      </TimeLIneModule>
      <Box defaultIndex={dfidx} onToggle_item={onToggle}>
        {list.map((list, idx) => {
          return (
            <ListTicke {...list} key={idx} idx={idx}>
              <div className={style["buy-ticket"]}>
                <p>
                  普通预定
                  <button className="buy-btn" onClick={buyTicket}>
                    买票
                  </button>
                </p>
                <p>
                  快速预定
                  <button className="buy-btn" onClick={buyTicket}>
                    买票
                  </button>
                </p>
              </div>
            </ListTicke>
          );
        })}
      </Box>
    </div>
  );
});

export default BuyTicket;
