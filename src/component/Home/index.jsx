import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { pySegSort } from "../../utils/common";
import "./index.css";
import { getIsStart, getIsEnd } from "../../store/action";
import { useDispatch, useSelector } from "react-redux";

function Header() {
  return <div className="header">火车票</div>;
}

function selectCity() {
  return;
  <div></div>;
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

  useEffect(() => {}, []);

  return (
    <div className="city">
      <span onClick={selectCity}>{selector.start}</span>
      <span> --- </span>
      <span
        onClick={() => {
          selectCity("isEnd");
        }}
      >
        {selector.end}
      </span>
    </div>
  );
}

export default function Home() {
  return (
    <div>
      <Header />
      <City></City>
    </div>
  );
}
