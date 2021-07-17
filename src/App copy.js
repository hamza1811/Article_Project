import React from "react"

import "./App.css"

import { connect } from "react-redux"

import {
  increaseCounter,
  decreaseCounter,
} from "./redux/Counter/counter.actions"
import InputCom from "./components/InputCom"
import ShowCom from "./components/ShowCom"

function App(props) {
  return (
    <div className="App">
      <div>Count: {props.count}</div>

      <button onClick={() => props.increaseCounter()}>Increase Count</button>

      <button onClick={() => props.decreaseCounter()}>Decrease Count</button>

      <br/>
      <button onClick={() => props.increaseCounter(5)}>Increase Count by 5</button>

      <button onClick={() => props.decreaseCounter(-3)}>Decrease Count by 3</button>

      <InputCom />
      <ShowCom />

    
    </div>
  )
}

const mapStateToProps = state => {
  return {
    count: state.counter.count,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    increaseCounter: (count = 0) => dispatch(increaseCounter(count)),

    decreaseCounter: (count = 0) => dispatch(decreaseCounter(count)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)