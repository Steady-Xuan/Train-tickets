import React, { Component, createContext } from "react";

const BatteryContext = createContext();
const OnlineContext = createContext();
/* 
1. createContext创建组件，其命名开头需大写
2. createContext可以创建多个组件进行数据共享
3. Provider发起数据共享，Consumer层层接收，最后再来渲染
4，当只有一个Provider时，使用contextType代替Consumer，在类中使用静态方法，使用之后
    就可以在该组件中访问到context属性，该属性就是通过Provider传过来的值
*/

class Lefe extends Component {
  static contextType = BatteryContext;

  render() {
    const battery = this.context;
    return (
      <h1>battery:{battery}</h1>
      /* <BatteryContext.Consumer>
        {(battery) => {
          return (
            <OnlineContext.Consumer>
              {(online) => {
                return (
                  <h1>
                    battery:{battery},online:{String(online)}
                  </h1>
                );
              }}
            </OnlineContext.Consumer>
          );
        }}
      </BatteryContext.Consumer> */
    );
  }
}

class Middle extends Component {
  render() {
    return (
      <div>
        <Lefe />
      </div>
    );
  }
}

export default class Context extends Component {
  state = {
    battery: 90,
    online: false,
  };

  render() {
    const { battery, online } = this.state;

    return (
      <BatteryContext.Provider value={battery}>
        <OnlineContext.Provider value={online}>
          <button
            type="button"
            onClick={() => {
              this.setState({ battery: battery - 1 });
            }}
          >
            press
          </button>

          <button
            type="button"
            onClick={() => {
              this.setState({ online: !online });
            }}
          >
            swich
          </button>
          <Middle />
        </OnlineContext.Provider>
      </BatteryContext.Provider>
    );
  }
}
