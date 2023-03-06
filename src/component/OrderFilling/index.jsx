import React, { useEffect, useState } from "react";
import Header from "../../common/Header";
import URI from "urijs";
import TimeLIneModule from "../../common/TimeLIneModule";
import style from "./index.module.css";
import { connect, useDispatch, useSelector } from "react-redux";
import {
  createdTickets,
  createdPerson,
  createdChild,
  createdSeats,
} from "../../store/action";
import UseSelected from "../../hooks/useSelected";

function Person(props) {
  const { onselected, people, handleDelete } = props;
  const change = () => {};
  const change1 = () => {};
  const deleteData = () => {};
  return (
    <div>
      <div className={style["buy-person-ticket"]}>
        <div
          style={{ color: "red" }}
          onClick={() => {
            handleDelete(people);
          }}
        >
          --删除--
        </div>
        <div>
          <p>
            <span>姓名</span>
            <input placeholder="乘客姓名" onChange={change}></input>
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
            <input placeholder="证件号码" onChange={change1}></input>
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
function OrderFilling(props) {
  const { optionReducer, seatsRducer } = props;
  const [timeLineData, setTimeLineData] = useState({});
  const [isshow, setIsshow] = useState(false);
  const [peoplesArr, setPeoplesArr] = useState([]);
  const [childsArr, setChildsArr] = useState([]);
  const dispatch = useDispatch();
  const store = useSelector((state) => {
    return state;
  });

  useEffect(() => {
    const url = new URI();
    const urlData = url.search(true);
    setTimeLineData(urlData);
  }, []);
  const addPerson = () => {
    let arr = peoplesArr;
    arr.push({
      id: Date.now(),
    });
    setPeoplesArr([...arr]);
  };

  const addChild = () => {
    let arr = childsArr;
    arr.push({
      id: Date.now(),
    });
    setChildsArr([...arr]);
    console.log("childsArr", childsArr);
  };

  const handleDelete = (e) => {
    const arr = peoplesArr.filter((people) => {
      return people.id !== e.id;
    });
    setPeoplesArr([...arr]);
  };

  const showSeleted = (e) => {
    console.log("e", e);
    switch (e) {
      case "ticket":
        const arr = [
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
        ];
        dispatch(createdTickets(arr));
        dispatch(createdSeats(seatsRducer));
        setIsshow(true);
        return;
      case "person":
        const arr1 = [
          {
            label: "成人票",
            value: "1",
          },
          {
            label: "儿童票",
            value: "2",
          },
        ];
        dispatch(createdPerson(arr1));
        setIsshow(true);
        return;
      case "child":
        dispatch(createdChild());
        dispatch(createdChild());
        return;
      default:
    }
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
            {seatsRducer}
          </span>
        </div>
        <label style={{ color: "skyblue" }}>￥748</label>
      </div>
      {peoplesArr.map((people, idx) => {
        return (
          <Person
            key={idx}
            handleDelete={handleDelete}
            people={people}
            onselected={showSeleted}
          ></Person>
        );
      })}

      {childsArr.map((childs, idx) => {
        return <Child key={idx} onselected={showSeleted} />;
      })}
      <div className={style["add-person"]}>
        <p
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
          onClick={addChild}
          style={{
            width: "50%",
            lineHeight: "50px",
            textAlign: "center",
            backgroundColor: "skyblue",
          }}
        >
          添加儿童
        </p>
      </div>
      {isshow && (
        <UseSelected
          options={[...optionReducer]}
          isshow={isshow}
          onselected
          onShow={handleshow}
        />
      )}
    </div>
  );
}
export default connect(
  function mapStateToProps(state) {
    // console.log('state', state)
    return state;
  },
  function mapDispatchToProps(dispatch) {
    return { dispatch };
  }
)(OrderFilling);
