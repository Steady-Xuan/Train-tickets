import React, { useState } from "react";
import "./index.css";
import ProtoType from "prop-types";
function Dialog(props) {
  const { filter, dialogView } = props;
  console.log("filter", filter);
  return (
    <div className="dialog" onClick={dialogView}>
      <div className="dialog-item">
        <div className="btn">
          <span>重置</span>
          <span>确定</span>
        </div>
        <div>座次类型</div>
        <div>
          {filter.ticketType.map((item, value) => {
            return <button key={value}>{item.name}</button>;
          })}
        </div>
        <div>车次类型</div>
        <div>
          {filter.trainType.map((item, value) => {
            return <button key={value}>{item.name}</button>;
          })}
        </div>
        <div>出发车站</div>
        <div>
          {filter.depStation.map((item, value) => {
            return <button key={value}>{item.name}</button>;
          })}
        </div>
        <div>到达车站</div>
        <div>
          {filter.depStation.map((item, value) => {
            return <button key={value}>{item.name}</button>;
          })}
        </div>
        <div>出发时间</div>
        <div>
          {filter.arriTimeRange.map((item, value) => {
            return <button key={value}>{item.name}</button>;
          })}
        </div>

        <div>出发时间</div>
        <div>
          {filter.deptTimeRange.map((item, value) => {
            return <button key={value}>{item.name}</button>;
          })}
        </div>
      </div>
    </div>
  );
}

Dialog.protoType = {
  filter: ProtoType.object.isRequired,
  dialogView: ProtoType.func.isRequired,
};

function UseButton(props) {
  const { filter } = props;
  const [isLoading, setLoading] = useState(false);

  const dialogView = (e) => {
    console.log("e", e);

    e.stopPropagation();
    e.preventDefault();
    setLoading(!isLoading);
  };
  return (
    <div className={"btns"}>
      <button className="button">出发(早→晚)</button>
      <button className="button">只看高铁动车</button>
      <button className="button">只看有票</button>
      <button className="button" onClick={dialogView}>
        综合筛选
      </button>
      {isLoading && <Dialog filter={filter} dialogView={dialogView} />}
    </div>
  );
}
UseButton.protoType = {
  filter: ProtoType.object.isRequired,
};

export default UseButton;
