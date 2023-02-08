import React from "react";
import { useState, useEffect } from "react";
import {
  useNavigate,
  useParams,
  useSearchParams,
  useLocation,
} from "react-router-dom";
import { getNowFormatDate } from "../../utils/common";
import "./index.css";
import { getIsStart, getIsEnd } from "../../store/action";
import { useDispatch, useSelector } from "react-redux";

function Header() {
  return <div className="header">火车票</div>;
}

function City(props) {
  const nav = useNavigate();
  const dispatch = useDispatch();

  const selectCity = (params) => {
    nav("/order", {
      replace: false,
    });
    if (params === "isEnd") {
      dispatch(getIsEnd(false));
    } else {
      dispatch(getIsStart(true));
    }
  };
  const selector = useSelector((state) => {
    return state.dataTrickRducer;
  });
  return (
    <div className="city">
      <span onClick={selectCity} className="text">
        {selector.start}
      </span>
      <span> --- </span>
      <span
        className="text"
        onClick={() => {
          selectCity("isEnd");
        }}
      >
        {selector.end}
      </span>
    </div>
  );
}

function DateComponent() {
  const [date, setDate] = useState();
  const [week, setWeek] = useState();
  const [day, setDay] = useState();
  const nav = useNavigate();

  const location = useLocation();
  useEffect(() => {
    const newDate = getNowFormatDate();
    var weeks = "周" + "天一二三四五六".charAt(new Date().getDay());
    // 判断日期是不是今天、昨天、明天
    const days = isToday(new Date());
    if (location.state) {
      setDate(location.state.date);
    } else {
      setDate(newDate);
    }
    setDay(days);
    setWeek(weeks);
  }, []);

  useEffect(() => {}, []);
  const isToday = (str) => {
    let d = new Date(str).setHours(0, 0, 0, 0);
    let today = new Date().setHours(0, 0, 0, 0);

    let obj = {
      "-86400000": "昨天",
      0: "今天",
      86400000: "明天",
    };

    return obj[d - today] || "";
  };

  const jumpToDate = () => {
    nav("/ticket");
  };

  return (
    <div onClick={jumpToDate} className="date">
      <span> {date}</span>
      <span className="week">{week}</span>
      <span className="day"> {day}</span>
    </div>
  );
}

export default function Home() {
  return (
    <div>
      <Header />
      <City></City>
      <DateComponent />
    </div>
  );
}
