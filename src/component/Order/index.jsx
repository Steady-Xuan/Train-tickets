import React, { useState, useEffect } from "react";
import "./index.css";
import { useDispatch, useSelector } from "react-redux";
import { pySegSort } from "../../utils/common";
import { useNavigate } from "react-router-dom";
import { startAction, endAction } from "../../store/action";
function Header(props) {
  const nav = useNavigate();

  const { isStart } = props;
  const goBack = () => {
    nav("/home");
  };

  return (
    <div className="header">
      <span className="back" onClick={goBack}>
        返回
      </span>
      <span>选择{isStart ? "出发地" : "目的地"}</span>
    </div>
  );
}

export default function Order(props) {
  const [city, setCity] = useState([]);
  const [code, setCode] = useState([]);
  const nav = useNavigate();
  const isStart = useSelector((state) => {
    return state.isStartReducer.isStart;
  });
  const dataStartEnd = useSelector((state) => {
    return state.dataTrickRducer;
  });
  const dispatch = useDispatch();

  useEffect(() => {
    getCityData();
    CharCode();
  }, []);

  const getCityData = () => {
    var newArr = [];
    fetch(
      "https://restapi.amap.com/v3/config/district?key=e5d5bbbe8385ea365130804b6f1c4fc8"
    )
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        var arr = [];
        res.districts[0].districts.forEach((item) => {
          arr.push(item.name);
        });
        newArr = pySegSort(arr);
        setCity(newArr);
      });
  };

  const CharCode = () => {
    var arr = [];

    for (var i = 65; i < 91; i++) {
      arr.push(String.fromCharCode(i));
    }
    setCode(arr);
  };

  const jumpToView = (params) => {
    const arr = document.querySelector(`.data_${params}`);
    if (arr !== null) {
      arr.scrollIntoView(true);
    }
  };

  const jumpToHome = (params) => {
    if (isStart) {
      dispatch(startAction(params));
    } else {
      dispatch(endAction(params));
    }
    nav("/home");
  };

  return (
    <div className="container">
      <Header isStart={isStart} />

      {city.map((item, idx) => {
        return (
          <li key={idx} className={`box data_${item.letter}`}>
            {item.letter}
            {item.data.length
              ? item.data.map((_item, ids) => {
                  return (
                    <div
                      className="cityName"
                      key={ids}
                      onClick={() => {
                        jumpToHome(_item);
                      }}
                    >
                      {_item}{" "}
                    </div>
                  );
                })
              : ""}
          </li>
        );
      })}

      <div className="codeName">
        {code.map((item, idx) => {
          return (
            <div
              onClick={() => {
                jumpToView(item);
              }}
              key={idx}
            >
              {item}
            </div>
          );
        })}
      </div>
    </div>
  );
}
