import logo from "./logo.svg";
import "./App.css";
import Context from "./Context";
import { Component, lazy, Suspense } from "react";

/* 
1. lazy异步加载组件，Suspense组件没加载出来时所展示的jsx
2. 获取错误边界，即获取后端返回的错误，并展示出来
  - 有两种方式
      1:通过生命周期函数componentDidCatch 
      2：通过静态方法getDerivedStateFromError获取错误边界
*/

const LazyAsync = lazy(() => import(/* webpackChunkName: Lazy */ "./Lazy"));

class App extends Component {
  state = {
    hasError: false,
  };
  /*  componentDidCatch() {
    this.setState({
      hasError: true,
    });
  } */
  static getDerivedStateFromError() {
    return {
      hasError: true,
    };
  }
  render() {
    const { hasError } = this.state;
    if (hasError) {
      return <h1>error</h1>;
    }
    return (
      <div className="App">
        <Suspense fallback={<h1>laoding...</h1>}>
          <LazyAsync />
        </Suspense>
      </div>
    );
  }
}

export default App;
