import React, { Component, PureComponent, memo } from "react";

/* 
    提高效率问题
    传统的则是父组件更新状态之后子组件也会被更新
    1. 使用类式组件时，可以使用shouldComponentUpdate钩子去实现子组件状态不更新时组件也不更新的方法
    2. 使用类式组件时PureComponent里面一级帮我们封装好了一个简单的对比算法，
        因此不需要使用shouldComponentUpdate钩子
    3. 使用函数式组件时使用memo进行简单的对比算法，从而提高效率

*/

/* const Foo = memo(function Foo(props) {
  console.log("刷新了");
  return <div>{props.count}</div>;
}); */

/* class Foo extends PureComponent {
  shouldComponentUpdate(newProps, newState) {
    if (newProps.count === this.props.count) {
      return false;
    }
    return true;
  } 

  render() {
    console.log("刷新了");
    return <div>{this.props.count}</div>;
  }
} */

class Foo extends Component {
  /*   shouldComponentUpdate(newProps, newState) {
    if (newProps.count === this.props.count) {
      return false;
    }
    return true;
  } */
  render() {
    console.log("刷新了");
    return <div>{this.props.count}</div>;
  }
}

export default class Memo extends Component {
  state = {
    count: 1,
  };
  render() {
    const { count } = this.state;
    return (
      <div>
        <button
          type="button"
          onClick={() => {
            this.setState({
              count: count + 1,
            });
          }}
        >
          add
        </button>
        <span>{count}</span>
        <Foo count={"name"} />
      </div>
    );
  }
}
