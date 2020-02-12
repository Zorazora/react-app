import React from 'react';
// import logo from './logo.svg';
import './App.css';
import {Button} from 'antd'
import {test} from '../src/api/api'


class App extends React.Component {
  async componentDidMount() {
      console.log('hi')
      const res = await test()
      console.log(res)
      // const task = await save({taskName: 'zzh'})
      // console.log(task)
  }

  render() {
    return (
        /*
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
      */
      <div className="App">
        <Button type="primary">Button</Button>
      </div>
    )
  }
}

export default App;
