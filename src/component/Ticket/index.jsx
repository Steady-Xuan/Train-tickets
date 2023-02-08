import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./index.css";

function Header(props) {
  const nav = useNavigate();

  const goBack = () => {
    nav("/home");
  };

  return (
    <div className="header">
      <span className="back" onClick={goBack}>
        返回
      </span>
      <span>请选择日期</span>
    </div>
  );
}

function MathCloum(props) {
  const { colunm } = props;

  return (
    <>
      {colunm.value.map((item, idx) => {
        return (
          <div key={idx} className="colunm">
            <MathTr colunm={item} moth={colunm.label} />
          </div>
        );
      })}
    </>
  );
}

function MathTr(props) {
  const nav = useNavigate();
  const dispatch = useDispatch();

  const { colunm, moth } = props;
  const [sumM, setsumM] = useState([]);

  const jumpToHome = (arg, parmas) => {
    console.log(arg, parmas, "td");
    nav(`/home`, {
      state: {
        date: `${parmas}-${arg}`,
      },
    });
  };

  return (
    <>
      {colunm.map((item, idx) => {
        if (item == 0) {
          return <div className="td" key={idx}></div>;
        } else {
          return (
            <div
              className="tr"
              key={idx}
              onClick={() => {
                jumpToHome(item, moth);
              }}
            >
              {item}
            </div>
          );
        }
      })}
    </>
  );
}

function DateMath() {
  const [weeks, setWeeks] = useState([
    "周一",
    "周二",
    "周三",
    "周四",
    "周五",
    "周六",
    "周日",
  ]);
  return (
    <div className="dataWeeks">
      {weeks.map((item, idx) => {
        return (
          <div key={idx}>
            <div className={`data_${item}`}>{item}</div>
          </div>
        );
      })}
    </div>
  );
}

function DateComponent() {
  const [dateM, setDateM] = useState([]);
  const [sum, setSum] = useState(0);
  const getDateY = () => {
    var dateArr = [];
    var m = new Date().getMonth() + 1;
    var y = new Date().getFullYear();

    var curentDays = new Date(y, m, 0).getDate();
    if (m > 10) {
      var num = 12 - m;
      if (num == 0) {
        dateArr.push(y + m);
        y = y + 1;
        dateArr.push(y + "-" + "01");
        dateArr.push(y + "-" + "02");
      } else {
      }
    } else {
      for (var i = 0; i < 3; i++) {
        if (m != 10) {
          m = "0" + m;
        }
        dateArr.push(y + "-" + String(m));
        m++;
      }
    }

    const arr = getDate(new Date().getMonth() + 1);
    const newArr = getDate(new Date().getMonth() + 2);
    const _arr = getDate(new Date().getMonth() + 3);
    var arrOther = [arr, newArr, _arr];
    var lastArr = [];
    console.log(dateArr, "dateArr");
    dateArr.forEach((item, idx) => {
      lastArr.push({
        label: item,
        value: arrOther[idx],
      });
    });

    setDateM(lastArr);
  };

  const sliceArray = (array, size) => {
    var result = [];
    for (var i = 0; i < Math.ceil(array.length / size); i++) {
      var start = i * size;
      var end = start + size;
      var arr = array.slice(start, end);
      if (arr.length < 7) {
        const newArr = Array(7 - arr.length).fill(0);
        arr = arr.concat(newArr);
      }

      result.push(arr);
    }
    return result;
  };

  const getDate = (m) => {
    // var m = new Date().getMonth() + 1;
    var y = new Date().getFullYear();
    var curentDays = new Date(y, m, 0).getDate();
    var firstDay = new Date(`${m}/1/${y}`).getDay();
    var arr = [];

    for (let i = 0; i < curentDays; i++) {
      arr.push(i + 1);
    }

    if (firstDay !== 0) {
      for (let i = 0; i < firstDay - 1; i++) {
        arr.unshift(0);
      }
    }
    const newArr = sliceArray(arr, 7);
    return newArr;
    // setColunm(newArr);
    setSum(curentDays);
  };

  useEffect(() => {
    getDateY();
  }, []);

  return (
    <div>
      <Header />
      {dateM.map((item, idx) => {
        return (
          <div key={idx}>
            <div className="dateSelete">{item.label}</div>
            <DateMath />
            <MathCloum colunm={item} />
          </div>
        );
      })}
    </div>
  );
}

export default function Ticket() {
  return (
    <div>
      <DateComponent />
    </div>
  );
}
