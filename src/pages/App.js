import React from 'react';
import '../App.css';
import {test} from '../api/api'

class App extends React.Component {
    constructor(props) {
      super(props)
      this.handleClickBtn = this.handleClickBtn.bind(this)
    }
    async componentDidMount() {
      console.log('hi')
      const res = await test()
      console.log(res)
      // const task = await save({taskName: 'zzh'})
      // console.log(task)
    }

    handleClickBtn() {
        this.props.history.push('/main')
    }

    render() {
    return (
        /*
      <div className="App">
        <Button type="primary" onClick={this.handleClickBtn}>Button</Button>
      </div>
      */
        <div>
            Home Page
        </div>
    )
    }
}

export default App;
