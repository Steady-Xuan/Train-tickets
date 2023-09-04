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

Header.proptype = {
  title: PropType.string.isRequired,
  isBack: PropType.bool.isRequired,
};

export default Header;
