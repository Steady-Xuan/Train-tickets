import React from "react";
import "./index.css";
import ProtoType from "prop-types";
function Header(props) {
  const { title, isBack } = props;
  const goBack = () => {
    window.history.go(-1);
  };
  return (
    <div className="header1">
      {isBack && (
        <span className="back" onClick={goBack}>
          返回
        </span>
      )}
      <span>{title}</span>
    </div>
  );
}

Header.prototype = {
  title: ProtoType.string.isRequired,
  isBack: ProtoType.bool.isRequired,
};

export default Header;
