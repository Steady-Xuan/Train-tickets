import React from "react";
import styles from "./index.module.css";
import PropTypes from "prop-types";
import classNames from "classnames";
export default function UseSelected(props) {
  const { options, onselected, onShow } = props;

  const handleScroll = (e) => {
    console.log("e", e);
  };
  const handleSleceted = (e) => {
    // console.log("e", e.target.__reactProps$i6frt3o41p);
    // document.querySelector(`.${e.target.classList[0]}`).classList.add("choose");
  };
  return (
    <div>
      <div
        className={styles["shade"]}
        onClick={() => {
          onShow(false);
        }}
      ></div>
      <div className={styles["container"]} onWheel={handleScroll}>
        {options.map((op) => {
          return (
            <p
              onClick={handleSleceted}
              className={styles["pairs"]}
              dataset={`data_${op.value}`}
            >
              {op.label}
              <p className={styles["pair"]}> √ </p>
            </p>
          );
        })}
      </div>
    </div>
  );
}
UseSelected.propTypes = {
  // type: PropTypes.bool.isRequired,
  options: PropTypes.array.isRequired,
  // title: PropTypes.bool.isRequired,
  onselected: PropTypes.bool.isRequired,
};
