import React, { useEffect, useState } from "react";
import styles from "./index.module.css";
import PropTypes from "prop-types";
import classNames from "classnames";
import { connect } from "react-redux";
import { createdSeats } from "../../store/action";
function UseSelected(props) {
  console.log("props", props);
  const { options, isshow, onselected, onShow, seatsRducer, dispatch } = props;
  const [optionsArr, setOptionsArr] = useState([...options]);
  const handleScroll = (e) => {
    console.log("e", e);
  };
  const handleSleceted = (e) => {};
  const choose = (e) => {
    console.log('e.label', e.label)
    dispatch(createdSeats(e.label));
    onShow(false);
  };
  useEffect(() => {
    // for (const op of optionsArr) {
    //   if (op.label === seatsRducer) {
    //     op.color = "red";
    //   }
    // }
    setOptionsArr(optionsArr);
  }, []);
  return (
    <div>
      <div
        className={styles["shade"]}
        onClick={() => {
          onShow(false);
        }}
      ></div>
      <div className={styles["container"]} onWheel={handleScroll}>
        {optionsArr.map((op) => {
          return (
            <p
              key={op.value}
              onClick={handleSleceted}
              className={styles["pairs"]}
              dataset={`data_${op.value}`}
            >
              {op.label === seatsRducer ? (
                <span style={{ color: "red", fontSize: "26px" }}>
                  {op.label}
                </span>
              ) : (
                <span
                  onClick={() => {
                    choose(op);
                  }}
                >
                  {op.label}
                </span>
              )}
              {/* <p className={styles["pair"]}> √ </p> */}
            </p>
          );
        })}
      </div>
    </div>
  );
}

export default connect(
  function mapStateToProps(state) {
    return state;
  },
  function mapDispatchToProps(dispatch) {
    return { dispatch };
  }
)(UseSelected);

UseSelected.propTypes = {
  // type: PropTypes.bool.isRequired,
  options: PropTypes.array.isRequired,
  // title: PropTypes.bool.isRequired,
  onselected: PropTypes.bool.isRequired,
};
