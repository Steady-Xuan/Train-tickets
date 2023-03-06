import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Header from "../../common/Header";
import propTypes from "prop-types";
import UseButton from "../../hooks/useButton/index";
import { createTcicks } from "../../store/action";
import "./index.css";

function TarinItem(props) {
  const { item } = props;
  const nav = useNavigate();
  const selecetor = useSelector((state) => {
    return state.tickesRducer;
  });
  const jumpTo = () => {
    nav("/BuyTicket");
    sessionStorage.setItem("selecetor", JSON.stringify(selecetor));
  };
  return (
    <div className="container2">
      <div>
        <p>{item.aTime}</p>
        <p>{item.dTime}</p>
      </div>
      <div onClick={jumpTo}>
        <p>{item.aStation}</p>
        <p>{item.dStation}</p>
      </div>
      <div>
        <p>{item.trainNumber}</p>
        <p>{item.time}</p>
      </div>
      <div>
        <p>{item.priceMsg}</p>
        <p>{item.trainShowDesc}</p>
      </div>
    </div>
  );
}
TarinItem.propTypes = {
  item: propTypes.object.isRequired,
};

export default function Seats() {
  const selector = useSelector((state) => {
    return state;
  });
  const dispatch = useDispatch();
  const [dataList, setDataList] = useState([]);
  const [filter, setFilter] = useState({});

  useEffect(() => {
    fetch("./query.json", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setDataList(res.dataMap.directTrainInfo.trains);
        setFilter(res.dataMap.directTrainInfo.filter);
        dispatch(createTcicks(res.dataMap));
      });
  }, []);

  return (
    <div className="container1">
      <Header
        title={`${selector.dataTrickRducer.start}-${selector.dataTrickRducer.end}`}
        isBack={true}
      />
      <div className="body-container">
        <div className="date1">{dayjs(Date.now()).format("YYYY-MM-DD")} </div>
        <div className="body-list">
          {dataList.map((item, idx) => {
            return <TarinItem item={item} key={idx} />;
          })}
        </div>
      </div>

      <UseButton filter={filter} />
    </div>
  );
}
